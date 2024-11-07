import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection
    .collection("pages")
    .find()
    .toArray();
  const texts = await payload.db.connection
    .collection("texts")
    .find()
    .toArray();
  const links = await payload.db.connection
    .collection("links")
    .find()
    .toArray();

  const common = await payload.db.connection
    .collection("globals")
    .findOne({ globalType: "common" });

  await payload.db.connection.collection("globals").updateOne(
    { globalType: "common" },
    {
      $set: {
        "errorScreen.heading": await createTextIfNeeded(
          common.errorScreen.heading,
        ),
        "pageNotFoundScreen.heading": await createTextIfNeeded(
          common.pageNotFoundScreen.heading,
        ),
      },
    },
  );

  for (const page of pages) {
    const blocks = page.layout.filter(
      (b) => b.blockType === "TextColumnsWithImages",
    );
    if (blocks.length === 0) continue;

    for (const block of blocks) {
      if (block.heading) {
        block.heading = await createTextIfNeeded(block.heading);
      }

      for (const item of block.items) {
        if (item.heading) {
          item.heading = await createTextIfNeeded(item.heading);
        }

        if (item.cta) {
          item.cta.link = await createLinkIfNeeded(item.cta.link);
        }
      }
    }

    await payload.db.connection
      .collection("pages")
      .updateOne({ _id: page._id }, { $set: { layout: page.layout } });
  }

  async function createTextIfNeeded(data: any) {
    const matchingText = texts.find((text) => text.text.en === data.en);
    if (matchingText) {
      return matchingText._id.toString();
    }

    const text = {
      text: data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await payload.db.connection
      .collection("texts")
      .insertOne(text);

    texts.push({ _id: result.insertedId, ...text });

    return result.insertedId.toString();
  }

  async function createLinkIfNeeded(data: any) {
    const matchingLink = links.find((link) => isMatchingLink(link, data));
    if (matchingLink) {
      return matchingLink._id.toString();
    }

    const link = {
      ...data,
      label: await createTextIfNeeded(data.label),
      name: `${data.label.en}${data.type === "external" ? ` (${data.url})` : ` (${data.page.replaceAll(":", "/")})`}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await payload.db.connection
      .collection("links")
      .insertOne(link);

    links.push({ _id: result.insertedId, ...link });

    return result.insertedId.toString();
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}

function isMatchingLink(link1: any, link2: any): boolean {
  return (
    link1.label === link2.label &&
    link1.type === link2.type &&
    link1.page === link2.page &&
    link1.url === link2.url
  );
}
