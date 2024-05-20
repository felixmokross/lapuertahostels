import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { features } = await payload.db.connection.db
    .collection<Before_Azul>("globals")
    .findOne({ globalType: "azul" });

  await payload.db.connection.db.collection<After_Azul>("globals").updateOne(
    { globalType: "azul" },
    {
      $set: {
        layout: [
          {
            items: features,
            id: new ObjectId().toHexString(),
            blockType: "Features",
            blockName: "Features",
          },
        ],
      },
      $unset: { features: "" },
    },
  );
}

type Before_Azul = {
  globalType: "azul";
  features: {
    imageUrl: string;
    imageAlt: Record<string, string>;
    title: Record<string, string>;
    text: Record<string, { [k: string]: unknown }[]>;
    id: string;
  }[];
};

type After_Azul = {
  globalType: "azul";
  layout: {
    elementId?: string;
    items: {
      imageUrl: string;
      imageAlt: Record<string, string>;
      title: Record<string, string>;
      text: Record<string, { [k: string]: unknown }[]>;
      id: string;
    }[];
    id: string;
    blockType: "Features";
    blockName: string;
  }[];
};
export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
