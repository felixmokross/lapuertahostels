import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.connection.db
    .collection<Before_Home & After_Home>("globals")
    .updateOne({ globalType: "home" }, [
      {
        $set: {
          slides: {
            $map: {
              input: "$slides",
              as: "slide",
              in: {
                $mergeObjects: [
                  "$$slide",
                  { imageAlt: { en: "$$slide.imageAlt" } },
                ],
              },
            },
          },
        },
      },
    ]);
}

type Before_Home = {
  globalType: "home";
  slides: Before_Slide[];
};

type Before_Slide = {
  imageAlt: string;
};

type After_Home = {
  globalType: "home";
  slides: After_Slide[];
};

type After_Slide = {
  imageAlt: Record<string, string>;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
