import { createId } from "@paralleldrive/cuid2";
import fs from "fs/promises";
import path from "path";
import {
  Brand,
  Locale,
  Media,
  Page,
  Settings,
} from "@lapuertahostels/payload-types";

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

export async function mockUiLabelTranslations() {
  await updateGlobal("common", {
    uiLabels: {
      maintenanceScreen: {
        login: "Login",
      },
      banner: {
        dismiss: "Dismiss",
      },
      login: {
        email: "Email",
        password: "Password",
        submit: "Log In",
      },
      imageViewer: {
        next: "Next",
        seeMoreImages_one: "+{{count}} Photo",
        fullscreen: "Full Screen",
        close: "Close",
        seeMoreImages_other: "+{{count}} Photos",
        previous: "Previous",
        exitFullscreen: "Exit Full Screen",
      },
      slidesBlock: {
        goToSlide: "Go to slide {{slide}}",
      },
      errorBoundary: {
        text: "<p>Oops! Something went wrong.</p><p>This page isn’t working right now. Please try refreshing or come back a bit later.</p><p>Thank you for your understanding!</p>",
        title: "500 – Something went wrong",
      },
      footer: {
        heading: "Footer",
        newsletter: {
          emailLabel: "Email",
        },
      },
    },
  });
}

export async function initializeLocale() {
  let englishLocale = (
    await get("locales?where[locale][equals]=en&pagination=false&limit=1")
  ).docs[0] as Locale | undefined;
  if (!englishLocale) {
    englishLocale = await create("locales", {
      locale: "en",
      displayLabel: "English",
      deeplSourceLanguage: "en",
      deeplTargetLanguage: "en-US",
      googleMapsLanguage: "en",
    } as Locale);
  }
  let spanishLocale = (
    await get("locales?where[locale][equals]=es&pagination=false&limit=1")
  ).docs[0] as Locale | undefined;
  if (!spanishLocale) {
    spanishLocale = await create("locales", {
      locale: "es",
      displayLabel: "Español",
      deeplSourceLanguage: "es",
      deeplTargetLanguage: "es-419",
      googleMapsLanguage: "es-419",
    } as Locale);
  }

  await updateGlobal("settings", {
    publishedLocales: {
      publishedLocales: [englishLocale!.id, spanishLocale!.id],
      fallbackLocale: englishLocale!.id,
    },
    maps: {
      mapId: "mock-map-id",
    },
  } as Settings);
}

export async function create(collection: string, content: object) {
  const result = await fetchCms(collection, {
    method: "POST",
    body: JSON.stringify(content),
  });

  return result.doc;
}

export async function updateGlobal(globalType: string, content: object) {
  const result = await fetchCms(`globals/${globalType}`, {
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
