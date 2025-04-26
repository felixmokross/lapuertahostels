import {
  CollectionSlug,
  DataFromCollectionSlug,
  Field,
  GlobalSlug,
  LabelFunction,
  Payload,
  TypedLocale,
  UIField,
} from "payload";
import { RelationshipFieldType, UsagesConfig } from "./types";
import {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import { localization } from "@/common/localization";

export function usagesField(config: UsagesConfig): UIField {
  return {
    type: "ui",
    name: "usages",
    label: {
      en: "Usages",
      es: "Usos",
    },
    admin: {
      components: {
        Field: {
          path: "src/fields/usages/usages-field.server",
          exportName: "UsagesField",
          serverProps: { config },
        },
      },
    },
  };
}

export async function findUsages(
  config: UsagesConfig,
  id: string,
  payload: Payload,
  locale: TypedLocale | undefined,
) {
  const {
    fieldType,
    collectionToFind,
    collections = [],
    globals = [],
  } = config;
  return (
    await Promise.all([
      ...collections.map(async (collectionSlug) => {
        const items = await payload.find({
          collection: collectionSlug,
          pagination: false,
          depth: 0,
          locale: "all",
        });

        const collectionConfig = payload.collections[collectionSlug].config;

        return items.docs.flatMap((item) =>
          findItemUsagesOnCollection(
            fieldType,
            collectionToFind,
            id,
            item,
            collectionConfig.fields,
          ).map<Usage>((path) => ({
            type: "collection",
            collection: collectionSlug,
            label: collectionConfig.labels.singular,
            id: item.id,
            fieldPath: path,
            title: (
              (
                item as DataFromCollectionSlug<CollectionSlug> &
                  Record<string, unknown>
              )[collectionConfig.admin.useAsTitle] as Record<string, string>
            )[locale ?? localization.defaultLocale],
          })),
        );
      }),
      ...globals.map(async (globalSlug) => {
        const global = await payload.findGlobal({
          slug: globalSlug,
          depth: 0,
          locale: "all",
        });

        const globalConfig = payload.globals.config.find(
          (c) => c.slug === globalSlug,
        );
        if (!globalConfig) throw new Error("Global config not found");

        return findItemUsagesOnCollection(
          fieldType,
          collectionToFind,
          id,
          global,
          globalConfig.fields,
        ).map<Usage>((path) => ({
          type: "global",
          label: globalConfig.label,
          global: globalSlug,
          fieldPath: path,
        }));
      }),
    ])
  ).flat();
}

export type Usage = (
  | {
      type: "collection";
      collection: CollectionSlug;
      id: string;
      title: string;
    }
  | {
      type: "global";
      global: GlobalSlug;
    }
) & {
  label: string | Record<string, string> | LabelFunction;
  fieldPath: string;
};

function findItemUsagesOnCollection(
  fieldType: RelationshipFieldType,
  collectionToFind: CollectionSlug,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  fields: Field[],
) {
  const usagePaths: string[] = [];

  for (const field of fields) {
    if (field.type === fieldType && field.relationTo === collectionToFind) {
      if (data[field.name] === id) {
        addUsage(field.name);
      }
    } else if (field.type === "blocks") {
      for (let i = 0; i < data[field.name].length; i++) {
        const blockItem = data[field.name][i];
        const block = field.blocks.find(
          (block) => block.slug === blockItem.blockType,
        );
        if (!block) {
          console.warn("Block not found", blockItem.blockType);
          continue;
        }

        usagePaths.push(
          ...findItemUsagesOnCollection(
            fieldType,
            collectionToFind,
            id,
            blockItem,
            block.fields,
          ).map((path) => `${field.name}.${i}.${path}`),
        );
      }
    } else if (field.type === "array") {
      for (let i = 0; i < data[field.name].length; i++) {
        const arrayItem = data[field.name][i];
        usagePaths.push(
          ...findItemUsagesOnCollection(
            fieldType,
            collectionToFind,
            id,
            arrayItem,
            field.fields,
          ).map((path) => `${field.name}.${i}.${path}`),
        );
      }
    } else if (field.type === "group") {
      usagePaths.push(
        ...findItemUsagesOnCollection(
          fieldType,
          collectionToFind,
          id,
          data[field.name],
          field.fields,
        ).map((path) => `${field.name}.${path}`),
      );
    } else if (field.type === "collapsible" || field.type === "row") {
      usagePaths.push(
        ...findItemUsagesOnCollection(
          fieldType,
          collectionToFind,
          id,
          data,
          field.fields,
        ),
      );
    } else if (field.type === "tabs") {
      for (let i = 0; i < field.tabs.length; i++) {
        const tab = field.tabs[i];
        const isNamedTab = "name" in tab && !!tab.name;

        usagePaths.push(
          ...findItemUsagesOnCollection(
            fieldType,
            collectionToFind,
            id,
            isNamedTab ? data[tab.name] : data,
            tab.fields,
          ).map((path) => (isNamedTab ? `${tab.name}.${path}` : path)),
        );
      }
    } else if (field.type === "richText" && field.localized) {
      if (data[field.name]) {
        for (const dataLocale of Object.keys(data[field.name])) {
          if (data[field.name][dataLocale]) {
            const linkElementNodes = getLinkElementNodes(
              (data[field.name][dataLocale] as SerializedEditorState).root,
            );

            for (const linkElementNode of linkElementNodes) {
              if (linkElementNode.fields.linkType === "internal") {
                const { doc } = linkElementNode.fields;
                if (doc.relationTo === collectionToFind && doc.value === id) {
                  addUsage(`${field.name}.${dataLocale}`);
                }
              }
            }
          }
        }
      }
    }
  }

  return usagePaths;

  function addUsage(fieldPath: string) {
    usagePaths.push(fieldPath);
  }
}

type LinkElementNode = {
  fields:
    | {
        linkType: "other";
      }
    | {
        linkType: "internal";
        doc: {
          relationTo: CollectionSlug;
          value: string;
        };
      };
};

function getLinkElementNodes({
  children,
}: {
  children: SerializedLexicalNode[];
}): LinkElementNode[] {
  return children.flatMap((child) => {
    if (child.type === "link") {
      return [child as unknown as LinkElementNode];
    }

    if ("children" in child) {
      return getLinkElementNodes(
        child as { children: SerializedLexicalNode[] },
      );
    }

    return [];
  });
}

export function getUniqueGlobals(usages: Usage[]) {
  return [
    ...new Set(
      usages
        .filter((u) => u.type === "global")
        .map((u) => (u as Usage & { type: "global" }).global),
    ),
  ];
}

export function getUniqueCollectionItemIds(
  usages: Usage[],
  collectionSlug: CollectionSlug,
) {
  return [
    ...new Set(
      usages
        .filter(
          (u) => u.type === "collection" && u.collection === collectionSlug,
        )
        .map((u) => (u as Usage & { type: "collection" }).id),
    ),
  ];
}
