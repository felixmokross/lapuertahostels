import { test, expect } from "@playwright/test";
import { createId } from "@paralleldrive/cuid2";
import fs from "fs/promises";

test("has title", async ({ page }) => {
  const puertaBrand = await cmsGetItem("brands/puerta");
  if (!puertaBrand) {
    console.log("Puerta brand not found, creating it");
    const logo = await fs.readFile("./logo-puerta-simple.png");
    const media = await cmsFileCreate(
      new File([logo], "logo-puerta-simple.png", { type: "image/png" }),
    );
    await cmsCreate("brands", {
      id: "puerta",
      name: "La Puerta Hostels",
      logo: media.id,
      footer: { linkGroups: [] },
    });
  }

  const titleText = await cmsCreate("texts", {
    type: "plainText",
    text: "E2E Test Page",
  });

  const testPagePathname = `/e2e/${createId()}`;
  await cmsCreate("pages", {
    pathname: testPagePathname,
    brand: "puerta",
    title: titleText.id,
    hero: [
      {
        blockType: "HeroHeading",
        heading: titleText.id,
      },
    ],
  });

  await page.goto(testPagePathname);

  await expect(page).toHaveTitle(/E2E Test Page/);

  await expect(
    page.getByRole("heading", { level: 2, name: "E2E Test Page" }),
  ).toBeVisible();
});

async function cmsCreate(collection: string, content: object) {
  const url = new URL(`/api/${collection}`, process.env.CMS_BASE_URL);
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  if (!result.ok) {
    console.error(`Request to ${url} returned: ${await result.text()}`);
    throw new Error(`Failed with status code: ${result.status}`);
  }

  return (await result.json()).doc;
}

async function cmsFileCreate(file: File) {
  const url = new URL(`/api/media`, process.env.CMS_BASE_URL);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("mimeType", file.type);

  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
    },
    body: formData,
  });
  if (!result.ok) {
    console.error(`Request to ${url} returned: ${await result.text()}`);
    throw new Error(`Failed with status code: ${result.status}`);
  }

  return (await result.json()).doc;
}

async function cmsGetItem(path: string) {
  const url = new URL(`/api/${path}`, process.env.CMS_BASE_URL);
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      if (result.status === 404) return null;

      console.error(`Request to ${url} returned: ${await result.text()}`);
      throw new Error(`Failed with status code: ${result.status}`);
    }

    const response = await result.json();
    return response;
  } catch (e) {
    console.error(`Error fetching GET ${url}`, e);
    throw e;
  }
}
