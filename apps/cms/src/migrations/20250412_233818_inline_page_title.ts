import { findTextUsages } from "@/collections/texts/usages";
import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "bson";

export async function up({
  payload,
  req,
  session,
}: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection
    .collection<Page_Before>("pages")
    .find()
    .toArray();

  for (const page of pages) {
    const titleText = page.title
      ? await payload.db.connection
          .collection<Text>("texts")
          .findOne({ _id: page.title })
      : null;

    const seoDescriptionText = page.seo?.description
      ? await payload.db.connection
          .collection<Text>("texts")
          .findOne({ _id: page.seo.description })
      : null;

    console.info(`Updating page ${page._id}...`);
    await payload.db.connection.collection("pages").updateOne(
      {
        _id: page._id,
      },
      {
        $set: {
          ...(titleText ? { title: titleText.text } : {}),
          ...(seoDescriptionText
            ? { "seo.description": seoDescriptionText.text }
            : {}),
        },
      },
    );

    if (titleText) {
      const usages = await findTextUsages(titleText._id.toString(), payload);
      if (usages.length === 0) {
        console.info(
          `Deleting text ${titleText._id} because it is not used anymore`,
        );
        await payload.db.connection
          .collection("texts")
          .deleteOne({ _id: titleText._id });
      }
    }

    if (seoDescriptionText) {
      const usages = await findTextUsages(
        seoDescriptionText._id.toString(),
        payload,
      );
      if (usages.length === 0) {
        console.info(
          `Deleting text ${seoDescriptionText._id} because it is not used anymore`,
        );
        await payload.db.connection
          .collection("texts")
          .deleteOne({ _id: seoDescriptionText._id });
      }
    }
  }
}

type Page_Before = {
  title: ObjectId;
  seo?: { description?: ObjectId };
};

type Text = {
  text: Record<string, string>;
};
export async function down(_: MigrateDownArgs): Promise<void> {
  // Migration code
}
