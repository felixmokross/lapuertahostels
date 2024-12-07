"use server";

import OpenAI from "openai";
import { Locale, TypedLocale } from "payload";
import { translate } from "./translation";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAltText(imageUrl: string, locale: TypedLocale) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Generate alt text for this image. Only respond with the alt text itself.`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_completion_tokens: 300,
    });

    // Extract and print the alt text
    const altText = response.choices[0].message.content?.trim();
    if (!altText) {
      throw new Error("No alt text was returned");
    }

    console.log("Generated Alt Text en:", altText);

    const localizedAltText =
      locale === "en"
        ? altText
        : (await translate(altText, "en", locale, false)).text;
    return localizedAltText;
  } catch (error) {
    console.error("Error generating alt text:", error);
  }
}
