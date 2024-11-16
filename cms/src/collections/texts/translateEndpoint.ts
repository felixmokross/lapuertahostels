import { Endpoint } from "payload/config";
import {
  htmlToSlate,
  slateToHtml,
  payloadSlateToHtmlConfig,
  payloadHtmlToSlateConfig,
} from "@slate-serializers/html";
import { transformRecord } from "../../common/records";
import { translate } from "../../common/translation";
import { getSupportedLocales } from "../../common/locales";
import { fullTextToTitle, richTextToFullText } from "./utils";

export const translateEndpoint: Endpoint = {
  path: "/:id/translate",
  method: "post",
  handler: async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");

    const { ObjectId } = await import("bson");
    const { id } = req.params;
    const originalDoc = await req.payload.db.connection
      .collection("texts")
      .findOne({ _id: new ObjectId(id) });

    const textInAllLocales = (
      originalDoc.type === "plainText"
        ? originalDoc.text
        : transformRecord(originalDoc.richText, (x: any) =>
            slateToHtml(x, payloadSlateToHtmlConfig),
          )
    ) as Record<string, string>;
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
        await translate(
          originalText,
          req.locale,
          translationLocale,
          originalDoc.type === "richText",
        )
      ).text;
    }

    await req.payload.db.connection.collection("texts").updateOne(
      { _id: new ObjectId(id) },
      {
        $set:
          originalDoc.type === "plainText"
            ? {
                text: textInAllLocales,
                title: transformRecord(textInAllLocales, fullTextToTitle),
              }
            : {
                richText: transformRecord(textInAllLocales, htmlToSlate),
                title: transformRecord(
                  transformRecord(textInAllLocales, (x) =>
                    htmlToSlate(x, payloadHtmlToSlateConfig),
                  ),
                  (t) => fullTextToTitle(richTextToFullText(t)),
                ),
              },
      },
    );

    console.log("Text translated successfully");

    return res.status(204).send();
  },
};
