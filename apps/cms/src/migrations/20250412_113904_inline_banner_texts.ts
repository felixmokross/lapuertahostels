import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "bson";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const banners = await payload.db.connection
    .collection<Banner_Before>("banners")
    .find()
    .toArray();

  for (const banner of banners) {
    const messageText = await payload.db.connection
      .collection<Text>("texts")
      .findOne({ _id: banner.message });

    const ctaLabelText = banner.cta
      ? await payload.db.connection
          .collection<Text>("texts")
          .findOne({ _id: banner.cta.label })
      : null;

    console.info(`Updating banner ${banner._id}...`);
    await payload.db.connection.collection("banners").updateOne(
      {
        _id: banner._id,
      },
      {
        $set: {
          ...(messageText ? { message: messageText.text } : {}),
          ...(ctaLabelText ? { "cta.label": ctaLabelText.text } : {}),
        },
        $unset: { name: true },
      },
    );
  }
}

type Banner_Before = {
  message: ObjectId;
  cta?: { label: ObjectId };
};

type Text = {
  text: Record<string, string>;
};

export async function down(_: MigrateDownArgs): Promise<void> {
  // Migration code
}
