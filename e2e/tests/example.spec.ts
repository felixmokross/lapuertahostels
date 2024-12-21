import { test, expect } from "@playwright/test";
import { createId } from "@paralleldrive/cuid2";

test("has title", async ({ page }) => {
  const puertaBrand = await cmsGet("brands/puerta");
  if (!puertaBrand) {
    console.log("Puerta brand not found, creating it");
    const media = await cmsCreate("media", {
      filename: "logo-puerta-simple.png",
      mimeType: "image/png",
    });
    const homeLink = await cmsCreate("links", {
      type: "external",
      url: "/",
    });
    await cmsCreate("brands", {
      id: "puerta",
      name: "La Puerta Hostels",
      logo: media.id,
      footer: { linkGroups: [] },
      homeLink: homeLink.id,
    });
  }

  const titleText = await cmsCreate("texts", {
    type: "plainText",
    text: "E2E Test Page",
  });

  const testPagePathname = `/e2e/${createId()}`;
  await cmsCreate("new-pages", {
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
  const result = await fetch(
    new URL(`/api/${collection}`, process.env.CMS_BASE_URL),
    {
      method: "POST",
      headers: {
        Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    },
  );
  if (!result.ok) {
    throw new Error(`Failed to create test page: ${result.status}`);
  }

  return (await result.json()).doc;
}

async function cmsGet(collection: string) {
  const url = new URL(
    `/api/${collection}?pagination=false`,
    process.env.CMS_BASE_URL,
  );
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
    throw new Error(`Failed to create test page: ${result.status}`);
  }

  return (await result.json()).docs;
}
