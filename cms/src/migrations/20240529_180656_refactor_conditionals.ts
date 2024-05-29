import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await migrateHome();
  await migrateAzul();
  await migrateAqua();

  async function migrateHome() {
    const home = await payload.db.connection.db
      .collection<Before_Home>("globals")
      .findOne({ globalType: "home" });

    if (!home) return;

    await payload.db.connection.db
      .collection<After_Home>("globals")
      .updateOne(
        { globalType: "home" },
        { $set: { hero: home.hero?.map(toAfterHeroBlock) } },
      );
  }

  async function migrateAzul() {
    const azul = await payload.db.connection.db
      .collection<Before_Azul>("globals")
      .findOne({ globalType: "azul" });

    if (!azul) return;

    await payload.db.connection.db
      .collection<After_Azul>("globals")
      .updateOne(
        { globalType: "azul" },
        { $set: { hero: azul.hero?.map(toAfterHeroBlock) } },
      );
  }

  async function migrateAqua() {
    const aqua = await payload.db.connection.db
      .collection<Before_Aqua>("globals")
      .findOne({ globalType: "aqua" });
    if (!aqua) return;

    await payload.db.connection.db
      .collection<After_Aqua>("globals")
      .updateOne(
        { globalType: "aqua" },
        { $set: { hero: aqua.hero?.map(toAfterHeroBlock) } },
      );
  }
}

function toAfterHeroBlock(block: Before_HeroBlock): After_HeroBlock {
  switch (block.blockType) {
    case "HeroVideo":
      return {
        blockType: "HeroVideo",
        blockName: block.blockName,
        id: block.id,
        overlayTitle: {
          show: block.showOverlayTitle,
          text: block.overlayTitle?.text,
          position: block.overlayTitle?.position,
          overlay: block.overlayTitle?.overlay,
          cta: {
            show: block.overlayTitle?.showCta,
            text: block.overlayTitle?.cta?.text,
            url: block.overlayTitle?.cta?.url,
          },
        },
      };
    case "Slides":
      return {
        blockType: "Slides",
        blockName: block.blockName,
        id: block.id,
        slides: block.slides.map((slide) => ({
          image: {
            url: slide.image.url,
            alt: slide.image.alt,
            alignment: slide.imageAlignment,
          },
          name: slide.name,
          overlayTitle: {
            show: slide.showOverlayTitle,
            text: slide.overlayTitle?.text,
            position: slide.overlayTitle?.position,
            overlay: slide.overlayTitle?.overlay,
            cta: {
              show: slide.overlayTitle?.showCta,
              text: slide.overlayTitle?.cta?.text,
              url: slide.overlayTitle?.cta?.url,
            },
          },
        })),
      };
  }
}

type Before_Home = {
  globalType: "home";
  hero: Before_HeroBlock[];
};

type Before_Azul = {
  globalType: "azul";
  hero: Before_HeroBlock[];
};

type Before_Aqua = {
  globalType: "aqua";
  hero: Before_HeroBlock[];
};

type Before_HeroBlock =
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
  | {
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
      id: string;
      blockType: "HeroVideo";
      blockName?: string;
    };

type After_Home = {
  globalType: "home";
  hero: After_HeroBlock[];
};

type After_Azul = {
  globalType: "azul";
  hero: After_HeroBlock[];
};

type After_Aqua = {
  globalType: "aqua";
  hero: After_HeroBlock[];
};

type After_HeroBlock =
  | {
      slides: {
        name: string;
        image: {
          url: string;
          alt: Record<string, unknown>;
          alignment?: string;
        };
        overlayTitle: {
          show: boolean;
          text?: Record<string, unknown>;
          position?: string;
          overlay?: string;
          cta?: {
            show: boolean;
            text?: Record<string, unknown>;
            url?: string;
          };
        };
      }[];
      id: string;
      blockType: "Slides";
      blockName?: string;
    }
  | {
      overlayTitle: {
        show: boolean;
        text?: Record<string, unknown>;
        position?: string;
        overlay?: string;
        cta?: {
          show: boolean;
          text?: Record<string, unknown>;
          url?: string;
        };
      };
      id: string;
      blockType: "HeroVideo";
      blockName?: string;
    };

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
