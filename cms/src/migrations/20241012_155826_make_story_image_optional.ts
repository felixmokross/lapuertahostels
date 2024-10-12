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
                  ...block,
                  image: {
                    show: true,
                    ...block.image,
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
  image: {
    url: string;
    alt: Record<string, string>;
    position?: "left" | "right";
    grayscale?: boolean;
  };
};

type After_Story = {
  blockType: "Story";
  image?: {
    show: boolean;
    url: string;
    alt: Record<string, string>;
    position?: "left" | "right";
    grayscale?: boolean;
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
