import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { Common } from "../globals/Common";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const allTexts = [];
  const allLinks = [];

  const common = await payload.db.connection
    .collection("globals")
    .findOne<Common>({ globalType: "common" });

  for (const linkGroup of common.footer.linkGroups) {
    linkGroup["name"] = linkGroup.title["en"];
    linkGroup.title = await createTextIfNeeded(linkGroup.title);

    const linkIds: string[] = [];
    for (const link of linkGroup.links) {
      delete link.id;

      const name = link.label["en"];

      link.label = await createTextIfNeeded(link.label);

      linkIds.push(await createLinkIfNeeded({ ...link, name }));
    }

    linkGroup.links = linkIds as any[];
  }

  await payload.db.connection
    .collection("brands")
    .updateMany(
      {},
      { $set: { "footer.linkGroups": common.footer.linkGroups } },
    );

  await payload.db.connection
    .collection<Common>("globals")
    .updateOne(
      { globalType: "common" },
      { $unset: { "footer.linkGroups": 1 } },
    );

  const brands = await payload.db.connection
    .collection("brands")
    .find()
    .toArray();

  for (const brand of brands) {
    const linkIds = [];

    for (const navLink of brand.navLinks) {
      delete navLink.id;

      const name = navLink.label["en"];
      navLink.label = await createTextIfNeeded(navLink.label);

      linkIds.push(await createLinkIfNeeded({ ...navLink, name }));
    }

    await payload.db.connection
      .collection("brands")
      .updateOne({ _id: brand._id }, { $set: { navLinks: linkIds } });
  }

  async function createTextIfNeeded(data: any) {
    const matchingText = allTexts.find((text) =>
      isMatchingText(text.text, data),
    );
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

    allTexts.push({ _id: result.insertedId, ...text });

    return result.insertedId.toString();
  }

  async function createLinkIfNeeded(data: any) {
    const matchingLink = allLinks.find((link) => isMatchingLink(link, data));
    if (matchingLink) {
      return matchingLink._id.toString();
    }

    const link = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await payload.db.connection
      .collection("links")
      .insertOne(link);

    allLinks.push({ _id: result.insertedId, ...link });

    return result.insertedId.toString();
  }
}

type Common = {
  globalType: "common";
  footer: {
    linkGroups: {
      title: Record<string, string> | string;
      links: {
        label: Record<string, string> | string;
        type: "internal" | "external";
        page?: string;
        url?: string;
        queryString?: string;
        fragment?: string;
        id: string;
      }[];
      id: string;
    }[];
  };
};

function isMatchingText(text1: any, text2: any): boolean {
  return (
    text1.en === text2.en &&
    text1.es === text2.es &&
    text1.fr === text2.fr &&
    text1.de === text2.de
  );
}

function isMatchingLink(link1: any, link2: any): boolean {
  return (
    link1.label === link2.label &&
    link1.type === link2.type &&
    link1.page === link2.page &&
    link1.url === link2.url &&
    link1.queryString === link2.queryString &&
    link1.fragment === link2.fragment
  );
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
