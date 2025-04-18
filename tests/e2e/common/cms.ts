import { createId } from "@paralleldrive/cuid2";
import fs from "fs/promises";
import path from "path";
import { RichTextObject } from "@lapuertahostels/shared";
import { Brand, Media, Page } from "@lapuertahostels/payload-types";

export async function createPage(data: Partial<Page> = {}) {
  const testPagePathname = `/e2e/${createId()}`;

  data = {
    pathname: testPagePathname,
    brand: "puerta",
    ...data,
  };

  if (!data.title) {
    data.title = "Default Title";
  }

  return await create("pages", data);
}

export async function getPuertaBrand() {
  return (await get("brands/puerta")) as Brand;
}

export async function getMedia(filename: string) {
  const result = await get(
    `media?where[filename][equals]=${encodeURIComponent(filename)}&pagination=false&limit=1`,
  );
  if (!result.docs) return null;

  return result.docs[0] as Media;
}

export async function createPuertaBrand() {
  const media = await getOrCreateMedia("logo-puerta-simple.png", "image/png");

  await create("brands", {
    id: "puerta",
    name: "La Puerta Hostels",
    logo: media.id,
    footer: { linkGroups: [] },
  } as Omit<Brand, "updatedAt" | "createdAt">);
}

export async function create(collection: string, content: object) {
  const result = await fetchCms(collection, {
    method: "POST",
    body: JSON.stringify(content),
  });

  return result.doc;
}

export async function getOrCreateMedia(
  filename: string,
  mimeType: string,
  alt?: string,
) {
  const media = await getMedia(filename);
  if (media) return media;

  return await createMedia(filename, mimeType, alt);
}

async function createMedia(filename: string, mimeType: string, alt?: string) {
  const buffer = await fs.readFile(path.join("./assets", filename));
  const file = new File([buffer], filename, { type: mimeType });

  const formData = new FormData();
  formData.append("file", file);

  const additionalFields: Partial<Media> = {};
  additionalFields.alt = alt;

  formData.append("_payload", JSON.stringify(additionalFields));

  return (
    await fetchCms("media", {
      method: "POST",
      body: formData,
    })
  ).doc as Media;
}

export async function get(path: string) {
  return fetchCms(path);
}

async function fetchCms(path: string, init?: RequestInit) {
  const url = new URL(`/api/${path}`, process.env.CMS_BASE_URL);

  const method = init?.method ?? "GET";

  const headers = new Headers({
    ...init?.headers,
    Authorization: `api-keys API-Key ${process.env.CMS_API_KEY}`,
  });
  if (typeof init?.body === "string") {
    headers.set("Content-Type", "application/json");
  }

  const result = await fetch(url, { ...init, method, headers });

  if (!result.ok) {
    if (method === "GET" && result.status === 404) return null;

    console.error(
      `${method} ${path} returned: ${JSON.stringify(await result.json(), null, 2)}`,
    );

    if (method !== "GET") {
      console.debug(
        `request body:`,
        headers.get("Content-Type") === "application/json" && init?.body
          ? JSON.stringify(JSON.parse(init.body as string), null, 2)
          : init?.body,
      );
    }
    throw new Error(`Failed with status code: ${result.status}`);
  }

  return await result.json();
}
