import { createId } from "@paralleldrive/cuid2";
import fs from "fs/promises";
import path from "path";

export async function createPage(data: object) {
  const testPagePathname = `/e2e/${createId()}`;

  return await create("pages", {
    pathname: testPagePathname,
    brand: "puerta",
    ...data,
  });
}

export async function createPlainText(text: string) {
  return await create("texts", { type: "plainText", text });
}

export async function getPuertaBrand() {
  return await get("brands/puerta");
}

export async function createPuertaBrand() {
  const media = await createFile("./logo-puerta-simple.png", "image/png");

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

export async function createFile(filePath: string, mimeType: string) {
  const buffer = await fs.readFile(filePath);
  const file = new File([buffer], path.basename(filePath), {
    type: mimeType,
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("mimeType", file.type);

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
