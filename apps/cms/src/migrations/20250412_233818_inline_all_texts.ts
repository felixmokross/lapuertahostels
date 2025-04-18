import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "bson";
import { CollectionSlug, Data, Field, GlobalSlug, Payload } from "payload";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await migrateCollection("pages", payload);
  await migrateCollection("brands", payload);
  await migrateCollection("media", payload);

  await migrateGlobal("common", payload);
  await migrateGlobal("maintenance", payload);
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
    const textsToInline = await migrateData(
      item,
      payload.collections[collectionSlug].config.fields,
    );

    if (textsToInline.length === 0) {
      console.log("Found no texts to inline");
      console.log("");
      continue;
    }

    console.log(`Found ${textsToInline.length} texts to inline`);

    const update = {
      $set: Object.fromEntries(
        await Promise.all(
          textsToInline.map(async ({ textId, path, type }) => [
            path,
            (await findTextOrThrow(textId, payload))[
              type === "richText" ? "richText" : "text"
            ],
          ]),
        ),
      ),
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
  const textsToInline = await migrateData(global, globalConfig.fields);

  if (textsToInline.length === 0) {
    console.log("Found no texts to inline");
    console.log("");
    return;
  }

  console.log(`Found ${textsToInline.length} texts to inline`);

  const update = {
    $set: Object.fromEntries(
      await Promise.all(
        textsToInline.map(async ({ textId, path, type }) => [
          path,
          (await findTextOrThrow(textId, payload))[
            type === "richText" ? "richText" : "text"
          ],
        ]),
      ),
    ),
  };

  await payload.db.connection
    .collection("globals")
    .updateOne({ _id: global._id }, update);

  console.log("");
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // Migration code
}

async function findTextOrThrow(id: ObjectId, payload: Payload) {
  const text = await payload.db.connection
    .collection("texts")
    .findOne({ _id: id });
  if (!text) {
    throw new Error(`Text with id ${id} not found`);
  }

  return text;
}

type TextToInline = {
  textId: ObjectId;
  path: string;
  type: "plainText" | "richText";
};

async function migrateData(
  data: Data,
  fields: Field[],
  basePath: string = "",
  textsToInline: TextToInline[] = [],
) {
  for (const field of fields) {
    if (
      (field.type === "text" ||
        field.type === "textarea" ||
        field.type === "richText") &&
      field.localized &&
      !field.virtual
    ) {
      const textId = data[field.name] as ObjectId | undefined;
      if (textId) {
        textsToInline.push({
          textId,
          path: joinPath(basePath, field.name),
          type: field.type === "richText" ? "richText" : "plainText",
        });
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
          await migrateData(
            block,
            blockConfig.fields,
            joinPath(basePath, joinPath(field.name, i.toString())),
            textsToInline,
          );
        }
      }
    } else if (field.type === "tabs") {
      for (const tab of field.tabs) {
        await migrateData(
          "name" in tab ? data[tab.name] : data,
          tab.fields,
          "name" in tab ? joinPath(basePath, tab.name) : basePath,
          textsToInline,
        );
      }
    } else if (field.type === "array") {
      for (const [i, item] of data[field.name].entries()) {
        await migrateData(
          item,
          field.fields,
          joinPath(basePath, joinPath(field.name, i.toString())),
          textsToInline,
        );
      }
    } else if (field.type === "group") {
      await migrateData(
        data[field.name],
        field.fields,
        joinPath(basePath, field.name),
        textsToInline,
      );
    }
  }

  return textsToInline;
}

function joinPath(basePath: string, path: string) {
  return basePath ? `${basePath}.${path}` : path;
}
