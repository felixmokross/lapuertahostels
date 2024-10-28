import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
import { Brand } from "~/payload-types";

const meta = {
  title: "layout/Header",
  component: Header,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const puertaBrand = {
  id: "puerta",
  name: "La Puerta Hostels",
  homeLinkUrl: "/",
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
  logo: {
    filename: "logo-puerta-simple.png",
    alt: "La Puerta Hostels Logo",
  },
} as Brand;

export const Default: Story = {
  args: {
    banner: {
      show: true,
      message: "Travel before 20 September and get 20% off!",
      cta: {
        show: true,
        text: "Book now",
        url: "/cta",
      },
    },
    brand: puertaBrand,
    allBrands: [
      puertaBrand,
      {
        id: "aqua",
        homeLinkUrl: "/aqua",
        logo: {
          url: "https://ik.imagekit.io/lapuertahostels/staging/logos/logo-aqua-simple.png?updatedAt=1703906701749",
        },
        name: "Puerta Aqua",
      } as Brand,
      {
        id: "azul",
        homeLinkUrl: "/azul",
        logo: {
          url: "https://ik.imagekit.io/lapuertahostels/staging/logos/logo-azul-simple.png?updatedAt=1703906701749",
        },
        name: "La Puerta Azul",
      } as Brand,
    ],
    onHeightChanged: () => {},
  },
};
