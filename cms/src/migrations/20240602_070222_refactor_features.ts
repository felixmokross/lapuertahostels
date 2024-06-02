import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.connection
    .collection<Before_Page>("pages")
    .find()
    .toArray();

  for (const page of pages) {
    await payload.db.connection.collection<After_Page>("pages").updateOne(
      { _id: page._id },
      {
        $set: {
          layout: page.layout.map((block) =>
            block.blockType === "Features"
              ? {
                  blockType: block.blockType,
                  blockName: block.blockName,
                  id: block.id,
                  orientation: "first-image-left",
                  items: block.items.map((item) => ({
                    image: {
                      url: item.imageUrl,
                      alt: item.imageAlt,
                    },
                    heading: item.title,
                    text: item.text,
                    cta: { show: false },
                  })),
                  elementId: block.elementId,
                }
              : block,
          ),
        },
      },
    );
  }
}

type Before_Page = {
  _id: string;
  layout: (Before_Features | { blockType: "other" })[];
};

type After_Page = {
  _id: string;
  layout: (After_Features | { blockType: "other" })[];
};

type Before_Features = {
  blockType: "Features";
  blockName?: string;
  id: string;
  elementId?: string;
  items: {
    imageUrl: string;
    imageAlt: Record<string, string>;
    title: Record<string, string>;
    text: Record<string, unknown>;
  }[];
};

type After_Features = {
  blockType: "Features";
  blockName?: string;
  id: string;
  orientation?: "first-image-left" | "first-image-right";
  items: {
    image: {
      url: string;
      alt: Record<string, string>;
    };
    heading: Record<string, string>;
    text: Record<string, unknown>;
    cta?: {
      show: boolean;
      text?: Record<string, string>;
      url?: string;
    };
  }[];
  elementId?: string;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
