import { test, expect } from "@playwright/test";
import { createPage, createPlainText } from "../common/cms";

test("has title and heading", async ({ page }) => {
  const titleText = await createPlainText("E2E Test Page");

  const testPage = await createPage({
    title: titleText.id,
    hero: [
      {
        blockType: "HeroHeading",
        heading: titleText.id,
      },
    ],
  });

  await page.goto(testPage.pathname);

  await expect(page).toHaveTitle(/E2E Test Page/);

  await expect(
    page.getByRole("heading", { level: 2, name: "E2E Test Page" }),
  ).toBeVisible();
});
