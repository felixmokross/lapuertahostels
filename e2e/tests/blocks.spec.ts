import test, { expect } from "@playwright/test";
import { getOrCreate, createPage, createPlainText } from "../cms";

test("hero heading block", async ({ page }) => {
  const headingText = await createPlainText("Hero Heading Test");

  const media = await getOrCreate(
    "mesmerizing-scenery-seascape-with-lush-nature-daytime.jpg",
    "image/jpeg",
    "A serene beach",
  );

  const testPage = await createPage({
    hero: [
      {
        blockType: "HeroHeading",
        heading: headingText.id,
        image: media.id,
      },
    ],
  });

  await page.goto(testPage.pathname);

  await expect(
    page.getByRole("heading", { level: 2, name: "Hero Heading Test" }),
  ).toBeVisible();

  await expect(
    page
      .getByRole("img", { name: "A serene beach" })
      .and(page.getByTestId("full-image")),
  ).toHaveAttribute(
    "srcset",
    /mesmerizing-scenery-seascape-with-lush-nature-daytime\.jpg/,
  );
});
