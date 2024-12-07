import { Endpoint, TypedLocale } from "payload";
import { DEFAULT_LOCALE, generateAltText } from "@/common/openai";
import { Usage } from "@/fields/usages";
import { addLocalesToRequestFromData } from "@payloadcms/next/utilities";
import { getSupportedLocaleCodes } from "@/common/locales";
import { translate } from "@/common/translation";
import { transformRecord } from "@/common/records";
import { fullTextToTitle } from "../texts/utils";

export const generateAltTextEndpoint: Endpoint = {
  path: "/:id/update-alt-text",
  method: "post",
  handler: async (req) => {
    if (!req.user) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    if (typeof req.payload.config.localization !== "object") {
      throw new Error("Localization configuration is missing");
    }

    if (!req.routeParams) throw new Error("No route params");
    if (!req.json) throw new Error("No JSON body");

    addLocalesToRequestFromData(req);

    const { id } = req.routeParams;

    const media = await req.payload.findByID({
      collection: "media",
      id: id as string,
      depth: 1,
      populate: {
        texts: {
          usages: true,
        },
      },
      req,
    });

    if (!media.mimeType?.includes("image/")) {
      throw new Error("Only images are supported");
    }

    const publicImageUrl = new URL(
      media.filename!,
      process.env.IMAGEKIT_BASE_URL,
    ).href;

    if (
      media.alt &&
      typeof media.alt === "object" &&
      (media.alt.usages as Usage[]).length === 1
    ) {
      console.log(`Deleting alt text ${media.alt.id}`);
      await req.payload.delete({
        collection: "texts",
        id: media.alt.id,
        req,
      });
    }

    console.log(`Generating alt text for ${publicImageUrl}`);
    const altText = await generateAltText(publicImageUrl);

    console.log(`Translating alt text to other locales`);
    const localizedAltTexts: Record<string, string> = Object.fromEntries([
      [DEFAULT_LOCALE, altText],
      ...(await Promise.all(
        (await getSupportedLocaleCodes())
          .filter((l) => l !== DEFAULT_LOCALE)
          .map(async (l) => [
            l,
            (await translate(altText, DEFAULT_LOCALE, l, false)).text,
          ]),
      )),
    ]);

    console.log(`Creating alt text`);

    // need to go directly to the DB to set the text for all locales at once.
    const result = await req.payload.db.connection
      .collection("texts")
      .insertOne({
        type: "plainText",
        createdAt: new Date(),
        updatedAt: new Date(),
        text: localizedAltTexts,
        title: transformRecord(localizedAltTexts, fullTextToTitle),
      });

    console.log(`Updating media ${id} with alt text ${result.insertedId}`);
    await req.payload.update({
      collection: "media",
      id: id as string,
      data: {
        alt: result.insertedId.toString(),
      },
      req,
    });

    return new Response(null, { status: 204 });
  },
};
