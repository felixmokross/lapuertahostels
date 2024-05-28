import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await migrateHome();
  await migrateAzul();

  async function migrateHome() {
    const { hero } = await payload.db.connection.db
      .collection<Before_Home>("globals")
      .findOne({ globalType: "home" });

    await payload.db.connection.db
      .collection<After_Home>("globals")
      .updateOne(
        { globalType: "home" },
        { $set: { hero: hero.map(toAfterHeroBlock) } },
      );
  }

  async function migrateAzul() {
    const { hero } = await payload.db.connection.db
      .collection<Before_Azul>("globals")
      .findOne({ globalType: "azul" });

    await payload.db.connection.db
      .collection<After_Azul>("globals")
      .updateOne(
        { globalType: "azul" },
        { $set: { hero: hero.map(toAfterHeroBlock) } },
      );
  }
}

function toAfterHeroBlock(block: Before_HeroBlock): After_HeroBlock {
  return block.blockType === "Slides"
    ? {
        blockType: "Slides",
        slides: block.slides.map((slide) => ({
          image: {
            url: slide.imageUrl,
            alt: slide.imageAlt,
          },
          name: slide.name,
          imageAlignment: slide.imagePosition,
          showOverlayTitle: !!slide.title,
          overlayTitle: slide.title && {
            text: slide.title,
            position: slide.titlePosition,
            overlay: slide.imageOverlay,
            showCta: !!slide.ctaUrl,
            cta: slide.ctaUrl && {
              text: block.slideCta,
              url: slide.ctaUrl,
            },
          },
        })),
        blockName: block.blockName,
        id: block.id,
      }
    : block;
}

type Before_Home = {
  globalType: "home";
  hero: Before_HeroBlock[];
};

type Before_Azul = {
  globalType: "azul";
  hero: Before_HeroBlock[];
};

type Before_HeroBlock =
  | {
      slides: {
        name: string;
        title?: Record<string, unknown>;
        titlePosition?: string;
        imageUrl: string;
        imageAlt: Record<string, unknown>;
        imageOverlay?: string;
        imagePosition?: string;
        ctaUrl?: string;
        id: string;
      }[];
      slideCta: Record<string, unknown>;
      id: string;
      blockType: "Slides";
      blockName?: string;
    }
  | { blockType: "HeroVideo" };

type After_Home = {
  globalType: "home";
  hero: After_HeroBlock[];
};

type After_Azul = {
  globalType: "azul";
  hero: After_HeroBlock[];
};

type After_HeroBlock =
  | {
      slides: {
        name: string;
        image: {
          url: string;
          alt: Record<string, unknown>;
        };
        imageAlignment?: string;
        showOverlayTitle: boolean;
        overlayTitle?: {
          text: Record<string, unknown>;
          position?: string;
          overlay?: string;
          showCta: boolean;
          cta?: {
            text: Record<string, unknown>;
            url: string;
          };
        };
      }[];
      id: string;
      blockType: "Slides";
      blockName?: string;
    }
  | { blockType: "HeroVideo" };

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
