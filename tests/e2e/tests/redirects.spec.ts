import test, { expect } from "@playwright/test";
import { createPage } from "../common/cms";

test("redirects to fallback locale", async ({ page, baseURL }) => {
  const testPage = await createPage();

  await page.goto(testPage.pathname);

  await expect(page).toHaveURL(`${baseURL}/en${testPage.pathname}`);
});

test("redirects to request locale", async ({ page, baseURL }) => {
  const testPage = await createPage();

  await page.goto(testPage.pathname + "?lng=es");

  await expect(page).toHaveURL(`${baseURL}/es${testPage.pathname}?lng=es`);
});

test("redirects to path without trailing slash", async ({ page, baseURL }) => {
  const testPage = await createPage();

  await page.goto(testPage.pathname + "/");

  await expect(page).toHaveURL(`${baseURL}/en${testPage.pathname}`);
});
