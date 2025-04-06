import test, { expect } from "@playwright/test";
import { createPage } from "../common/cms";

test("redirects to fallback locale", async ({ page }) => {
  const testPage = await createPage();

  await page.goto(testPage.pathname);

  expect(page.url().endsWith(`/en${testPage.pathname}`)).toBeTruthy();
});

test("redirects to request locale", async ({ page }) => {
  const testPage = await createPage();

  await page.goto(testPage.pathname + "?lng=es");

  expect(page.url().endsWith(`/es${testPage.pathname}?lng=es`)).toBeTruthy();
});

test("redirects to path without trailing slash", async ({ page }) => {
  const testPage = await createPage();

  await page.goto(testPage.pathname + "/");

  expect(page.url().endsWith(testPage.pathname)).toBeTruthy();
});
