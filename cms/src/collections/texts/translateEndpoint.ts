import { Endpoint } from "payload";
import { SerializedEditorState } from "lexical";
import { transformRecord, transformRecordAsync } from "../../common/records";
import { translate } from "../../common/translation";
import { getSupportedLocales } from "../../common/locales";
import {
  fullTextToTitle,
  htmlToRichText,
  richTextToFullText,
  richTextToHtml,
} from "./utils";
import { addLocalesToRequestFromData } from "@payloadcms/next/utilities";

export const translateEndpoint: Endpoint = {
  path: "/:id/translate",
  method: "post",
  handler: async (req) => {
    if (!req.user) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    if (!req.routeParams) throw new Error("No route params");

    const { ObjectId } = await import("bson");
    const { id } = req.routeParams;
    if (typeof id !== "string") throw new Error("Invalid ID");

    const originalDoc = await req.payload.db.connection
      .collection("texts")
      .findOne({ _id: new ObjectId(id) });
    if (!originalDoc) throw new Error("Document not found");

    const textInAllLocales =
      originalDoc.type === "plainText"
        ? (originalDoc.text as Record<string, string>)
        : await transformRecordAsync(
            originalDoc.richText,
            (rt: SerializedEditorState | null) =>
              rt ? richTextToHtml(rt) : Promise.resolve(""),
          );

    addLocalesToRequestFromData(req);

    if (!req.locale) {
      return new Response("Locale required", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const originalText = textInAllLocales[req.locale];

    if (!originalText) {
      console.log("Text not available in current locale");
      return new Response(null, { status: 204 });
    }

    const translationLocales = (await getSupportedLocales()).filter(
      (l) => l !== req.locale,
    );

    console.log(`Translation locales: ${translationLocales}`);

    const promises = await Promise.allSettled(
      translationLocales.map(async (tl) => {
        try {
          textInAllLocales[tl] = (
            await translate(
              originalText,
              req.locale!,
              tl,
              originalDoc.type === "richText",
            )
          ).text;
        } catch (e) {
          console.error(`Failed to translate to ${tl}: ${e}`);
          throw e;
        }
      }),
    );

    if (promises.some((p) => p.status === "rejected")) {
      throw new Error("Some texts failed to translate");
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
                richText: await transformRecordAsync(
                  textInAllLocales,
                  htmlToRichText,
                ),
                title: await transformRecordAsync(
                  await transformRecordAsync(textInAllLocales, htmlToRichText),
                  async (x) => fullTextToTitle(await richTextToFullText(x)),
                ),
              },
      },
    );

    console.log("Text translated successfully");

    return new Response(null, { status: 204 });
  },
};
