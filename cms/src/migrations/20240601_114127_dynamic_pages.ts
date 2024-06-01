import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection.db
    .collection<Before_Page>("pages")
    .find({})
    .toArray();

  for (const oldPage of pages) {
    const newPage = { ...oldPage, _id: urlToId(oldPage.url) };

    delete newPage.url;

    await payload.db.connection.db
      .collection<After_Page>("pages")
      .insertOne(newPage);

    await payload.db.connection.db
      .collection("pages")
      .deleteOne({ _id: oldPage._id });
  }
}

type Before_Page = {
  _id: string;
  url: string;
};

type After_Page = {
  _id: string;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}

function urlToId(url: string) {
  return url.replaceAll("/", ":");
}
