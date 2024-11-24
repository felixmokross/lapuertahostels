import { Text } from "@/payload-types";
import { CollectionSlug, Field, GlobalSlug, Payload } from "payload";

export async function UsagesField({
  data,
  payload,
}: {
  payload: Payload;
  data: Text;
}) {
  const collections: CollectionSlug[] = ["new-pages", "banners", "brands"];
  const globals: GlobalSlug[] = ["common", "maintenance"];

  const usages = (
    await Promise.all([
      ...collections.map(async (collectionSlug) => {
        const items = await payload.find({
          collection: collectionSlug,
          pagination: false,
          depth: 0,
        });

        const collectionConfig = payload.collections[collectionSlug].config;

        return items.docs.flatMap((item) =>
          findTextUsagesOnCollection(
            data.id,
            item,
            collectionConfig.fields,
          ).map<Usage>((path) => ({
            type: "collection",
            collection: collectionSlug,
            id: item.id,
            fieldPath: path,
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

        return findTextUsagesOnCollection(
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

  return <pre>{JSON.stringify(usages, null, 2)}</pre>;
}

type Usage = (
  | {
      type: "collection";
      collection: CollectionSlug;
      id: string;
    }
  | {
      type: "global";
      global: GlobalSlug;
    }
) & {
  fieldPath: string;
};

function findTextUsagesOnCollection(
  textId: string,
  data: any,
  fields: Field[],
) {
  const usagePaths: string[] = [];

  for (const field of fields) {
    if (field.type === "relationship" && field.relationTo === "texts") {
      if (data[field.name] === textId) {
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
          ...findTextUsagesOnCollection(textId, blockItem, block.fields).map(
            (path) => `${field.name}.${i}.${path}`,
          ),
        );
      }
    } else if (field.type === "array") {
      for (let i = 0; i < data[field.name].length; i++) {
        const arrayItem = data[field.name][i];
        usagePaths.push(
          ...findTextUsagesOnCollection(textId, arrayItem, field.fields).map(
            (path) => `${field.name}.${i}.${path}`,
          ),
        );
      }
    } else if (field.type === "group") {
      usagePaths.push(
        ...findTextUsagesOnCollection(
          textId,
          data[field.name],
          field.fields,
        ).map((path) => `${field.name}.${path}`),
      );
    } else if (field.type === "collapsible" || field.type === "row") {
      usagePaths.push(
        ...findTextUsagesOnCollection(textId, data, field.fields),
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
