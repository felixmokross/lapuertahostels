import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { slides, slideCta } = await payload.db.connection.db
    .collection<Before_Home>("globals")
    .findOne({ globalType: "home" });

  await payload.db.connection.db.collection<After_Home>("globals").updateOne(
    { globalType: "home" },
    {
      $set: {
        hero: [
          {
            slides,
            slideCta,
            id: new ObjectId().toHexString(),
            blockType: "Slides",
            blockName: "Slides",
          },
        ],
      },
      $unset: { slides: "", slideCta: "" },
    },
  );
}

type Before_Home = {
  globalType: "home";
  slides: unknown;
  slideCta: unknown;
};

type After_Home = {
  globalType: "home";
  hero: {
    slides: unknown;
    slideCta: unknown;
    id: string;
    blockType: "Slides";
    blockName?: string;
  }[];
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
