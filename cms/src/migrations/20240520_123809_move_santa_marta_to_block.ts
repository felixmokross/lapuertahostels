import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { aboutSantaMarta } = await payload.db.connection.db
    .collection<Before_Home>("globals")
    .findOne({ globalType: "home" });

  await payload.db.connection.db.collection<After_Home>("globals").updateOne(
    { globalType: "home" },
    {
      $push: {
        layout: {
          $each: [
            {
              elementId: "santa-marta",
              imageUrl: aboutSantaMarta.imageUrl,
              imageAlt: aboutSantaMarta.imageAlt,
              heading: aboutSantaMarta.heading,
              text: aboutSantaMarta.text,
              id: new ObjectId().toHexString(),
              blockType: "ImageWithFloatingText",
              blockName: "Santa Marta",
            },
          ],
          $position: -1,
        },
      },
      $unset: { aboutSantaMarta: "" },
    },
  );
}

type Before_Home = {
  globalType: "home";
  aboutSantaMarta: {
    imageUrl: string;
    imageAlt: Record<string, string>;
    heading: Record<string, { [k: string]: unknown }[]>;
    text: Record<string, { [k: string]: unknown }[]>;
  };
};

type After_Home = {
  globalType: "home";
  layout: {
    elementId: string;
    imageUrl: string;
    imageAlt: Record<string, string>;
    heading: Record<string, { [k: string]: unknown }[]>;
    text: Record<string, { [k: string]: unknown }[]>;
    id: string;
    blockType: "ImageWithFloatingText";
    blockName: string;
  }[];
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
