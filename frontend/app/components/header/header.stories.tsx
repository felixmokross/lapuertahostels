import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./header";
import { Brand } from "~/payload-types";

const meta = {
  title: "header/Header",
  component: Header,
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const puertaBrand = {
  id: "puerta",
  name: "La Puerta Hostels",
  navLinks: [
    {
      url: "/aqua",
      label: "Puerta Aqua",
    },
    {
      url: "/azul",
      label: "La Puerta Azul",
    },
    {
      url: ".#santa-marta",
      label: "Santa Marta",
    },
    {
      url: ".#about-us",
      label: "About Us",
    },
    {
      url: "#",
      label: "Contact",
    },
  ],
  logoUrl:
    "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-simple.png?updatedAt=1703906701749",
} as Brand;

export const Primary: Story = {
  args: {
    allBrands: [
      puertaBrand,
      {
        id: "aqua",
        homeLinkUrl: "/aqua",
        logoUrl:
          "https://ik.imagekit.io/lapuertahostels/logos/logo-aqua-simple.png?updatedAt=1703906701749",
        name: "Puerta Aqua",
      } as Brand,
      {
        id: "azul",
        homeLinkUrl: "/azul",
        logoUrl:
          "https://ik.imagekit.io/lapuertahostels/logos/logo-azul-simple.png?updatedAt=1703906701749",
        name: "La Puerta Azul",
      } as Brand,
    ],
    brand: puertaBrand,
  },
};
