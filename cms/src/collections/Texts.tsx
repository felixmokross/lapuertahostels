import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { Node } from "slate";
import { slateEditor } from "@payloadcms/richtext-slate";
import { translate } from "../common/translation";
import { getSupportedLocales } from "../common/locales";
import React, { useState } from "react";
import { Button } from "payload/components/elements";
import { useDocumentInfo } from "payload/components/utilities";
import { useTranslation } from "react-i18next";
import { useFormModified } from "payload/components/forms";
import { Slide, toast, ToastContainer } from "react-toastify";

export const Texts: CollectionConfig = {
  slug: "texts",
  labels: {
    singular: {
      en: "Text",
      es: "Texto",
    },
    plural: {
      en: "Texts",
      es: "Textos",
    },
  },
  defaultSort: "title",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "comment"],
    listSearchableFields: ["title"],
  },
  hooks: {
    afterChange: [({ req }) => cachePurgeHook({ type: "all-pages" }, req)],
  },
  endpoints: [
    {
      path: "/:id/translate",
      method: "post",
      handler: async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized");

        const { ObjectId } = await import("bson");
        const { id } = req.params;
        const originalDoc = await req.payload.db.connection
          .collection("texts")
          .findOne({ _id: new ObjectId(id) });

        if (originalDoc.type !== "plainText") return;

        const textInAllLocales = originalDoc.text as Record<string, string>;
        const originalText = textInAllLocales[req.locale];

        if (!originalText) {
          console.log("Text not available in current locale");
          return res.status(204).send();
        }

        const translationLocales = (await getSupportedLocales()).filter(
          (l) => l !== req.locale,
        );

        console.log(`Translation locales: ${translationLocales}`);
        for (const translationLocale of translationLocales) {
          textInAllLocales[translationLocale] = (
            await translate(originalText, req.locale, translationLocale)
          ).text;
        }

        console.log(
          `Text in all locales: ${JSON.stringify(textInAllLocales, null, 2)}`,
        );
        const result = await req.payload.db.connection
          .collection("texts")
          .updateOne(
            { _id: new ObjectId(id) },
            {
              $set: {
                text: textInAllLocales,
                title: Object.fromEntries(
                  Object.entries(textInAllLocales).map(
                    ([locale, text]: [string, string]) => [
                      locale,
                      fullTextToTitle(text),
                    ],
                  ),
                ),
              },
            },
          );
        console.log(result.modifiedCount);

        return res.status(204).send();
      },
    },
  ],
  fields: [
    {
      name: "type",
      type: "radio",
      label: {
        en: "Type",
        es: "Tipo",
      },
      options: [
        {
          label: { en: "Plain Text", es: "Texto simple" },
          value: "plainText",
        },
        {
          label: { en: "Rich Text", es: "Texto enriquecido" },
          value: "richText",
        },
      ],
      defaultValue: "plainText",
      access: {
        update: () => false,
      },
      required: true,
      admin: {
        description: {
          en: "This cannot be changed after creation.",
          es: "Esto no se puede cambiar después de la creación.",
        },
        layout: "horizontal",
      },
    },
    {
      name: "text",
      type: "textarea",
      label: {
        en: "Text",
        es: "Texto",
      },
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === "plainText",
      },
    },
    {
      name: "richText",
      type: "richText",
      label: {
        en: "Rich Text",
        es: "Texto enriquecido",
      },
      localized: true,
      editor: slateEditor({
        admin: {
          elements: ["h4", "h5", "link", "ul", "ol", "indent"],
          leaves: ["bold", "italic", "underline", "strikethrough", "code"],
        },
      }),
      admin: {
        condition: (_, siblingData) => siblingData.type === "richText",
      },
    },
    {
      name: "comment",
      type: "text",
      label: {
        en: "Comment",
        es: "Comentario",
      },
      admin: {
        position: "sidebar",
        description: {
          en: "Add a comment to help other editors understand the purpose of this text. Keep in mind that texts might need different translations depending on the context.",
          es: "Añade un comentario para ayudar a otros editores a entender el propósito de este texto. Ten en cuenta que los textos pueden necesitar diferentes traducciones dependiendo del contexto.",
        },
      },
    },
    {
      name: "title",
      label: {
        en: "Title (internal)",
        es: "Título (interno)",
      },
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
      localized: true,
      hooks: {
        beforeChange: [
          ({ data }) => {
            return fullTextToTitle(getFullText());

            function getFullText() {
              switch (data.type) {
                case "plainText":
                  return data.text ?? "";
                case "richText":
                  return (data.richText ?? [])
                    .map((n) => Node.string(n))
                    .join(" ");
              }
            }
          },
        ],
      },
      admin: {
        description: {
          en: "This field is generated automatically and is only used internally in the CMS to identity the text.",
          es: "Este campo se genera automáticamente y solo se usa internamente en el CMS para identificar el texto.",
        },
        position: "sidebar",
      },
    },
    {
      type: "ui",
      name: "translations",
      admin: {
        condition: (_, siblingData) => siblingData.type === "plainText",
        components: {
          Field: () => {
            const [isTranslating, setIsTranslating] = useState(false);
            const { id } = useDocumentInfo();
            const { t } = useTranslation();
            const isModified = useFormModified();
            return (
              <>
                <Button
                  disabled={isTranslating || isModified}
                  onClick={async () => {
                    setIsTranslating(true);

                    try {
                      await fetch(`/api/texts/${id}/translate`, {
                        method: "POST",
                        credentials: "include",
                      });

                      toast.success(
                        t("custom:texts.translatedToAllLocalesSuccessfully"),
                        { autoClose: 3000 },
                      );
                    } finally {
                      setIsTranslating(false);
                    }
                  }}
                >
                  {isTranslating
                    ? t("custom:texts.translatingToAllLocales")
                    : t("custom:texts.translateToAllLocales")}
                </Button>
                {/* For some reason, the Root toast container doesn't work – just working around as we soon upgrade to Payload 3 anyway */}
                <ToastContainer
                  icon={false}
                  position="bottom-center"
                  transition={Slide}
                />
                {isModified && (
                  <p className="field-description">
                    {t("custom:texts.pleaseSaveYourChangesToEnableTranslation")}
                  </p>
                )}
              </>
            );
          },
        },
      },
    },
  ],
};

function fullTextToTitle(fullText: string) {
  return fullText.length > 80 ? `${fullText.slice(0, 79).trim()}…` : fullText;
}
