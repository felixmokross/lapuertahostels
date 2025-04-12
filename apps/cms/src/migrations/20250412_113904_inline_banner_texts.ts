import { findTextUsages } from "@/collections/texts/usages";
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

    if (messageText) {
      const usages = await findTextUsages(messageText._id.toString(), payload);
      if (usages.length === 0) {
        console.info(
          `Deleting text ${messageText._id} because it is not used anymore`,
        );
        await payload.db.connection
          .collection("texts")
          .deleteOne({ _id: messageText._id });
      }
    }

    if (ctaLabelText) {
      const usages = await findTextUsages(ctaLabelText._id.toString(), payload);
      if (usages.length === 0) {
        console.info(
          `Deleting text ${ctaLabelText._id} because it is not used anymore`,
        );
        await payload.db.connection
          .collection("texts")
          .deleteOne({ _id: ctaLabelText._id });
      }
    }
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
