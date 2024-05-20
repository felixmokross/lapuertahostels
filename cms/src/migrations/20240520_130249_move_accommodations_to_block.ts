import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { accommodations } = await payload.db.connection.db
    .collection<Before_Home>("globals")
    .findOne({ globalType: "home" });

  await payload.db.connection.db.collection<After_Home>("globals").updateOne(
    { globalType: "home" },
    {
      $push: {
        layout: {
          $each: [
            {
              blockName: "Accommodations",
              blockType: "AccommodationSelector",
              heading: accommodations.heading,
              text: accommodations.text,
              cards: accommodations.cards,
              id: new ObjectId().toHexString(),
            },
          ],
          $position: 0,
        },
      },
      $unset: { accommodations: "" },
    },
  );
}

type Before_Home = {
  globalType: "home";
  accommodations: {
    heading: Record<string, string>;
    text: Record<
      string,
      {
        [k: string]: unknown;
      }[]
    >;
    cards: {
      brand: string;
      imageUrl: string;
      imageAlt: Record<string, string>;
      description: Record<string, string>;
      id: string;
    }[];
  };
};

type After_Home = {
  globalType: "home";
  layout: {
    elementId?: string;
    heading: Record<string, string>;
    text: Record<
      string,
      {
        [k: string]: unknown;
      }[]
    >;
    cards: {
      brand: string;
      imageUrl: string;
      imageAlt: Record<string, string>;
      description: Record<string, string>;
      id: string;
    }[];
    id: string;
    blockType: "AccommodationSelector";
    blockName: string;
  }[];
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
