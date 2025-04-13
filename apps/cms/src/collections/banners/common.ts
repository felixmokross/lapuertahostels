import { Data, Field } from "payload";

export function getLocalizedTextFields(
  doc: Data,
  fields: Field[],
  basePath?: string,
): string[] {
  return fields.flatMap((f) => {
    if (f.type === "group") {
      return getLocalizedTextFields(
        doc[f.name],
        f.fields,
        basePath ? `${basePath}.${f.name}` : f.name,
      );
    }
    if (f.type === "tabs") {
      return f.tabs.flatMap((tab) =>
        getLocalizedTextFields(
          "name" in tab ? doc[tab.name] : doc,
          tab.fields,
          "name" in tab
            ? basePath
              ? `${basePath}.${tab.name}`
              : tab.name
            : basePath,
        ),
      );
    }
    if ((f.type === "text" || f.type === "textarea") && f.localized) {
      return [basePath ? `${basePath}.${f.name}` : f.name];
    }

    if (f.type === "blocks") {
      return (doc[f.name] as (Data & { blockType: string })[]).flatMap(
        (item, index) =>
          getLocalizedTextFields(
            item,
            f.blocks.find((f) => f.slug === item.blockType)!.fields,
            basePath ? `${basePath}.${f.name}.${index}` : `${f.name}.${index}`,
          ),
      );
    }

    if (f.type === "array") {
      return (doc[f.name] as Data[]).flatMap((item, index) =>
        getLocalizedTextFields(
          item,
          f.fields,
          basePath ? `${basePath}.${f.name}.${index}` : `${f.name}.${index}`,
        ),
      );
    }
    return [];
  });
}
