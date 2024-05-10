import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph, ParagraphHighlight } from "./paragraph";
import { cn } from "./cn";

const meta = {
  title: "Paragraph",
  component: Paragraph,
  argTypes: {
    size: { control: "select", options: ["medium", "large", "extra-large"] },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-4xl">
        <Story />
      </div>
    ),
    // TODO make this re-usable
    (Story, { parameters }) => (
      <div
        className={cn("h-screen py-8", {
          "bg-white": parameters.background === "white",
          "bg-puerta-700": parameters.background === "puerta",
          "bg-puerta-200": parameters.background === "puerta-light",
        })}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantNeutral: Story = {
  args: {
    size: "extra-large",
    children: (
      <>
        Hike through the breath-taking beauty of{" "}
        <ParagraphHighlight>Tayrona National Park</ParagraphHighlight>, discover
        the mysterious <ParagraphHighlight>Lost City</ParagraphHighlight>, or
        refresh yourself in the river of{" "}
        <ParagraphHighlight>Minca</ParagraphHighlight>. Our variety of heartful
        accommodations in the city of Santa Marta are{" "}
        <ParagraphHighlight>your perfect home base.</ParagraphHighlight>
      </>
    ),
  },
  parameters: {
    background: "white",
  },
};

export const VariantPuerta: Story = {
  args: {
    ...VariantNeutral.args,
    variant: "puerta",
  },
  parameters: {
    background: "puerta-light",
  },
};

export const VariantWhite: Story = {
  args: {
    ...VariantNeutral.args,
    variant: "white",
  },
  parameters: {
    background: "puerta",
  },
};
