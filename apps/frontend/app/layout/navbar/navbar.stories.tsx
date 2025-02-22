import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "./navbar";
import {
  brand,
  externalLink,
  internalLink,
  media,
  plainText,
} from "~/common/cms-data.builders";

const meta = {
  title: "layout/Navbar",
  component: Navbar,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const puertaBrand = brand({
  id: "puerta",
  name: "La Puerta Hostels",
  homeLink: internalLink("/"),
  navLinks: [
    {
      label: plainText("Accommodations"),
      link: internalLink("/accommodations"),
    },
    {
      label: plainText("Santa Marta"),
      link: internalLink("/santa-marta"),
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
  bookCta: {
    show: true,
    label: plainText("Book Now"),
    link: externalLink("https://www.example.com"),
  },
  logo: media("logo-puerta-simple.png"),
});

export const Default: Story = {
  args: {
    allBrands: [puertaBrand],
    brand: puertaBrand,
    onHeightChanged: () => {},
  },
};

export const WithoutBookCta: Story = {
  name: "Without Book CTA",
  args: {
    ...Default.args,
    brand: {
      ...puertaBrand,
      bookCta: { show: false },
    },
  },
};
