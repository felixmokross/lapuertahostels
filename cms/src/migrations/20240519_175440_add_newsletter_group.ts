import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.connection.collection<Migrate_Common>("globals").updateOne(
    { globalType: "common" },
    {
      $set: {
        "footer.newsletter": {
          show: true,
          title: { en: "Subscribe to our newsletter" },
          description: {
            en: "Don’t miss out on new experiences, discounts, or any other news from us!",
          },
          emailPlaceholder: { en: "Enter your email" },
          buttonLabel: { en: "Subscribe" },
        },
      },
    },
  );
}

type Migrate_Common = {
  globalType: "common";
  footer: {
    newsletter: {
      show: boolean;
      title: Record<string, string>;
      description: Record<string, string>;
      emailPlaceholder: Record<string, string>;
      buttonLabel: Record<string, string>;
    };
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
