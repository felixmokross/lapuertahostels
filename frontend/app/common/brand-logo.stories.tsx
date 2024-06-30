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
        url: "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-simple.png?updatedAt=1703906701749",
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
        url: "https://ik.imagekit.io/lapuertahostels/logos/logo-aqua-simple.png?updatedAt=1703915191239",
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
        url: "https://ik.imagekit.io/lapuertahostels/logos/logo-azul-simple.png?updatedAt=1703915191239",
      },
      name: "La Puerta Azul",
    } as Brand,
  },
};
