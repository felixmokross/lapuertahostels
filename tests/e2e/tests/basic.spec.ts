import { test, expect } from "@playwright/test";
import { createPage } from "../common/cms";

test("has title and heading", async ({ page }) => {
  const testPage = await createPage({
    title: "E2E Test Page",
    hero: [
      {
        blockType: "HeroHeading",
        heading: "E2E Test Page",
      },
    ],
  });

  await page.goto(testPage.pathname);

  await expect(page).toHaveTitle(/E2E Test Page/);

  await expect(
    page.getByRole("heading", { level: 2, name: "E2E Test Page" }),
  ).toBeVisible();
});
