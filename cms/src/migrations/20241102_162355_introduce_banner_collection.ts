import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const common = await payload.db.connection
    .collection<Common>("globals")
    .findOne({ globalType: "common" });

  if (!common.banner) {
    console.log("No banner to mgirate");
  }

  const migratedBanner = {
    ...common.banner,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  delete migratedBanner.show;

  const result = await payload.db.connection
    .collection<Banner>("banners")
    .insertOne(migratedBanner);

  if (common.banner.show) {
    await payload.db.connection
      .collection("brands")
      .updateMany({}, { $set: { banner: result.insertedId.toString() } });
  }
}

type Common = {
  banner?: {
    show?: boolean;
  } & Record<string, unknown>;
};

type Banner = Record<string, unknown> & {
  createdAt: Date;
  updatedAt: Date;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
