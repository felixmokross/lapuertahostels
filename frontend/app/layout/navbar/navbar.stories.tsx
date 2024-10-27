import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "./navbar";
import { Brand } from "~/payload-types";

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

const puertaBrand = {
  id: "puerta",
  name: "La Puerta Hostels",
  homeLinkUrl: "/",
  navLinks: [
    {
      page: { url: "/aqua" },
      type: "internal",
      label: "Puerta Aqua",
    },
    {
      page: { url: "/azul" },
      type: "internal",
      label: "La Puerta Azul",
    },
    {
      page: { url: "/" },
      fragment: "santa-marta",
      type: "internal",
      label: "Santa Marta",
    },
    {
      page: { url: "/" },
      fragment: "about-us",
      type: "internal",
      label: "About Us",
    },
    {
      page: { url: "/contact" },
      type: "internal",
      label: "Contact",
    },
  ],
  logo: {
    filename: "logo-puerta-simple.png",
    alt: "La Puerta Hostels Logo",
  },
} as Brand;

export const Default: Story = {
  args: {
    allBrands: [
      puertaBrand,
      {
        id: "aqua",
        homeLinkUrl: "/aqua",
        logo: {
          filename: "logo-puerta-aqua.png",
          alt: "Puerta Aqua Logo",
        },
        name: "Puerta Aqua",
      } as Brand,
      {
        id: "azul",
        homeLinkUrl: "/azul",
        logo: {
          filename: "logo-puerta-azul.png",
          alt: "La Puerta Azul Logo",
        },
        name: "La Puerta Azul",
      } as Brand,
    ],
    brand: puertaBrand,
    onHeightChanged: () => {},
  },
};
