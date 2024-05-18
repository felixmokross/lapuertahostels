import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

const baseUrl = "https://ik.imagekit.io/lapuertahostels";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const home = await payload.db.connection.db
    .collection<Home>("globals")
    .findOne({ globalType: "home" });

  await payload.db.connection.db.collection<Home>("globals").updateOne(
    {
      globalType: "home",
    },
    {
      $set: {
        slides: home.slides.map((slide) => ({
          ...slide,
          imageUrl: prependBaseUrl(slide.imageUrl),
        })),
        "accommodations.cards": home.accommodations.cards.map((card) => ({
          ...card,
          imageUrl: prependBaseUrl(card.imageUrl),
        })),
        "aboutSantaMarta.imageUrl": prependBaseUrl(
          home.aboutSantaMarta.imageUrl,
        ),
        "aboutUs.imageUrl": prependBaseUrl(home.aboutUs.imageUrl),
      },
    },
  );
}

function prependBaseUrl(url: string): string {
  return `${baseUrl}/${url}`;
}

type Home = {
  globalType: "home";
  slides: {
    imageUrl: string;
  }[];
  accommodations: {
    cards: {
      imageUrl: string;
    }[];
  };
  aboutSantaMarta: {
    imageUrl: string;
  };
  aboutUs: {
    imageUrl: string;
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
