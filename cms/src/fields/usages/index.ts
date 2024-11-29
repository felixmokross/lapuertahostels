import {
  CollectionSlug,
  DataFromCollectionSlug,
  Field,
  GlobalSlug,
  Payload,
} from "payload";
import { JSONField } from "payload";

type UsagesFieldOptions = {
  collections?: CollectionSlug[];
  globals?: GlobalSlug[];
};

export function usagesField(
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
        Description:
          "src/fields/usages/usages-field-description#UsagesFieldDescription",
      },
    },
    hooks: {
      afterRead: [
        async ({ data, req }) => {
          if (!data) throw new Error("Data is missing.");
          return await findUsages(
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
            collectionToFind,
            data.id,
            item,
            collectionConfig.fields,
          ).map<Usage>((path) => ({
            type: "collection",
            collection: collectionSlug,
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
          collectionToFind,
          data.id,
          global,
          globalConfig.fields,
        ).map<Usage>((path) => ({
          type: "global",
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
  fieldPath: string;
};

function findItemUsagesOnCollection(
  collectionToFind: CollectionSlug,
  id: string,
  data: any,
  fields: Field[],
) {
  const usagePaths: string[] = [];

  for (const field of fields) {
    if (
      field.type === "relationship" &&
      field.relationTo === collectionToFind
    ) {
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
          collectionToFind,
          id,
          data[field.name],
          field.fields,
        ).map((path) => `${field.name}.${path}`),
      );
    } else if (field.type === "collapsible" || field.type === "row") {
      usagePaths.push(
        ...findItemUsagesOnCollection(collectionToFind, id, data, field.fields),
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
