import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection
    .collection<any>("pages")
    .find()
    .toArray();

  for (const page of pages) {
    console.log("Migrating page", page._id);
    const result = await payload.db.connection
      .collection("new-pages")
      .insertOne({
        pathname: pageIdToUrl(page._id),
        brand: brandForId(page._id),
        title: page.title,
        hero: page.hero,
        layout: page.layout,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
        __v: page.__v,
      });
    console.log("  Inserted new page");

    const linkResult = await payload.db.connection
      .collection("links")
      .updateMany(
        { page: page._id },
        { $set: { newPage: result.insertedId }, $unset: { page: "" } },
      );
    console.log(`  Updated ${linkResult.modifiedCount} links`);

    await payload.db.connection
      .collection("pages")
      .deleteOne({ _id: page._id });
    console.log("  Deleted old page");
  }
}

function pageIdToUrl(id: string) {
  return id.replaceAll(":", "/");
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
}

function brandForId(id: string) {
  if (id === ":azul" || id.startsWith(":azul:")) {
    return "azul";
  }

  if (id === ":aqua" || id.startsWith(":aqua:")) {
    return "aqua";
  }

  return "puerta";
}
