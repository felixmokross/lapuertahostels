import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./header";

const meta = {
  title: "header/Header",
  component: Header,
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: {
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
    },
  },
};
