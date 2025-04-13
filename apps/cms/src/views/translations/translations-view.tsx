import { getSupportedLocales } from "@/common/locales";
import { CollectionSlug, DocumentViewServerProps, GlobalSlug } from "payload";
import { getLocalizedTextFields } from "./common";
import { TranslationsViewClient } from "./translations-view.client";

export async function TranslationsView({
  payload,
  doc,
  locale,
  initPageResult,
}: DocumentViewServerProps) {
  const collection = initPageResult.collectionConfig?.slug as
    | CollectionSlug
    | undefined;
  const global = initPageResult.globalConfig?.slug as GlobalSlug | undefined;

  const [locales, docWithTranslations] = await Promise.all([
    getSupportedLocales(),
    collection
      ? payload.findByID({ id: doc.id, collection, locale: "all" })
      : payload.findGlobal({ slug: global!, locale: "all" }),
  ]);

  const localizedTextFieldPaths = getLocalizedTextFields(
    doc,
    collection
      ? payload.collections[collection].config.fields
      : payload.globals.config.find((c) => c.slug === global!)!.fields,
  );

  return (
    <TranslationsViewClient
      collection={collection}
      global={global}
      documentId={doc.id}
      fieldPaths={localizedTextFieldPaths}
      locales={locales.map((l) => ({ code: l.code, label: l.label }))}
      docWithTranslations={docWithTranslations}
      locale={locale ? { code: locale.code, label: locale.label } : undefined}
    />
  );
}
