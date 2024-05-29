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
        layout: home.layout?.map((block) => {
          if (block.blockType !== "ImageWithFloatingText") return block;

          const newBlock = {
            ...block,
            image: {
              url: block.imageUrl,
              alt: block.imageAlt,
            },
            overlayTitle: {
              text: block.heading,
              position:
                block.textPosition === "left" ? "top-left" : "top-right",
              overlay: block.imageOverlay,
            },
            text: block.text,
          };

          delete newBlock.imageUrl;
          delete newBlock.imageAlt;
          delete newBlock.heading;
          delete newBlock.textPosition;
          delete newBlock.imageOverlay;

          return newBlock;
        }),
      },
    },
  );
}

type Before_Home = {
  globalType: "home";
  layout: {
    blockType: "ImageWithFloatingText";
    imageUrl: string;
    imageAlt: Record<string, string>;
    heading: Record<string, unknown>;
    text: Record<string, unknown>;
    textPosition: "left" | "right";
    imageOverlay: "subtle" | "moderate" | "intense";
  }[];
};

type After_Home = {
  globalType: "home";
  layout: (
    | {
        blockType: "ImageWithFloatingText";
        image: {
          url: string;
          alt: Record<string, string>;
        };
        overlayTitle: {
          text: Record<string, unknown>;
          position?: string;
          overlay?: string;
        };
        text: Record<string, unknown>;
      }
    | { blockType: string }
  )[];
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
