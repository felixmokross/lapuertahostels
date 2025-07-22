import OpenAI from "openai";
import { TypedLocale } from "payload";

export const DEFAULT_LOCALE: TypedLocale = "en";

export async function generateAltText(imageUrl: string, locale: TypedLocale) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Generate alt text for this image in the locale '${locale}'. Only respond with the alt text itself.`,
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

  // Extract the alt text from the response
  const altText = response.choices[0].message.content?.trim();
  if (!altText) {
    throw new Error("No alt text was returned");
  }

  return altText;
}
