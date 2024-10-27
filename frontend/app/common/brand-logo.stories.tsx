import type { Meta, StoryObj } from "@storybook/react";

import { BrandLogo } from "./brand-logo";
import { Brand } from "~/payload-types";

const meta = {
  title: "common/Brand Logo",
  component: BrandLogo,
  argTypes: {},
} satisfies Meta<typeof BrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
    brand: {
      id: "puerta",
      logo: {
        filename: "logo-puerta-simple.png",
        alt: "La Puerta Hostels Logo",
      },
      name: "La Puerta Hostels",
    } as Brand,
    type: "with-wordmark",
  },
};

export const Small: Story = {
  args: {
    ...Large.args,
    size: "small",
  },
};

export const Simple: Story = {
  args: {
    ...Large.args,
    type: "simple",
  },
};

export const Aqua: Story = {
  args: {
    ...Large.args,
    brand: {
      id: "aqua",
      logo: {
        filename: "logo-aqua-simple.png",
        alt: "Puerta Aqua Logo",
      },
      name: "Puerta Aqua",
    } as Brand,
  },
};

export const Azul: Story = {
  args: {
    ...Large.args,
    brand: {
      id: "azul",
      logo: {
        filename: "logo-azul-simple.png",
        alt: "La Puerta Azul Logo",
      },
      name: "La Puerta Azul",
    } as Brand,
  },
};
