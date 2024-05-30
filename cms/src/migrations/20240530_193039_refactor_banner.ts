import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { banner } = await payload.db.connection.db
    .collection<Before_Common>("globals")
    .findOne({ globalType: "common" });

  await payload.db.connection.db.collection<After_Common>("globals").updateOne(
    { globalType: "common" },
    {
      $set: {
        "banner.show": !!banner.message,
        "banner.cta": banner.message
          ? {
              text: banner.cta,
              url: banner.ctaUrl,
            }
          : undefined,
      },
      $unset: {
        "banner.ctaUrl": "",
      },
    },
  );
}

type Before_Common = {
  globalType: "common";
  banner: {
    message: Record<string, string>;
    cta: Record<string, string>;
    ctaUrl: string;
  };
};

type After_Common = {
  globalType: "common";
  banner: {
    show: boolean;
    message?: Record<string, string>;
    cta?: {
      text: Record<string, string>;
      url: string;
    };
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
