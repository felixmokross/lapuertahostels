import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { Text } from "payload/generated-types";
import { Node } from "slate";
import { pageIdToUrl, urlToPageId } from "../common/page-urls";

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

  const brands = await payload.db.connection
    .collection("brands")
    .find()
    .toArray();

  const banners = await payload.db.connection
    .collection("banners")
    .find()
    .toArray();

  for (const brand of brands) {
    const navLinkObjects = [];

    for (const navLink of brand.navLinks) {
      const link = links.find((l) => l._id.toString() === navLink);
      navLinkObjects.push({
        label: link.label,
        link: navLink,
      });
    }

    for (const footerLinkGroup of brand.footer.linkGroups) {
      const footerLinkObjects = [];
      for (const footerLink of footerLinkGroup.links) {
        const link = links.find((l) => l._id.toString() === footerLink);
        footerLinkObjects.push({
          label: link.label,
          link: footerLink,
        });
      }

      footerLinkGroup.links = footerLinkObjects;
    }

    await payload.db.connection.collection("brands").updateOne(
      { _id: brand._id },
      {
        $set: {
          homeLink: await createLinkIfNeeded({
            type: "internal",
            page: urlToPageId(brand.homeLinkUrl),
          }),
          navLinks: navLinkObjects,
          "footer.linkGroups": brand.footer.linkGroups,
        },
        $unset: { homeLinkUrl: "" },
      },
    );
  }

  for (const banner of banners) {
    if (banner.cta) {
      const link = links.find((l) => l._id.toString() === banner.cta);
      await payload.db.connection.collection("banners").updateOne(
        { _id: banner._id },
        {
          $set: {
            cta: {
              show: true,
              label: link.label,
              link: banner.cta,
            },
          },
        },
      );
    }
  }

  for (const link of links) {
    await payload.db.connection.collection("links").updateOne(
      { _id: link._id },
      {
        $unset: { label: "", name: "" },
        $set: { title: getLinkTitle(link) },
      },
    );
  }

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
    let updatePage = false;
    const textColumnsWithImagesBlocks = page.layout.filter(
      (b) => b.blockType === "TextColumnsWithImages",
    );

    if (textColumnsWithImagesBlocks.length > 0) {
      updatePage = true;
      for (const block of textColumnsWithImagesBlocks) {
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
            item.cta.label = await createTextIfNeeded(item.cta.link.label);
            item.cta.link = await createLinkIfNeeded(item.cta.link);
          }
        }
      }
    }

    const accommodationSelectorBlocks = page.layout.filter(
      (b) => b.blockType === "AccommodationSelector",
    );

    if (accommodationSelectorBlocks.length > 0) {
      updatePage = true;
      for (const block of accommodationSelectorBlocks) {
        block.heading = await createTextIfNeeded(block.heading);

        block.text = await createTextIfNeeded(block.text, "richText");

        for (const card of block.cards) {
          card.description = await createTextIfNeeded(
            Object.fromEntries(
              Object.entries(card.description).map(([locale, value]) => [
                locale,
                [{ children: [{ text: value }] }],
              ]),
            ),
            "richText",
          );
        }
      }
    }

    const featuresBlocks = page.layout.filter(
      (b) => b.blockType === "Features",
    );

    if (featuresBlocks.length > 0) {
      updatePage = true;
      for (const block of featuresBlocks) {
        for (const item of block.items) {
          item.heading = await createTextIfNeeded(item.heading);
          item.text = await createTextIfNeeded(item.text, "richText");

          if (item.cta?.show) {
            item.cta.label = await createTextIfNeeded(item.cta.link.label);
            item.cta.link = await createLinkIfNeeded(item.cta.link);
          } else {
            delete item.cta;
          }
        }
      }
    }

    if (updatePage) {
      await payload.db.connection
        .collection("pages")
        .updateOne({ _id: page._id }, { $set: { layout: page.layout } });
    }
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
      title: getLinkTitle(data),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    delete link.name;
    delete link.label;

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
    link1.type === link2.type &&
    link1.page === link2.page &&
    link1.url === link2.url
  );
}

function getLinkTitle(link: any) {
  switch (link.type) {
    case "internal":
      return `${pageIdToUrl(link.page)}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`;
    case "external":
      return `${link.url}`;
  }
}
