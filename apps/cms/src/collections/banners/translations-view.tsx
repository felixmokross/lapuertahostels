import { getSupportedLocales } from "@/common/locales";
import { CollectionSlug, DocumentViewServerProps } from "payload";
import { getLocalizedTextFields } from "./common";
import { TranslationsViewClient } from "./translations-view.client";

export async function TranslationsView({
  payload,
  doc,
  locale,
  collection,
}: DocumentViewServerProps & {
  collection: CollectionSlug;
}) {
  const [locales, docWithTranslations] = await Promise.all([
    getSupportedLocales(),
    payload.findByID({
      id: doc.id,
      collection,
      locale: "all",
    }),
  ]);

  const localizedTextFieldPaths = getLocalizedTextFields(
    doc,
    payload.collections[collection].config.fields,
  );

  return (
    <TranslationsViewClient
      collection={collection}
      documentId={doc.id}
      fieldPaths={localizedTextFieldPaths}
      locales={locales.map((l) => ({ code: l.code, label: l.label }))}
      docWithTranslations={docWithTranslations}
      locale={locale ? { code: locale.code, label: locale.label } : undefined}
    />
  );
}
