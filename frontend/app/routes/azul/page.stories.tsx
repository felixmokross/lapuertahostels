import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./page";
import { BrandContext } from "~/brands";

const meta = {
  title: "routes/azul/Page",
  component: Page,
  argTypes: {},
  decorators: [
    // override the brand context, this is a Azul-only component
    (Story) => (
      <BrandContext.Provider value="azul">
        <Story />
      </BrandContext.Provider>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: {
      slides: [
        {
          imageUrl: "/azul/piscina/10.jpg?updatedAt=1714162021839",
          imageAlt: "Atrium of La Puerta Azul",
          ctaUrl: "/booking",
          name: "Atrium",
          title: [
            {
              children: [
                { type: "text", text: "Welcome to Your " },
                { type: "text", text: "Vacation Home", bold: true },
              ],
            },
          ],
          titlePosition: "center",
          imageOverlay: "intense",
          imagePosition: "bottom",
        },
        {
          imageUrl: "/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
          imageAlt: "Room view of La Puerta Azul",
          ctaUrl: "/booking",
          name: "Atrium",
          title: [
            { children: [{ type: "text", text: "Cool Down" }] },
            { children: [{ type: "text", text: "by the Pool", bold: true }] },
          ],
          titlePosition: "bottom-left",
          imageOverlay: "subtle",
        },
      ],
      slideCta: "Book Now",
      features: [
        {
          imageUrl:
            "/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
          imageAlt: "Example image",
          title: "Feel Newborn",
          text: [
            {
              children: [
                {
                  type: "text",
                  text: "A day full of exploring the city can be tiring. Our ",
                },
                { type: "text", text: "air-conditioned", bold: true },
                { type: "text", text: " rooms with " },
                { type: "text", text: "tasteful", bold: true },
                {
                  type: "text",
                  text: " details give you the perfect place to relax and unwind.",
                },
              ],
            },
          ],
        },
        {
          imageUrl: "/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
          imageAlt: "Example image",
          title: "Cool Down by the Pool",
          text: [
            {
              children: [
                {
                  type: "text",
                  text: "Our ",
                },
                { type: "text", text: "courtyard pool", bold: true },
                {
                  type: "text",
                  text: " is the perfect place to cool down after a hot day under the Carribean sun.",
                },
              ],
            },
          ],
        },
        {
          imageUrl:
            "/azul/delux%20twin%20with%20terrace/_DSC0325.jpg?updatedAt=1714162301928",
          imageAlt: "Example image",
          title: "Bring Your Family",
          text: [
            {
              children: [
                {
                  type: "text",
                  text: "Traveling with your loved ones? We offer ",
                },
                { type: "text", text: "Twin Rooms", bold: true },
                {
                  type: "text",
                  text: " allowing an occupancy of up to four people. Perfect for your family get-away.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
