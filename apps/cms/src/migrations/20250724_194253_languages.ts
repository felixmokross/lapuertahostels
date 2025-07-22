import { Locale } from "@/payload-types";
import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const locales: Omit<Locale, "id" | "createdAt" | "updatedAt">[] = [
    {
      locale: "en",
      displayLabel: "English",
      deeplSourceLanguage: "en",
      deeplTargetLanguage: "en-US",
      googleMapsLanguage: "en",
    },
    {
      locale: "es",
      displayLabel: "Español",
      deeplSourceLanguage: "es",
      deeplTargetLanguage: "es-419",
      googleMapsLanguage: "es-419",
    },
    {
      locale: "de",
      displayLabel: "Deutsch",
      deeplSourceLanguage: "de",
      deeplTargetLanguage: "de",
      googleMapsLanguage: "de",
    },
    {
      locale: "fr",
      displayLabel: "Français",
      deeplSourceLanguage: "fr",
      deeplTargetLanguage: "fr",
      googleMapsLanguage: "fr",
    },
  ];

  for (const locale of locales) {
    await payload.create({
      collection: "locales",
      data: locale,
    });
  }

  const localesInDb = (
    await payload.find({
      collection: "locales",
      pagination: false,
    })
  ).docs;

  await payload.updateGlobal({
    slug: "settings",
    data: {
      publishedLocales: {
        publishedLocales: localesInDb.map((l) => l.id),
        fallbackLocale: localesInDb.find((l) => l.locale === "en")!.id,
      },
    },
  });
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // Migration code
}
