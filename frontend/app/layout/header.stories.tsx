import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
import {
  banner,
  brand,
  internalLink,
  media,
  plainText,
} from "~/common/cms-data.builders";

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

const puertaBrand = brand({
  id: "puerta",
  name: "La Puerta Hostels",
  logo: media("logo-puerta-simple.png"),
  homeLink: internalLink("/"),
  navLinks: [
    {
      label: plainText("Puerta Aqua"),
      link: internalLink("/aqua"),
    },
    {
      label: plainText("La Puerta Azul"),
      link: internalLink("/azul"),
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
  banner: banner("Travel before 20 September and get 20% off!", "Book now"),
});

export const Default: Story = {
  args: {
    brand: puertaBrand,
    allBrands: [puertaBrand],
  },
};
