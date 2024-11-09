import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";
import { allModes } from ".storybook/modes";
import {
  brand,
  internalLink,
  media,
  plainText,
} from "~/common/cms-data.builders";

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

const puertaBrand = brand({
  id: "puerta",
  logo: media("logo-puerta-simple.png"),
  name: "La Puerta Hostels",
  footer: {
    linkGroups: [
      {
        name: "Hotel",
        title: plainText("Hotel"),
        links: [
          {
            label: plainText("La Puerta Hostels"),
            link: internalLink("/"),
          },
          {
            label: plainText("Puerta Aqua"),
            link: internalLink("/aqua"),
          },
          {
            label: plainText("La Puerta Azul"),
            link: internalLink("/azul"),
          },
          {
            label: plainText("About Us"),
            link: internalLink("/about-us"),
          },
          {
            label: plainText("Contact"),
            link: internalLink("/contact"),
          },
        ],
      },
      {
        name: "Experiences",
        title: plainText("Experiences"),
        links: [
          {
            label: plainText("Santa Marta"),
            link: internalLink("/santa-marta"),
          },
          {
            label: plainText("Lost City"),
            link: internalLink("/lost-city"),
          },
          {
            label: plainText("Tayrona Park"),
            link: internalLink("/tayrona-park"),
          },
          {
            label: plainText("Minca"),
            link: internalLink("/minca"),
          },
        ],
      },
      {
        name: "Legal",
        title: plainText("Legal"),
        links: [
          {
            label: plainText("Terms"),
            link: internalLink("/terms"),
          },
          {
            label: plainText("Cancelation"),
            link: internalLink("/cancelation"),
          },
          {
            label: plainText("Privacy"),
            link: internalLink("/privacy"),
          },
          {
            label: plainText("FAQ"),
            link: internalLink("/faq"),
          },
        ],
      },
    ],
  },
});

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
    allBrands: [puertaBrand],
    brand: puertaBrand,
  },
};
