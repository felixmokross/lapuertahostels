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
          imageUrl:
            "/datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843",
          imageAlt: "Lost City",
          ctaUrl: "/lost-city",
          name: "Lost City",
          title: [
            { children: [{ type: "text", text: "Find the" }] },
            { children: [{ type: "text", text: "Lost City", bold: true }] },
          ],
          imageOverlay: "subtle",
        },
      ],
      slideCta: "Book Now",
      features: [],
    },
  },
};
