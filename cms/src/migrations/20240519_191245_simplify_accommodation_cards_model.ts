import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const cards = (
    await payload.db.connection.db
      .collection<Before_Home>("globals")
      .findOne({ globalType: "home" })
  ).accommodations.cards;

  await payload.db.connection.db.collection<After_Home>("globals").updateOne(
    { globalType: "home" },
    {
      $set: {
        "accommodations.cards": cards.map((card) => ({
          id: card.id,
          brand: card.color, // the color name implicitly already identified the brand, so we can just use that
          imageUrl: card.imageUrl,
          imageAlt: card.imageAlt,
          description: card.description,
        })),
      },
    },
  );
}

type Before_Home = {
  globalType: "home";
  accommodations: {
    cards: {
      id: string;
      name: string;
      color: string;
      to: string;
      imageUrl: string;
      imageAlt: string;
      description: string;
    }[];
  };
};

type After_Home = {
  globalType: "home";
  accommodations: {
    cards: {
      id: string;
      brand: string;
      imageUrl: string;
      imageAlt: string;
      description: string;
    }[];
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
