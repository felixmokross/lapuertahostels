import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.connection.db
    .collection<Migrate_Common>("globals")
    .updateOne(
      {
        globalType: "common",
      },
      {
        $set: {
          "footer.socialLinks": [
            {
              platform: "facebook",
              url: "#",
            },
            {
              platform: "instagram",
              url: "https://www.instagram.com/lapuertahostels",
            },
            {
              platform: "whatsapp",
              url: "https://wa.me/message/GD4IG2FJPKATE1",
            },
          ],
        },
      },
    );
}

type Migrate_Common = {
  globalType: "common";
  footer: {
    socialLinks: {
      platform: "facebook" | "instagram" | "whatsapp";
      url: string;
    }[];
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
