import type { Meta, StoryObj } from "@storybook/react";

import { Heading, HeadingHighlight } from "./heading";
import { cn } from "./classnames";

const meta = {
  title: "Heading",
  component: Heading,
  argTypes: {
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: { control: "select", options: ["medium", "large", "extra-large"] },
    variant: { control: "select", options: ["puerta", "white"] },
    children: { control: false },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, { parameters }) => (
      <div
        className={cn("h-screen px-8 py-2", {
          "bg-white": parameters.background === "white",
          "bg-puerta-700": parameters.background === "puerta",
        })}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantPuerta: Story = {
  args: {
    as: "h1",
    children: "Discover the Colombian Costa Caribe",
    size: "extra-large",
    variant: "puerta",
  },
  parameters: {
    background: "white",
  },
};

export const VariantWhite: Story = {
  args: {
    as: "h1",
    children: (
      <>
        Discover the <HeadingHighlight>Colombian Costa Caribe</HeadingHighlight>
      </>
    ),
    size: "extra-large",
    variant: "white",
  },
  parameters: {
    background: "puerta",
  },
};
