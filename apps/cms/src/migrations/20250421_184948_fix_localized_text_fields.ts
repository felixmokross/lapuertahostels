import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { CollectionSlug, Data, Field, GlobalSlug, Payload } from "payload";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  console.log(`Removing empty localized texts:`);
  console.log("");

  await migrateCollection("banners", payload);
  await migrateCollection("pages", payload);
  await migrateCollection("brands", payload);
  await migrateCollection("media", payload);

  await migrateGlobal("common", payload);
  await migrateGlobal("maintenance", payload);
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // Migration code
}

async function migrateCollection(
  collectionSlug: CollectionSlug,
  payload: Payload,
) {
  console.log(`Collection: ${collectionSlug}`);
  const items = await payload.db.connection
    .collection(collectionSlug)
    .find()
    .toArray();

  for (const item of items) {
    console.log(`Migrating ${collectionSlug}/${item._id}…`);
    const emptyLocalizedTexts = await getEmptyLocalizedTexts(
      item,
      payload.collections[collectionSlug].config.fields,
    );

    if (emptyLocalizedTexts.length === 0) {
      console.log("Found no empty localized texts");
      console.log("");
      continue;
    }

    console.log(`Found ${emptyLocalizedTexts.length} empty localized texts`);

    const update = {
      $unset: Object.fromEntries(emptyLocalizedTexts.map((path) => [path, ""])),
    };

    await payload.db.connection
      .collection(collectionSlug)
      .updateOne({ _id: item._id }, update);

    console.log("");
  }

  console.log("");
}

async function migrateGlobal(globalSlug: GlobalSlug, payload: Payload) {
  console.log(`Global: ${globalSlug}`);
  const global = await payload.db.connection
    .collection("globals")
    .findOne({ globalType: globalSlug });

  if (!global) throw new Error(`Global ${globalSlug} not found`);

  const globalConfig = payload.globals.config.find(
    (c) => c.slug === globalSlug,
  );
  if (!globalConfig) throw new Error(`Global config ${globalSlug} not found`);

  console.log(`Migrating ${globalSlug}…`);
  const emptyLocalizedTexts = await getEmptyLocalizedTexts(
    global,
    globalConfig.fields,
  );

  if (emptyLocalizedTexts.length === 0) {
    console.log("Found no empty localized texts");
    console.log("");
    return;
  }

  console.log(`Found ${emptyLocalizedTexts.length} empty localized texts`);

  const update = {
    $set: Object.fromEntries(
      emptyLocalizedTexts.map((path) => [path, { en: null }]),
    ),
  };

  await payload.db.connection
    .collection("globals")
    .updateOne({ _id: global._id }, update);

  console.log("");
}

async function getEmptyLocalizedTexts(
  data: Data,
  fields: Field[],
  basePath: string = "",
  emptyLocalizedTexts: string[] = [],
) {
  for (const field of fields) {
    if (
      (field.type === "text" ||
        field.type === "textarea" ||
        field.type === "richText") &&
      field.localized &&
      !field.virtual
    ) {
      const value = data[field.name] as object | undefined | null;
      if (!value) {
        emptyLocalizedTexts.push(joinPath(basePath, field.name));
      }
    } else if (field.type === "blocks") {
      const blocks = data[field.name] as Data[] | undefined;
      if (blocks) {
        for (const [i, block] of blocks.entries()) {
          const blockConfig = field.blocks.find(
            (b) => b.slug === block.blockType,
          );

          if (!blockConfig) {
            throw new Error(
              `Block type ${block.blockType} not found in config`,
            );
          }
          await getEmptyLocalizedTexts(
            block,
            blockConfig.fields,
            joinPath(basePath, joinPath(field.name, i.toString())),
            emptyLocalizedTexts,
          );
        }
      }
    } else if (field.type === "tabs") {
      for (const tab of field.tabs) {
        await getEmptyLocalizedTexts(
          "name" in tab ? data[tab.name] : data,
          tab.fields,
          "name" in tab ? joinPath(basePath, tab.name) : basePath,
          emptyLocalizedTexts,
        );
      }
    } else if (field.type === "array") {
      for (const [i, item] of data[field.name].entries()) {
        await getEmptyLocalizedTexts(
          item,
          field.fields,
          joinPath(basePath, joinPath(field.name, i.toString())),
          emptyLocalizedTexts,
        );
      }
    } else if (field.type === "group") {
      await getEmptyLocalizedTexts(
        data[field.name],
        field.fields,
        joinPath(basePath, field.name),
        emptyLocalizedTexts,
      );
    }
  }

  return emptyLocalizedTexts;
}

function joinPath(basePath: string, path: string) {
  return basePath ? `${basePath}.${path}` : path;
}
