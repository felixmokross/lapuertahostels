import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";
import { Brand } from "~/payload-types";

const meta = {
  title: "Footer",
  component: Footer,
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: {
      address: `La Puerta Hostels S.A.S.
Calle 18 #5-66
Santa Marta 470004
Colombia`,
      copyright: "La Puerta Hostels S.A.S. All rights reserved.",
      socialLinks: [
        {
          platform: "facebook",
          url: "#",
        },
        {
          platform: "instagram",
          url: "#",
        },
        {
          platform: "whatsapp",
          url: "#",
        },
      ],
    },
    allBrands: [
      {
        id: "puerta",
        logoUrl:
          "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-simple.png?updatedAt=1703906701749",
        name: "La Puerta Hostels",
      } as Brand,
    ],
  },
};
