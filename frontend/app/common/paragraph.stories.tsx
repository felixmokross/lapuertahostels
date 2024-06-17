import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph, ParagraphHighlight } from "./paragraph";
import { cn } from "./cn";
import { BrandId } from "~/brands";
import { themesByBrand } from "~/themes";
import { allModes } from ".storybook/modes";

const meta = {
  title: "common/Paragraph",
  component: Paragraph,
  argTypes: {
    size: { control: "select", options: ["medium", "large", "extra-large"] },
  },
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-4xl">
        <Story />
      </div>
    ),
    (Story, { parameters, globals }) => {
      const theme = themesByBrand[globals.brand as BrandId];
      return (
        <div
          className={cn("h-screen py-8", {
            "bg-white": parameters.background === "white",
            [theme.bannerBackgroundColor]: parameters.background === "brand",
            [theme.footerBackgroundColor]:
              parameters.background === "brand-light",
          })}
        >
          <Story />
        </div>
      );
    },
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
    variant: "brand",
  },
  parameters: {
    background: "brand-light",
  },
};

export const VariantWhite: Story = {
  args: {
    ...VariantNeutral.args,
    variant: "white",
  },
  parameters: {
    background: "brand",
  },
};
