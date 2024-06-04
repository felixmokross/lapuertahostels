import type { Meta, StoryObj } from "@storybook/react";

import { BrandLogo } from "./brand-logo";
import { Brand } from "~/payload-types";

const meta = {
  title: "common/Brand Logo",
  component: BrandLogo,
  argTypes: {
    brand: {
      control: "radio",
      options: ["puerta", "aqua", "azul"],
    },
    size: {
      control: "radio",
      options: ["large", "small"],
    },
  },
} satisfies Meta<typeof BrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
    brand: {
      id: "puerta",
      logoUrl:
        "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-simple.png?updatedAt=1703906701749",
      name: "La Puerta Hostels",
    } as Brand,
  },
};

export const Small: Story = {
  args: {
    ...Large.args,
    size: "small",
  },
};
