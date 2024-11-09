import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "./navbar";
import {
  brand,
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
  logo: media("logo-puerta-simple.png"),
});

export const Default: Story = {
  args: {
    allBrands: [puertaBrand],
    brand: puertaBrand,
    onHeightChanged: () => {},
  },
};
