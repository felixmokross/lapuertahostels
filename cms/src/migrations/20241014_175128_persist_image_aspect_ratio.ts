import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { getImageKit } from "../common/imagekit";

const imagekit = getImageKit();

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  console.log("Migrating pages…");
  const pages = await payload.db.connection
    .collection("pages")
    .find()
    .toArray();
  for (const page of pages) {
    console.log(`Migrating page ${page._id}…`);
    for (const block of page.layout) {
      if (block.blockType === "Story") {
        console.log(`Story block`);
        await migrateStoryBlock(block);
      } else if (block.blockType === "AccommodationSelector") {
        console.log(`AccommodationSelector block`);
        await migrateAccommodationSelectorBlock(block);
      } else if (block.blockType === "Features") {
        console.log(`Features block`);
        await migrateFeaturesBlock(block);
      } else if (block.blockType === "HeroVideo") {
        console.log(`HeroVideo block`);
        await migrateHeroVideoBlock(block);
      } else if (block.blockType === "ImageWithFloatingText") {
        console.log(`ImageWithFloatingText block`);
        await migrateImageWithFloatingTextBlock(block);
      } else if (block.blockType === "RoomList") {
        console.log(`RoomList block`);
        await migrateRoomListBlock(block);
      } else if (block.blockType === "Slides") {
        console.log(`Slides block`);
        await migrateSlidesBlock(block);
      } else if (block.blockType === "WideImage") {
        console.log(`WideImage block`);
        await migrateWideImageBlock(block);
      } else if (block.blockType === "HeroHeading") {
        console.log(`HeroHeading block`);
        await migrateHeroHeadingBlock(block);
      }
    }

    await payload.db.connection
      .collection("pages")
      .replaceOne({ _id: page._id }, page);
  }

  console.log("");
  console.log("Migrating brands…");
  const brands = await payload.db.connection
    .collection("brands")
    .find()
    .toArray();

  for (const brand of brands) {
    console.log(`Migrating brand ${brand._id}…`);
    await migrateImage(brand.logo);
    await payload.db.connection
      .collection("brands")
      .replaceOne({ _id: brand._id }, brand);
  }
}

async function migrateStoryBlock(block: any) {
  await migrateImage(block.image);
}

async function migrateAccommodationSelectorBlock(block: any) {
  for (const card of block.cards) {
    await migrateImage(card.image);
  }
}

async function migrateFeaturesBlock(block: any) {
  for (const item of block.items) {
    await migrateImage(item.image);
  }
}

async function migrateHeroVideoBlock(block: any) {
  await migrateImage(block.previewImage);
}

async function migrateImageWithFloatingTextBlock(block: any) {
  await migrateImage(block.image);
}

async function migrateRoomListBlock(block: any) {
  for (const room of block.rooms) {
    for (const image of room.images) {
      await migrateImage(image.image);
    }
  }
}

async function migrateWideImageBlock(block: any) {
  await migrateImage(block.image);
}

async function migrateSlidesBlock(block: any) {
  for (const slide of block.slides) {
    await migrateImage(slide.image);
  }
}

async function migrateHeroHeadingBlock(block: any) {
  await migrateImage(block.image);
}

async function migrateImage(image: any) {
  if (image && (!("show" in image) || image.show)) {
    console.log(`Image: ${image.url}`);
    image.aspectRatio = await getImageAspectRatio(image);
    console.log("Aspect ratio:", image.aspectRatio);
  }
}

async function getImageAspectRatio(image: any) {
  const metadata = await imagekit.getFileMetadata(image.url);
  return metadata.width / metadata.height;
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
