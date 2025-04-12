import { getSupportedLocales } from "@/common/locales";
import { DocumentViewServerProps } from "payload";
import { getLocalizedTextFields } from "./common";
import { TranslationsViewClient } from "./translations-view.client";

export async function TranslationsView({
  payload,
  doc,
  locale,
}: DocumentViewServerProps) {
  const [locales, docWithTranslations] = await Promise.all([
    getSupportedLocales(),
    payload.findByID({
      id: doc.id,
      collection: "banners",
      locale: "all",
    }),
  ]);

  const localizedTextFieldPaths = getLocalizedTextFields(
    payload.collections.banners.config.fields,
  );

  return (
    <TranslationsViewClient
      documentId={doc.id}
      fieldPaths={localizedTextFieldPaths}
      locales={locales.map((l) => ({ ...l }))}
      docWithTranslations={docWithTranslations}
      locale={locale}
    />
  );
}
