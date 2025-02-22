import { Link } from "@/payload-types";
import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.connection.db!.renameCollection("new-pages", "pages", {
    dropTarget: true,
  });

  const links = await payload.db.connection
    .db!.collection<Link>("links")
    .find()
    .toArray();

  console.log(`Migrating ${links.length} links...`);

  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    await payload.db.connection.collection("links").updateOne(
      {
        _id: link._id,
      },
      {
        $set: {
          // @ts-expect-error
          page: link["newPage"],
        },
        $unset: {
          newPage: "",
        },
      },
    );
    console.log(
      `Migrated link: ${link._id.toHexString()} (${i + 1}/${links.length})`,
    );
  }
}

export async function down({
  payload,
  req,
  session,
}: MigrateDownArgs): Promise<void> {
  // Migration code
}
