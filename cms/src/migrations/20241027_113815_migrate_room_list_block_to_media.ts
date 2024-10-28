import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.find<"pages">({
    collection: "pages",
    locale: "en",
  });

  // we need the DB docs as well, as there is currently no way to retrieve a document for multiple locales
  const pageDocs = await payload.db.connection
    .collection("pages")
    .find()
    .toArray();

  for (const page of pages.docs) {
    let updatePage = false;
    const layout = page.layout as any[];
    if (!layout) continue;

    for (const block of layout) {
      if (block.blockType !== "RoomList") continue;

      for (const room of block["rooms"]) {
        for (const image of room["images"]) {
          const altByLocale = pageDocs
            .find((p) => (p._id as unknown as string) === page.id)!
            .layout.find((b) => b.id === block.id)!
            .rooms.find((r) => r.id === room.id)!
            .images.find((i) => i.id === image.id)!.image.alt;

          const migratedImageId = await migrateMedia(
            image["image"].url,
            altByLocale,
          );
          image["image"] = migratedImageId as string;

          updatePage = true;
        }
      }
    }

    if (updatePage) {
      console.log(`Updating page ${page.id}`);
      await payload.update<"pages">({
        collection: "pages",
        id: page.id,
        data: { layout },
      });
    }
  }

  async function migrateMedia(
    url: string,
    altByLocale?: Record<string, string>,
  ) {
    const originalMediaUrl = new URL(url);
    originalMediaUrl.searchParams.set("tr", "orig-true");
    originalMediaUrl.searchParams.set("ik-attachment", "true");

    console.log(`Fetching media ${originalMediaUrl}`);
    const response = await fetch(originalMediaUrl.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch media ${originalMediaUrl}`);
    }

    const fileName = originalMediaUrl.pathname.split("/").pop();

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

    return media.id;
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
