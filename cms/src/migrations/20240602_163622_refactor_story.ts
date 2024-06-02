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
            block.blockType === "Story"
              ? {
                  blockType: block.blockType,
                  blockName: block.blockName,
                  id: block.id,
                  elementId: block.elementId,
                  text: block.text,
                  heading: block.heading,
                  image: {
                    url: block.imageUrl,
                    alt: block.imageAlt,
                    position: block.imagePosition,
                    grayscale: block.grayscale,
                  },
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
  layout: (Before_Story | { blockType: "other" })[];
};

type After_Page = {
  _id: string;
  layout: (After_Story | { blockType: "other" })[];
};

type Before_Story = {
  blockType: "Story";
  blockName?: string;
  id: string;
  elementId?: string;
  grayscale?: boolean;
  imagePosition?: "left" | "right";
  imageUrl: string;
  imageAlt: Record<string, string>;
  text: Record<string, unknown>;
  heading: Record<string, string>;
};

type After_Story = {
  blockType: "Story";
  blockName?: string;
  id: string;
  elementId?: string;
  text: Record<string, unknown>;
  heading: Record<string, string>;
  image: {
    url: string;
    alt: Record<string, string>;
    position?: "left" | "right";
    grayscale?: boolean;
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
