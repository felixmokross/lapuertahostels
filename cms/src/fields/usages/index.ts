import {
  CollectionSlug,
  DataFromCollectionSlug,
  Field,
  GlobalSlug,
  LabelFunction,
  Payload,
} from "payload";
import { JSONField } from "payload";

type UsagesFieldOptions = {
  collections?: CollectionSlug[];
  globals?: GlobalSlug[];
};

type RelationshipFieldType = "relationship" | "upload";

export function usagesField(
  fieldType: RelationshipFieldType,
  collectionToFind: CollectionSlug,
  options: UsagesFieldOptions = {},
): JSONField {
  return {
    type: "json",
    name: "usages",
    label: {
      en: "Usages",
      es: "Usos",
    },
    virtual: true,
    admin: {
      readOnly: true,
      components: {
        Field: "src/fields/usages/usages-field#UsagesField",
      },
    },
    hooks: {
      afterRead: [
        async ({ data, req }) => {
          if (!data) throw new Error("Data is missing.");
          return await findUsages(
            fieldType,
            collectionToFind,
            data,
            req.payload,
            options.collections ?? [],
            options.globals ?? [],
          );
        },
      ],
    },
  };
}

async function findUsages(
  fieldType: RelationshipFieldType,
  collectionToFind: CollectionSlug,
  data: Record<string, any>,
  payload: Payload,
  collections: CollectionSlug[],
  globals: GlobalSlug[],
) {
  return (
    await Promise.all([
      ...collections.map(async (collectionSlug) => {
        const items = await payload.find({
          collection: collectionSlug,
          pagination: false,
          depth: 0,
        });

        const collectionConfig = payload.collections[collectionSlug].config;

        return items.docs.flatMap((item) =>
          findItemUsagesOnCollection(
            fieldType,
            collectionToFind,
            data.id,
            item,
            collectionConfig.fields,
          ).map<Usage>((path) => ({
            type: "collection",
            collection: collectionSlug,
            label: collectionConfig.labels.singular,
            id: item.id,
            fieldPath: path,
            title: (
              item as DataFromCollectionSlug<CollectionSlug> &
                Record<string, any>
            )[collectionConfig.admin.useAsTitle],
          })),
        );
      }),
      ...globals.map(async (globalSlug) => {
        const global = await payload.findGlobal({
          slug: globalSlug,
          depth: 0,
        });

        const globalConfig = payload.globals.config.find(
          (c) => c.slug === globalSlug,
        );
        if (!globalConfig) throw new Error("Global config not found");

        return findItemUsagesOnCollection(
          fieldType,
          collectionToFind,
          data.id,
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
  data: any,
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
      throw new Error("Field type is not yet supported");
    }
  }

  return usagePaths;

  function addUsage(fieldPath: string) {
    usagePaths.push(fieldPath);
  }
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
