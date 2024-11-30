import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";
import { allModes } from ".storybook/modes";
import {
  brand,
  externalLink,
  internalLink,
  media,
  plainText,
  richText,
} from "~/common/cms-data.builders";
import { paragraph, text } from "~/common/rich-text.builders";

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
        title: plainText("Hotel"),
        links: [
          {
            label: plainText("About Us"),
            link: internalLink("/about-us"),
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
            label: plainText("Contact"),
            link: internalLink("/contact"),
          },
        ],
      },
      {
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
      address: richText(
        paragraph(
          text(`La Puerta Hostels S.A.S.
Calle 18 #5-66
Santa Marta 470004
Colombia`),
        ),
      ),
      copyright: richText(
        paragraph(text("La Puerta Hostels S.A.S. All rights reserved.")),
      ),
      socialLinks: [
        {
          platform: "facebook",
          link: externalLink("http://example.com"),
        },
        {
          platform: "instagram",
          link: externalLink("http://example.com"),
        },
        {
          platform: "whatsapp",
          link: externalLink("http://example.com"),
        },
      ],
      newsletter: {
        show: true,
        title: plainText("Subscribe to our newsletter"),
        description: plainText(
          "Don’t miss out on new experiences, discounts, or any other news from us!",
        ),
        emailPlaceholder: plainText("Enter your email"),
        buttonLabel: plainText("Subscribe"),
      },
    },
    allBrands: [puertaBrand],
    brand: puertaBrand,
  },
};
