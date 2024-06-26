import type { Meta, StoryObj } from "@storybook/react";

import { HeaderBrandLogo } from "./header-brand-logo";
import { Brand } from "~/payload-types";

const meta = {
  title: "layout/Header/Header Brand Logo",
  component: HeaderBrandLogo,
  argTypes: {},
} satisfies Meta<typeof HeaderBrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

const puertaBrand = {
  id: "puerta",
  homeLinkUrl: "/",
  logo: {
    url: "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-simple.png?updatedAt=1703906701749",
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
          url: "https://ik.imagekit.io/lapuertahostels/logos/logo-aqua-simple.png?updatedAt=1703906701749",
        },
        name: "Puerta Aqua",
      } as Brand,
      {
        id: "azul",
        homeLinkUrl: "/azul",
        logo: {
          url: "https://ik.imagekit.io/lapuertahostels/logos/logo-azul-simple.png?updatedAt=1703906701749",
        },
        name: "La Puerta Azul",
      } as Brand,
    ],
    brand: puertaBrand,
  },
};
