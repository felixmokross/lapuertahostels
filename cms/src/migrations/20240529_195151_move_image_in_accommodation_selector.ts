import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const home = await payload.db.connection.db
    .collection<Before_Home>("globals")
    .findOne({ globalType: "home" });

  if (!home) return;

  await payload.db.connection.db.collection<After_Home>("globals").updateOne(
    { globalType: "home" },
    {
      $set: {
        layout: home.layout?.map((block) =>
          block.blockType === "AccommodationSelector"
            ? {
                ...block,
                cards: block.cards.map((card) => {
                  const newCard = {
                    ...card,
                    image: {
                      url: card.imageUrl,
                      alt: card.imageAlt,
                    },
                  };

                  delete newCard.imageUrl;
                  delete newCard.imageAlt;

                  return newCard;
                }),
              }
            : block,
        ),
      },
    },
  );
}

type Before_Home = {
  globalType: "home";
  layout: {
    blockType: "AccommodationSelector";
    cards: {
      imageUrl: string;
      imageAlt: Record<string, string>;
    }[];
  }[];
};

type After_Home = {
  globalType: "home";
  layout: (
    | {
        blockType: "AccommodationSelector";
        cards: {
          image: {
            url: string;
            alt: Record<string, string>;
          };
        }[];
      }
    | { blockType: string }
  )[];
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
