import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.find<"pages">({ collection: "pages" });

  // we need the DB docs as well, as there is currently no way to retrieve a document for multiple locales
  const pageDocs = await payload.db.connection
    .collection("pages")
    .find()
    .toArray();

  for (const page of pages.docs) {
    const heroBlock = page.hero[0];
    if (
      !heroBlock ||
      heroBlock.blockType !== "HeroHeading" ||
      !heroBlock["image"]
    ) {
      continue;
    }

    if (heroBlock["image"]["show"] || heroBlock["image"]["show"] == null) {
      const altByLocale = pageDocs.find(
        (p) => (p._id as unknown as string) === page.id,
      )!.hero[0].image.alt as Record<string, string>;

      heroBlock["image"] = await migrateMedia(
        heroBlock["image"]["url"],
        altByLocale,
      );
    } else {
      heroBlock["image"] = null;
    }

    await payload.db.connection.collection("pages").updateOne(
      { _id: page.id },
      {
        $set: { "hero.0.image": heroBlock["image"] },
      },
    );
  }

  async function migrateMedia(
    originalUrl: string,
    altByLocale?: Record<string, string>,
  ) {
    const originalMediaUrl = new URL(originalUrl);
    originalMediaUrl.searchParams.set("tr", "orig-true");
    originalMediaUrl.searchParams.set("ik-attachment", "true");

    console.log(`Fetching media ${originalMediaUrl}`);
    const fileName = originalMediaUrl.pathname.split("/").pop();

    const matchingMedia = await payload.find<"media">({
      collection: "media",
      where: { filename: { equals: fileName } },
    });

    if (matchingMedia.docs.length > 0) {
      console.log(`Media ${fileName} already exists`);
      return matchingMedia.docs[0].id as string;
    }

    const response = await fetch(originalMediaUrl.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch media ${originalMediaUrl}`);
    }

    console.log(`Creating media ${fileName}`);
    const media = await payload.create<"media">({
      collection: "media",
      data: {},
      locale: "en",
      file: {
        data: Buffer.from(await response.arrayBuffer()),
        name: fileName,
        mimetype: response.headers.get("content-type"),
        size: Number(response.headers.get("content-length")),
      },
    });

    if (media["filename"] !== fileName) {
      console.warn(`Media was renamed to ${media["filename"]}`);
    }

    if (altByLocale) {
      for (const [locale, alt] of Object.entries(altByLocale)) {
        console.log(
          `Updating alt of media ${media["filename"]} for locale ${locale} with text '${alt}'`,
        );
        await migrateAlt(media.id as string, locale, alt);
      }
    }

    return media.id as string;
  }

  async function migrateAlt(mediaId: string, locale: string, alt: string) {
    await payload.update<"media">({
      collection: "media",
      id: mediaId,
      locale: locale,
      data: { alt: alt },
    });
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
