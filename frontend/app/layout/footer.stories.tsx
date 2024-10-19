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
      linkGroups: [
        {
          title: "Hotel",
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
          title: "Experiences",
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
          title: "Legal",
          links: [
            { label: "Terms", type: "external", url: "#" },
            { label: "Cancelation", type: "external", url: "#" },
            { label: "Privacy", type: "external", url: "#" },
            { label: "FAQ", type: "external", url: "#" },
          ],
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
    allBrands: [
      {
        id: "puerta",
        logo: {
          url: "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-simple.png?updatedAt=1703906701749",
        },
        name: "La Puerta Hostels",
        homeLinkUrl: "/",
      } as Brand,
    ],
  },
};
