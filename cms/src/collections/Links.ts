import { CollectionConfig } from "payload/types";
import { refreshCacheForAllPages } from "../common/frontend-cache";
import { linkField } from "../fields/link";
import { Texts } from "./Texts";

export const Links: CollectionConfig = {
  slug: "links",
  labels: {
    singular: {
      en: "Link",
      es: "Enlace",
    },
    plural: {
      en: "Links",
      es: "Enlaces",
    },
  },
  defaultSort: "type",
  admin: {
    useAsTitle: "labelAsTitle",
    defaultColumns: ["label", "type", "page", "queryString", "fragment", "url"],
    listSearchableFields: [],
  },
  hooks: {
    afterChange: [({ req }) => refreshCacheForAllPages(req, "purge-and-prime")],
  },
  fields: [
    {
      name: "labelAsTitle",
      type: "text",
      hidden: true,
      hooks: {
        beforeChange: [({ data }) => delete data["labelAsTitle"]],
        afterRead: [
          async ({ req, data }) => {
            const labelText = await req.payload.findByID({
              collection: "texts",
              id: data.label,
              locale: req.locale,
            });

            return labelText.text;
          },
        ],
      },
    },
    {
      name: "label",
      label: {
        en: "Label",
        es: "Etiqueta",
      },
      type: "relationship",
      relationTo: Texts.slug,
      required: true,
    },
    ...linkField.fields.slice(1),
  ],
};
