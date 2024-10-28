import type { Meta, StoryObj } from "@storybook/react";
import { AccommodationSelectorBlock } from "./accommodation-selector-block";
import { Page } from "~/payload-types";

const meta = {
  title: "blocks/Accommodation Selector Block",
  component: AccommodationSelectorBlock,
} satisfies Meta<typeof AccommodationSelectorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "AccommodationSelector",
    heading: "Your Home Base for a Perfect Trip",
    text: [
      {
        children: [
          { text: "Choose between our " },
          { text: "two accommodations", bold: true },
          { text: " in Santa Marta. " },
        ],
      },
    ],
    cards: [
      {
        id: "6647dbf8f50fb271d132f9c6",
        brand: {
          id: "aqua",
          name: "Puerta Aqua",
          homeLinkUrl: "/aqua",
          navLinks: [
            {
              id: "6649ce958dccc108dcab66ba",
              type: "internal",
              page: { url: "/" } as Page,
              label: "La Puerta Hostels",
            },
          ],
          logo: {
            id: "6647dbf8f50fb271d132f9c5",
            filename: "logo-aqua-simple.png",
            alt: "Puerta Aqua Logo",
            createdAt: "2024-05-19T10:04:05.148Z",
            updatedAt: "2024-05-19T10:04:05.148Z",
          },
          createdAt: "2024-05-19T10:04:05.148Z",
          updatedAt: "2024-05-19T10:04:05.148Z",
        },
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/aqua/spaces/Frente.jpg?updatedAt=1714161155761",
          alt: "Puerta Aqua",
          aspectRatio: undefined!,
        },
        description:
          "Stay at our lively hostel in the heart of Santa Marta and meet travelers from all over the world. Our rooftop bar is perfect for a get-together at night.",
      },
      {
        id: "6647dc15f50fb271d132f9c7",
        brand: {
          id: "azul",
          name: "La Puerta Azul",
          homeLinkUrl: "/azul",
          navLinks: [
            {
              id: "6649ce958dccc108dcab66b9",
              type: "internal",
              page: { url: "/" } as Page,
              label: "La Puerta Hostels",
            },
          ],
          logo: {
            id: "6647dbf8f50fb271d132f9c5",
            filename: "logo-azul-simple.png",
            alt: "Puerta Azul Logo",
            createdAt: "2024-05-19T10:04:05.148Z",
            updatedAt: "2024-05-19T10:04:05.148Z",
          },
          createdAt: "2024-05-19T10:04:05.148Z",
          updatedAt: "2024-05-19T10:04:05.148Z",
        },
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/10.jpg?updatedAt=1714162021839",
          alt: "La Puerta Azul",
          aspectRatio: undefined!,
        },
        description:
          "Being one of the oldest houses in Santa Marta, La Puerta Azul is filled with beauty and history. It can also be booked completely as a private six-room villa.",
      },
    ],
  },
};
