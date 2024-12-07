import { fullTextToTitle } from "@/collections/texts/utils";
import { transformRecord } from "@/common/records";
import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "bson";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const media = await payload.find({
    collection: "media",
    pagination: false,
    locale: "all",
  });

  for (let i = 0; i < media.docs.length; i++) {
    const mediaItem = media.docs[i];
    console.log(`Migrating media item ${i + 1}/${media.docs.length}`);

    if (!mediaItem.alt) continue;

    const result = await payload.db.connection.collection("texts").insertOne({
      text: mediaItem.alt,
      title: transformRecord(
        // @ts-expect-error
        mediaItem.alt,
        fullTextToTitle,
      ),
      type: "plainText",
      updateAt: new Date(),
      createdAt: new Date(),
    });

    payload.db.connection.collection("media").updateOne(
      { _id: new ObjectId(mediaItem.id) },
      {
        $set: {
          alt: result.insertedId,
        },
      },
    );
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
}
