import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.connection
    .collection<Before_Brand & After_Brand>("brands")
    .updateMany(
      {},
      {
        $rename: {
          logoUrl: "logo.url",
        },
      },
    );
}

type Before_Brand = {
  logoUrl: string;
};

type After_Brand = {
  logo: { url: string };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
