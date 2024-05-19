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
          "footer.linkGroups": [
            {
              title: { en: "Hotel" },
              links: [
                { name: { en: "About Us" }, url: ".#about-us" },
                { name: { en: "Puerta Aqua" }, url: "/aqua" },
                { name: { en: "La Puerta Azul" }, url: "/azul" },
                { name: { en: "Contact" }, url: "#" },
              ],
            },
            {
              title: { en: "Experiences" },
              links: [
                { name: { en: "Santa Marta" }, url: ".#santa-marta" },
                { name: { en: "Lost City" }, url: "#" },
                { name: { en: "Tayrona Park" }, url: "#" },
                { name: { en: "Minca" }, url: "#" },
              ],
            },
            {
              title: { en: "Legal" },
              links: [
                { name: { en: "Terms" }, url: "#" },
                { name: { en: "Cancelation" }, url: "#" },
                { name: { en: "Privacy" }, url: "#" },
                { name: { en: "FAQ" }, url: "#" },
              ],
            },
          ],
        },
      },
    );
}

type Migrate_Common = {
  globalType: "common";
  footer: {
    linkGroups: {
      title: Record<string, string>;
      links: {
        name: Record<string, string>;
        url: string;
      }[];
    }[];
  };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
