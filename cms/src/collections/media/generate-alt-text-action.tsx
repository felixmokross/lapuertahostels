"use server";

import { getPayload, TypedLocale } from "payload";
import configPromise from "@/payload.config";
import { generateAltText } from "@/common/openai";

export async function updateAltText(mediaId: string, locale: TypedLocale) {
  const config = await configPromise;
  if (typeof config.localization !== "object") {
    throw new Error("Localization configuration is missing");
  }

  const payload = await getPayload({ config });
  const media = await payload.findByID({
    collection: "media",
    id: mediaId,
  });

  if (!media.mimeType?.includes("image/")) {
    throw new Error("Only images are supported");
  }

  const publicImageUrl = new URL(media.filename!, process.env.IMAGEKIT_BASE_URL)
    .href;

  await payload.update({
    collection: "media",
    id: mediaId,
    locale: locale,
    data: {
      alt: await generateAltText(publicImageUrl, locale),
    },
  });
}
