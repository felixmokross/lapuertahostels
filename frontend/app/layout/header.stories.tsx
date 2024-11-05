import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
import { Brand, Page } from "~/payload-types";

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
  banner: {
    id: "1",
    createdAt: "2021-09-01T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z",
    name: "Discount before 20 September",
    message: {
      id: "1",
      text: "Travel before 20 September and get 20% off!",
      createdAt: "2021-09-01T00:00:00Z",
      updatedAt: "2021-09-01T00:00:00Z",
    },
    cta: {
      id: "1",
      name: "Book now",
      label: {
        id: "1",
        text: "Book now",
        createdAt: "2021-09-01T00:00:00Z",
        updatedAt: "2021-09-01T00:00:00Z",
      },
      type: "internal",
      page: { url: "/experiences/tayrona" } as Page,
      createdAt: "2021-09-01T00:00:00Z",
      updatedAt: "2021-09-01T00:00:00Z",
    },
  },
  logo: {
    id: "1",
    filename: "logo-puerta-simple.png",
    alt: "La Puerta Hostels Logo",
    createdAt: "2021-09-01T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z",
  },
  createdAt: "2021-09-01T00:00:00Z",
  updatedAt: "2021-09-01T00:00:00Z",
} as Brand;

export const Default: Story = {
  args: {
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
