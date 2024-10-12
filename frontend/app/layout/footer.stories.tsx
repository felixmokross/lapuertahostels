import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";
import { Brand } from "~/payload-types";
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
            { name: "About Us", url: ".#about-us" },
            { name: "Puerta Aqua", url: "/aqua" },
            { name: "La Puerta Azul", url: "/azul" },
            { name: "Contact", url: "#" },
          ],
        },
        {
          title: "Experiences",
          links: [
            { name: "Santa Marta", url: ".#santa-marta" },
            { name: "Lost City", url: "#" },
            { name: "Tayrona Park", url: "#" },
            { name: "Minca", url: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { name: "Terms", url: "#" },
            { name: "Cancelation", url: "#" },
            { name: "Privacy", url: "#" },
            { name: "FAQ", url: "#" },
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
