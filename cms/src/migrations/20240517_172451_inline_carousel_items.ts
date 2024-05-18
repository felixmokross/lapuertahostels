import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import type { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const carouselItems = await payload.db.connection.db
    .collection<Before_CarouselItem>("carouselitems")
    .find({})
    .toArray();

  console.info(`Found ${carouselItems.length} 'carouselitems' to migrate`);
  const slides = carouselItems.map<After_Slide>((item) => ({
    id: item._id.toHexString(),
    name: item.name,
    title: item.title,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    ctaUrl: item.ctaUrl,
    titlePosition: item.titlePosition,
  }));

  console.info(`Updating 'home' global…`);
  await payload.db.connection.db
    .collection<Before_Home & After_Home>("globals")
    .updateOne(
      { globalType: "home" },
      { $set: { slides }, $unset: { hero: "" } },
    );

  console.info(`Dropping 'carouselitems'`);
  await payload.db.connection.db
    .collection<Before_CarouselItem>("carouselitems")
    .drop();
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}

type Before_CarouselItem = {
  _id: ObjectId;
  name: string;
  title: object;
  imageUrl: string;
  imageAlt: string;
  ctaUrl: string;
  titlePosition: string;
};

type Before_Home = {
  globalType: "home";
  hero: unknown;
};

type After_Home = {
  globalType: "home";
  slides: After_Slide[];
};

type After_Slide = {
  id: string;
  name: string;
  title: object;
  imageUrl: string;
  imageAlt: string;
  ctaUrl: string;
  titlePosition: string;
};
