import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { intro } = await payload.db.connection.db
    .collection<Before_Home>("globals")
    .findOne({ globalType: "home" });

  await payload.db.connection.db.collection<After_Home>("globals").updateOne(
    { globalType: "home" },
    {
      $push: {
        layout: {
          $each: [
            {
              heading: intro.heading,
              text: intro.text,
              id: new ObjectId().toHexString(),
              blockType: "Lead",
              blockName: "Intro",
            },
          ],
          $position: 0,
        },
      },
      $unset: { intro: "" },
    },
  );
}

type Before_Home = {
  globalType: "home";
  intro: {
    heading: Record<string, string>;
    text: Record<string, { [k: string]: unknown }[]>;
  };
};

type After_Home = {
  globalType: "home";
  layout: {
    elementId?: string;
    heading: Record<string, string>;
    text: Record<string, { [k: string]: unknown }[]>;
    id: string;
    blockType: "Lead";
    blockName: string;
  }[];
};
export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
