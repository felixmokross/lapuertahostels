import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { slides, slideCta } = await payload.db.connection.db
    .collection<Before_Azul>("globals")
    .findOne({ globalType: "azul" });

  await payload.db.connection.db.collection<After_Azul>("globals").updateOne(
    { globalType: "azul" },
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

type Before_Azul = {
  globalType: "azul";
  slides: unknown;
  slideCta: unknown;
};

type After_Azul = {
  globalType: "azul";
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
