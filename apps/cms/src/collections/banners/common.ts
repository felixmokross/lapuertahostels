import { Field } from "payload";

export function getLocalizedTextFields(
  fields: Field[],
  basePath?: string,
): string[] {
  return fields.flatMap((f) => {
    if (f.type === "group") {
      return getLocalizedTextFields(
        f.fields,
        basePath ? `${basePath}.${f.name}` : f.name,
      );
    }
    if (f.type === "tabs") {
      return f.tabs.flatMap((tab) =>
        getLocalizedTextFields(
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
    return [];
  });
}
