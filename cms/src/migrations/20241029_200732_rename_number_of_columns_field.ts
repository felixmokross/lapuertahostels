import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection
    .collection<Page>("pages")
    .find()
    .toArray();

  for (const page of pages.filter((p) =>
    p.layout.some((b) => b.blockType === "TextColumnsWithImages"),
  )) {
    for (const block of page.layout.filter(
      (b) => b.blockType === "TextColumnsWithImages",
    )) {
      block.numberOfColumns = block.numberOfColumnsPerRow;
      delete block.numberOfColumnsPerRow;
    }

    await payload.db.connection
      .collection<Page>("pages")
      .updateOne({ _id: page._id }, { $set: { layout: page.layout } });
  }
}

type Page = {
  layout: {
    blockType: "TextColumnsWithImages";
    numberOfColumnsPerRow?: number;
    numberOfColumns?: number;
  }[];
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
