import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.find<"pages">({ collection: "pages" });

  for (const page of pages.docs) {
    const heroBlock = page.hero[0];
    if (!heroBlock || heroBlock.blockType !== "HeroVideo") continue;

    const video = await migrateMedia(heroBlock["videoUrl"]);
    const previewImage = heroBlock.previewImage
      ? await migrateMedia(heroBlock["previewImage"]["url"])
      : undefined;

    await payload.update<"pages">({
      collection: "pages",
      id: page.id,
      data: {
        hero: [
          {
            ...heroBlock,
            video: video.id as string,
            previewImage: previewImage?.id as string | undefined,
          },
        ],
      },
    });
  }

  async function migrateMedia(originalUrl: string) {
    const originalMediaUrl = new URL(originalUrl);
    originalMediaUrl.searchParams.set("tr", "orig-true");
    originalMediaUrl.searchParams.set("ik-attachment", "true");

    console.log(`Fetching media ${originalMediaUrl}`);
    const response = await fetch(originalMediaUrl.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch media ${originalMediaUrl}`);
    }

    const fileName = originalMediaUrl.pathname.split("/").pop();

    console.log(`Creating media ${fileName}`);
    return await payload.create<"media">({
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
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
