import { createId } from "@paralleldrive/cuid2";
import fs from "fs/promises";
import path from "path";

export async function createPage(data: Record<string, any> = {}) {
  const testPagePathname = `/e2e/${createId()}`;

  data = {
    pathname: testPagePathname,
    brand: "puerta",
    ...data,
  };

  if (!data.title) {
    const titleText = await createPlainText("Default Title");
    data.title = titleText.id;
  }

  return await create("pages", data);
}

export async function createPlainText(text: string) {
  return await create("texts", { type: "plainText", text });
}

export async function getPuertaBrand() {
  return await get("brands/puerta");
}

export async function getMedia(filename: string) {
  const result = await get(
    `media?where[filename][equals]=${encodeURIComponent(filename)}&pagination=false&limit=1`,
  );
  if (!result.docs) return null;

  return result.docs[0];
}

export async function createPuertaBrand() {
  const media = await getOrCreate("logo-puerta-simple.png", "image/png");

  await create("brands", {
    id: "puerta",
    name: "La Puerta Hostels",
    logo: media.id,
    footer: { linkGroups: [] },
  });
}

export async function create(collection: string, content: object) {
  return (
    await fetchCms(collection, {
      method: "POST",
      body: JSON.stringify(content),
    })
  ).doc;
}

export async function getOrCreate(
  filename: string,
  mimeType: string,
  alt?: string,
) {
  const media = await getMedia(filename);
  if (media) return media;

  return await createMedia(filename, mimeType);
}

async function createMedia(filename: string, mimeType: string, alt?: string) {
  const buffer = await fs.readFile(path.join("./assets", filename));
  const file = new File([buffer], filename, {
    type: mimeType,
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("mimeType", file.type);

  if (alt) {
    const altText = await createPlainText(alt);
    formData.append("alt", altText.id);
  }

  return (
    await fetchCms("media", {
      method: "POST",
      body: formData,
    })
  ).doc;
}

export async function get(path: string) {
  return fetchCms(path);
}

async function fetchCms(path: string, init?: RequestInit) {
  const url = new URL(`/api/${path}`, process.env.CMS_BASE_URL);

  const result = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    if (result.status === 404) return null;

    console.error(`Request to ${path} returned: ${await result.text()}`);
    throw new Error(`Failed with status code: ${result.status}`);
  }

  return await result.json();
}
