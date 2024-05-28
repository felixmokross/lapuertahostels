import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./page";
import { ThemeProvider } from "~/brands";
import { Brand } from "~/payload-types";

const meta = {
  title: "routes/aqua/Page",
  component: Page,
  argTypes: {},
  decorators: [
    // override the brand context, this is a Azul-only component
    (Story) => (
      <ThemeProvider brand={{ id: "aqua" } as Brand}>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: {
      hero: [
        {
          blockType: "Slides",
          id: "hero",
          slides: [
            {
              id: "slide-1",
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/aqua/spaces/Frente.jpg?updatedAt=1714161502803",
              imageAlt: "Front view of Puerta Aqua",
              title: [
                {
                  children: [{ type: "text", text: "Welcome to Your " }],
                },
                {
                  children: [
                    { type: "text", text: "Vacation Home", bold: true },
                  ],
                },
              ],
              name: "Front View",
              ctaUrl: "/booking",
              imageOverlay: "intense",
            },
          ],
          slideCta: "Reserve Now",
        },
      ],
      layout: [
        {
          blockType: "Lead",
          id: "lead",
          heading: "Under Construction",
          text: [
            {
              children: [
                {
                  type: "text",
                  text: "We are currently working on this page. Please check back soon.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
