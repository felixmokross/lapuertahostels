import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";
import { Brand, Page } from "~/payload-types";
import { allModes } from ".storybook/modes";

const meta = {
  title: "layout/Footer",
  component: Footer,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
        "locale-es": allModes["locale-es"],
        "locale-de": allModes["locale-de"],
        "locale-fr": allModes["locale-fr"],
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const brand = {
  id: "puerta",
  logo: {
    filename: "logo-puerta-simple.png",
    alt: "La Puerta Hostels Logo",
  },
  name: "La Puerta Hostels",
  homeLinkUrl: "/",
  footer: {
    linkGroups: [
      {
        name: "Hotel",
        title: { text: "Hotel" },
        links: [
          {
            label: "About Us",
            type: "internal",
            page: { url: "/" } as Page,
            fragment: "about-us",
          },
          {
            label: "Puerta Aqua",
            type: "internal",
            page: { url: "/aqua" } as Page,
          },
          {
            label: "La Puerta Azul",
            type: "internal",
            page: { url: "/azul" } as Page,
          },
          {
            label: "Contact",
            type: "internal",
            page: { url: "/contact" } as Page,
          },
        ],
      },
      {
        name: "Experiences",
        title: { text: "Experiences" },
        links: [
          {
            label: "Santa Marta",
            type: "internal",
            page: { url: ":" } as Page,
            fragment: "santa-marta",
          },
          { label: "Lost City", type: "external", url: "#" },
          { label: "Tayrona Park", type: "external", url: "#" },
          { label: "Minca", type: "external", url: "#" },
        ],
      },
      {
        name: "Legal",
        title: { text: "Legal" },
        links: [
          { label: "Terms", type: "external", url: "#" },
          { label: "Cancelation", type: "external", url: "#" },
          { label: "Privacy", type: "external", url: "#" },
          { label: "FAQ", type: "external", url: "#" },
        ],
      },
    ],
  },
} as Brand;

export const Default: Story = {
  args: {
    content: {
      address: `La Puerta Hostels S.A.S.
Calle 18 #5-66
Santa Marta 470004
Colombia`,
      copyright: "La Puerta Hostels S.A.S. All rights reserved.",
      socialLinks: [
        {
          platform: "facebook",
          url: "#",
        },
        {
          platform: "instagram",
          url: "#",
        },
        {
          platform: "whatsapp",
          url: "#",
        },
      ],
      newsletter: {
        show: true,
        title: "Subscribe to our newsletter",
        description:
          "Don’t miss out on new experiences, discounts, or any other news from us!",
        emailPlaceholder: "Enter your email",
        buttonLabel: "Subscribe",
      },
    },
    allBrands: [brand],
    brand,
  },
};
