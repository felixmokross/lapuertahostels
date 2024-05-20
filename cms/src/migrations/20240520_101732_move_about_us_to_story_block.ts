import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const aboutUs = (
    await payload.db.connection.db
      .collection<Before_Home>("globals")
      .findOne({ globalType: "home" })
  ).aboutUs;

  await payload.db.connection.db.collection<After_Home>("globals").updateOne(
    { globalType: "home" },
    {
      $set: {
        layout: [
          {
            heading: aboutUs.heading,
            text: aboutUs.text,
            elementId: "about-us",
            imageUrl: aboutUs.imageUrl,
            imageAlt: aboutUs.imageAlt,
            imagePosition: "left",
            grayscale: aboutUs.grayscale,
            id: new ObjectId().toHexString(),
            blockType: "Story",
            blockName: aboutUs.heading.en,
          },
        ],
      },
      $unset: { aboutUs: "" },
    },
  );
}

type Before_Home = {
  globalType: "home";
  aboutUs: {
    imageUrl: string;
    imageAlt: Record<string, string>;
    grayscale?: boolean | null;
    heading: Record<string, string>;
    text: Record<string, { [k: string]: unknown }[]>;
  };
};

type After_Home = {
  globalType: "home";
  layout: {
    heading: Record<string, string>;
    text: Record<string, { [k: string]: unknown }[]>;
    elementId: string;
    imageUrl: string;
    imageAlt: Record<string, string>;
    imagePosition: string;
    grayscale?: boolean | null;
    id: string;
    blockType: "Story";
    blockName: string;
  }[];
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
