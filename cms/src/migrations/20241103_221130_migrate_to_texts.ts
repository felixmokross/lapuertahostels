import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const banners = await payload.db.connection
    .collection("banners")
    .find()
    .toArray();
  const texts = await payload.db.connection
    .collection("texts")
    .find()
    .toArray();
  const links = await payload.db.connection
    .collection("links")
    .find()
    .toArray();

  for (const banner of banners) {
    banner.name = (banner.message.en as string).substring(0, 30) + "…";
    banner.message = await createTextIfNeeded(banner.message);

    await payload.db.connection.collection("banners").updateOne(
      {
        _id: banner._id,
      },
      {
        $set: {
          name: banner.name,
          message: banner.message,
        },
      },
    );
  }

  async function createTextIfNeeded(data: any) {
    const matchingText = texts.find((text) => text.text.en === data.en);
    if (matchingText) {
      return matchingText._id.toString();
    }

    const text = {
      text: data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await payload.db.connection
      .collection("texts")
      .insertOne(text);

    texts.push({ _id: result.insertedId, ...text });

    return result.insertedId.toString();
  }

  async function createLinkIfNeeded(data: any) {
    const matchingLink = links.find((link) => isMatchingLink(link, data));
    if (matchingLink) {
      return matchingLink._id.toString();
    }

    const link = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await payload.db.connection
      .collection("links")
      .insertOne(link);

    links.push({ _id: result.insertedId, ...link });

    return result.insertedId.toString();
  }
}
function isMatchingLink(link1: any, link2: any): boolean {
  return (
    link1.label === link2.label &&
    link1.type === link2.type &&
    link1.page === link2.page &&
    link1.url === link2.url
  );
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
