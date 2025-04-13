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
          textsToInline.map(async ({ textId, path }) => [
            path,
            (await findTextOrThrow(textId, payload)).text,
          ]),
        ),
      ),
    };

    await payload.db.connection
      .collection("pages")
      .updateOne({ _id: page._id }, update);

    console.log("");
  }

  // for (const page of pages) {
  //   const titleText = await findText(page.title, payload);
  //   const seoDescriptionText = await findText(page.seo?.description, payload);

  //   const heroHeadingTextsWithIndex = await getTextsFromBlocksWithIndex(
  //     page.hero,
  //     "HeroHeading",
  //     (h) => h.heading,
  //     payload,
  //   );

  //   const storyHeadingTextsWithIndex = await getTextsFromBlocksWithIndex(
  //     page.layout,
  //     "Story",
  //     (h) => h.heading,
  //     payload,
  //   );

  //   const heroSlidesHeadingTextsWithIndex = await getTextsFromBlocksWithIndex(
  //     page.hero,
  //     "HeroSlides",
  //     (h) => (h as HeroSlidesBlock_Before).seoPageHeading,
  //     payload,
  //   );

  //   console.info(`Updating page ${page._id} '${page.pathname}'...`);
  //   await payload.db.connection.collection("pages").updateOne(
  //     {
  //       _id: page._id,
  //     },
  //     {
  //       $set: {
  //         ...(titleText ? { title: titleText.text } : {}),
  //         ...(seoDescriptionText
  //           ? { "seo.description": seoDescriptionText.text }
  //           : {}),
  //         ...Object.fromEntries(
  //           heroHeadingTextsWithIndex.map(([t, i]) => [
  //             `hero.${i}.heading`,
  //             t.text,
  //           ]),
  //         ),
  //         ...Object.fromEntries(
  //           storyHeadingTextsWithIndex.map(([t, i]) => [
  //             `layout.${i}.heading`,
  //             t.text,
  //           ]),
  //         ),
  //         ...Object.fromEntries(
  //           heroSlidesHeadingTextsWithIndex.map(([t, i]) => [
  //             `hero.${i}.seoPageHeading`,
  //             t.text,
  //           ]),
  //         ),
  //       },
  //     },
  //   );
  // }
}

// type Page_Before = {
//   title: ObjectId;
//   pathname: string;
//   seo?: { description?: ObjectId };
//   hero?: (HeroHeadingBlock_Before | { blockType: unknown })[];
//   layout?: (StoryBlock_Before | { blockType: unknown })[];
// };

// type HeroHeadingBlock_Before = { blockType: "HeroHeading"; heading: ObjectId };
// type HeroSlidesBlock_Before = {
//   blockType: "HeroSlides";
//   seoPageHeading: ObjectId;
// };
// type StoryBlock_Before = { blockType: "Story"; heading: ObjectId };

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

// async function getTextsFromBlocksWithIndex(
//   blocks: { blockType: string | unknown }[] | undefined,
//   blockType: string,
//   getTextId: (data: any) => ObjectId | undefined,
//   payload: Payload,
// ): Promise<GetTextsFromBlocksResult> {
//   const textIdsWithIndex =
//     blocks
//       ?.map((b, index) => [b, index] as const)
//       .filter(([data]) => data.blockType === blockType)
//       .map(([data, index]) => [getTextId(data), index] as const) || [];

//   const textsWithIndex = (
//     await Promise.all(
//       textIdsWithIndex
//         .filter(([id]) => !!id)
//         .map(
//           async ([id, index]) => [await findText(id, payload), index] as const,
//         ),
//     )
//   ).filter(([t]) => t !== null) as [Text, number][];

//   return textsWithIndex;
// }

type TextToInline = {
  textId: ObjectId;
  path: string;
};

async function migrateData(
  data: Data,
  fields: Field[],
  basePath: string = "",
  textsToInline: TextToInline[] = [],
) {
  for (const field of fields) {
    if (
      (field.type === "text" || field.type === "textarea") &&
      field.localized
    ) {
      const textId = data[field.name] as ObjectId | undefined;
      if (textId) {
        textsToInline.push({ textId, path: joinPath(basePath, field.name) });
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
