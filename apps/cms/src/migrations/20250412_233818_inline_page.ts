import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "bson";
import { Data, Field, Payload } from "payload";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection
    .collection("pages")
    .find()
    .toArray();

  for (const page of pages) {
    console.log(`Migrating page ${page._id} '${page.pathname}…`);
    const textsToInline = await migrateData(
      page,
      payload.collections.pages.config.fields,
    );

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
      .collection("pages")
      .updateOne({ _id: page._id }, update);

    console.log("");
  }
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
