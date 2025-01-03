import test, { expect } from "@playwright/test";
import {
  getOrCreate,
  createPage,
  createPlainText,
  createRichText,
} from "../common/cms";
import { paragraph, richTextRoot, text } from "../common/rich-text.builders";

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

test("hero slides block", async ({ page }) => {
  const headingText = await createPlainText("Hero Slides Test");
  const slide1Text = await createRichText(
    richTextRoot(paragraph(text("Slide 1 Text"))),
  );

  const media1 = await getOrCreate(
    "mesmerizing-scenery-seascape-with-lush-nature-daytime.jpg",
    "image/jpeg",
    "A serene beach",
  );

  const slide2Text = await createRichText(
    richTextRoot(paragraph(text("Slide 2 Text"))),
  );

  const media2 = await getOrCreate(
    "david-hertle-3YCkAhD--Ic-unsplash.jpg",
    "image/jpeg",
    "A sunny courtyard sourrounded by lush greenery",
  );

  const media3 = await getOrCreate(
    "datingjungle-Vv4JB0SMfZ4-unsplash.jpg",
    "image/jpeg",
    "A lush green mountainious landscape",
  );

  const testPage = await createPage({
    hero: [
      {
        blockType: "HeroSlides",
        seoPageHeading: headingText.id,
        slides: [
          {
            image: media1.id,
            overlayTitle: {
              show: true,
              text: slide1Text.id,
              position: "bottom-right",
            },
          },
          {
            image: media2.id,
            overlayTitle: {
              show: true,
              text: slide2Text.id,
              position: "top-left",
            },
          },
          {
            image: media3.id,
          },
        ],
      },
    ],
  });

  await page.goto(testPage.pathname);

  await expect(
    page.getByRole("heading", { level: 2, name: "Hero Slides Test" }),
  ).toHaveClass("sr-only");

  await expect(
    page.getByRole("heading", { level: 3, name: "Slide 1 Text" }),
  ).toBeVisible();

  await expect(
    page
      .getByRole("img", { name: "A serene beach" })
      .and(page.getByTestId("full-image")),
  ).toHaveAttribute(
    "srcset",
    /mesmerizing-scenery-seascape-with-lush-nature-daytime\.jpg/,
  );

  await page.getByRole("button", { name: "Go to slide 2" }).click();

  await expect(
    page.getByRole("heading", { level: 3, name: "Slide 2 Text" }),
  ).toBeVisible();

  // Need to find out how we can wait for lazily loaded images in Playwright
  // await expect(
  //   page
  //     .getByRole("img", {
  //       // name: "A sunny courtyard sourrounded by lush greenery",
  //     })
  //     .and(page.getByTestId("full-image")),
  // ).toBeVisible();
});
