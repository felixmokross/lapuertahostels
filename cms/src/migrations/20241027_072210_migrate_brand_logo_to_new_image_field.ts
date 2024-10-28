import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const brands = await payload.find<"brands">({ collection: "brands" });

  for (const brand of brands.docs) {
    const logoUrl = new URL(brand.logo["url"]);
    logoUrl.searchParams.set("tr", "orig-true");
    logoUrl.searchParams.set("ik-attachment", "true");

    console.log(`Fetching logo for brand ${brand.id} at ${logoUrl.toString()}`);
    const logoResponse = await fetch(logoUrl.toString());
    if (!logoResponse.ok) {
      throw new Error(`Failed to fetch logo for brand ${brand.id}`);
    }

    const fileName = logoUrl.pathname.split("/").pop();

    console.log(`Creating media for brand ${brand.id} with name ${fileName}`);
    const logo = await payload.create<"media">({
      collection: "media",
      data: {
        alt: `${brand.name} Logo`,
      },
      locale: "en",
      file: {
        data: Buffer.from(await logoResponse.arrayBuffer()),
        name: fileName,
        mimetype: logoResponse.headers.get("content-type"),
        size: Number(logoResponse.headers.get("content-length")),
      },
    });

    console.log("Updating alt texts for logo");
    await payload.update<"media">({
      collection: "media",
      id: logo.id,
      locale: "es",
      data: { alt: `Logo de ${brand.name}` },
    });
    await payload.update<"media">({
      collection: "media",
      id: logo.id,
      locale: "de",
      data: { alt: `Logo von ${brand.name}` },
    });
    await payload.update<"media">({
      collection: "media",
      id: logo.id,
      locale: "fr",
      data: { alt: `Logo de ${brand.name}` },
    });

    await payload.update<"brands">({
      collection: "brands",
      id: brand.id,
      data: {
        logo: logo.id as string,
      },
    });
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
