import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection.db
    .collection<Before_Page>("pages")
    .find()
    .toArray();

  for (const page of pages) {
    await payload.db.connection.db.collection<After_Page>("pages").updateOne(
      { _id: page._id },
      {
        $set: {
          hero: page.hero.map((block) =>
            block.blockType === "HeroVideo"
              ? {
                  blockType: block.blockType,
                  previewImage: { url: block.previewUrl },
                  ...Object.fromEntries(
                    Object.entries(block).filter(
                      ([key]) => key !== "previewUrl",
                    ),
                  ),
                }
              : block,
          ),
        },
      },
    );
  }
}

type Before_Page = {
  _id: string;
  hero: (Before_HeroVideo | { blockType: "other" })[];
};

type After_Page = {
  _id: string;
  hero: (After_HeroVideo | { blockType: "other" })[];
};

type Before_HeroVideo = {
  blockType: "HeroVideo";
  previewUrl: string;
};

type After_HeroVideo = {
  blockType: "HeroVideo";
  previewImage: { url: string };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
