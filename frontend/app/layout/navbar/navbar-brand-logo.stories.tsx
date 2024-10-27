import type { Meta, StoryObj } from "@storybook/react";

import { NavbarBrandLogo } from "./navbar-brand-logo";
import { Brand } from "~/payload-types";

const meta = {
  title: "layout/Navbar/Navbar Brand Logo",
  component: NavbarBrandLogo,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavbarBrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

const puertaBrand = {
  id: "puerta",
  homeLinkUrl: "/",
  logo: {
    filename: "logo-puerta-simple.png",
    alt: "La Puerta Hostels Logo",
  },
  name: "La Puerta Hostels",
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
  },
};
