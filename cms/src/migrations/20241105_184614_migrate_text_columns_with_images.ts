import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { Text } from "payload/generated-types";
import { Node } from "slate";

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

  for (const text of texts) {
    await payload.db.connection
      .collection("texts")
      .updateOne(
        { _id: text._id },
        { $set: { title: text.text, type: "plainText" } },
      );
  }

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
        "errorScreen.text": await createTextIfNeeded(
          common.errorScreen.text,
          "richText",
        ),
        "pageNotFoundScreen.heading": await createTextIfNeeded(
          common.pageNotFoundScreen.heading,
        ),
        "pageNotFoundScreen.text": await createTextIfNeeded(
          common.pageNotFoundScreen.text,
          "richText",
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

      if (block.text) {
        block.text = await createTextIfNeeded(block.text, "richText");
      }

      for (const item of block.items) {
        if (item.heading) {
          item.heading = await createTextIfNeeded(item.heading);
        }

        if (item.text) {
          item.text = await createTextIfNeeded(item.text, "richText");
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

  async function createTextIfNeeded(
    data: any,
    type: Text["type"] = "plainText",
  ) {
    const matchingText =
      type === "plainText" &&
      texts
        .filter((t) => t.type === "plainText")
        .find((text) => text.text.en === data.en);
    if (matchingText) {
      return matchingText._id.toString();
    }

    const text = {
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (type === "richText") {
      text["richText"] = data;
      text["title"] = Object.fromEntries(
        Object.entries(data).map(([locale, value]) => [
          locale,
          (value as Node[]).map((n) => Node.string(n)).join(" "),
        ]),
      );
    } else if (type === "plainText") {
      text["text"] = data;
      text["title"] = data;
    }

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
