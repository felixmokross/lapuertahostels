import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./page";
import { ThemeProvider } from "~/brands";
import { Brand } from "~/payload-types";

const meta = {
  title: "routes/azul/Page",
  component: Page,
  argTypes: {},
  decorators: [
    // override the brand context, this is a Azul-only component
    (Story) => (
      <ThemeProvider brand={{ id: "azul" } as Brand}>
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
      id: "azul",
      createdAt: "2024-05-10T19:18:09.727Z",
      updatedAt: "2024-05-18T16:01:55.117Z",
      url: "/azul",
      hero: [
        {
          slides: [
            {
              image: {
                url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/10.jpg?updatedAt=1714162021839",
                alt: "Atrium of La Puerta Azul",
                alignment: "bottom",
              },
              name: "Atrium",
              overlayTitle: {
                show: true,
                text: [
                  {
                    children: [
                      { type: "text", text: "Welcome to Your " },
                      { type: "text", text: "Vacation Home", bold: true },
                    ],
                  },
                ],
                overlay: "intense",
                position: "center",
                cta: {
                  show: true,
                  text: "Reserve Now",
                  url: "/booking",
                },
              },
            },
            {
              name: "Room View",
              image: {
                url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
                alt: "Room view of La Puerta Azul",
              },
              overlayTitle: {
                show: true,
                text: [
                  {
                    children: [
                      { type: "text", text: "Cool Down" },
                      { type: "text", text: " by the Pool", bold: true },
                    ],
                  },
                ],
                overlay: "subtle",
                position: "bottom-left",
                cta: {
                  show: true,
                  text: "Book Now",
                  url: "/booking",
                },
              },
            },
          ],
          id: "664b5b879e149f43ef4874c8",
          blockType: "Slides",
        },
      ],
      layout: [
        {
          items: [
            {
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
              imageAlt: "View of a room",
              title: "Feel Newborn",
              text: [
                {
                  children: [
                    {
                      text: "A day full of exploring the city can be tiring. Our ",
                    },
                    {
                      text: "air-conditioned",
                      bold: true,
                    },
                    {
                      text: " rooms with ",
                    },
                    {
                      text: "tasteful",
                      bold: true,
                    },
                    {
                      text: " details give you the perfect place to relax and unwind.",
                    },
                  ],
                },
              ],
              id: "664904b75b1291dc0b0a9fa5",
            },
            {
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/azul/delux%20twin%20with%20terrace/_DSC0325.jpg?updatedAt=1714162301928",
              imageAlt: "View of a Twin Room with two double beds",
              title: "Bring Your Family",
              text: [
                {
                  children: [
                    {
                      text: "Traveling with your loved ones? We offer ",
                    },
                    {
                      text: "Twin Rooms",
                      bold: true,
                    },
                    {
                      text: " allowing an occupancy of up to four people. Perfect for your family get-away.\n",
                    },
                  ],
                },
              ],
              id: "6649076a43cd15be5c01796e",
            },
            {
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
              imageAlt: "View of the courtyard pool",
              title: "Cool Down by the Pool",
              text: [
                {
                  children: [
                    {
                      text: "Our ",
                    },
                    {
                      text: "courtyard pool",
                      bold: true,
                    },
                    {
                      text: " is the perfect place to cool down after a hot day under the                  Carribean sun.",
                    },
                  ],
                },
              ],
              id: "6649070543cd15be5c01796d",
            },
            {
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/azul/piscina/10.jpg?updatedAt=1714162021839",
              imageAlt: "Picture of the courtyard",
              title: "A Beautiful Courtyard",
              text: [
                {
                  children: [
                    {
                      text: "Our courtyard is the perfect place to enjoy a cocktail or two. With the nice little ",
                    },
                    {
                      text: "pool",
                      bold: true,
                    },
                    {
                      text: " and the lush greenery, you",
                    },
                    {
                      text: "’",
                      underline: true,
                    },
                    {
                      text: "ll feel like you",
                    },
                    {
                      text: "’",
                      underline: true,
                    },
                    {
                      text: "re in paradise.",
                    },
                  ],
                },
              ],
              id: "664907e143cd15be5c01796f",
            },
            {
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/azul/standard%20twin/_DSC0820.jpg?updatedAt=1714162321093",
              imageAlt:
                "Picture of the bathroom table with the hairdryer on it",
              title: "Freshen Up",
              text: [
                {
                  children: [
                    {
                      text: "Experience our impeccably appointed bathrooms, ",
                    },
                    {
                      text: "thoughtfully equipped",
                      bold: true,
                    },
                    {
                      text: " to ensure you’re primed for a night out in the historic center or refreshed for a restful night’s sleep.\n",
                    },
                  ],
                },
              ],
              id: "6649090d43cd15be5c017970",
            },
            {
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
              imageAlt:
                "Picture of the room terrace with two coffee cups on the table",
              title: "Enjoy the Morning",
              text: [
                {
                  children: [
                    {
                      text: "Start your day right with a tinto on your ",
                    },
                    {
                      text: "private terrace",
                      bold: true,
                    },
                    {
                      text: " and listen to Santa Marta coming to life.",
                    },
                  ],
                },
              ],
              id: "664909b4f949fd4d1b850f24",
            },
          ],
          id: "664b5b879e149f43ef4874c8",
          blockType: "Features",
          blockName: "Features",
        },
      ],
    },
  },
};
