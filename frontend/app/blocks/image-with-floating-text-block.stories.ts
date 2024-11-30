import type { Meta, StoryObj } from "@storybook/react";
import { ImageWithFloatingTextBlock } from "./image-with-floating-text-block";
import { allModes } from ".storybook/modes";
import { richText } from "~/common/cms-data.builders";
import { bold, paragraph, text } from "~/common/rich-text.builders";

const meta = {
  title: "blocks/Image with Floating Text Block",
  component: ImageWithFloatingTextBlock,
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
      },
    },
  },
} satisfies Meta<typeof ImageWithFloatingTextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "ImageWithFloatingText",
    image: {
      id: "1",
      filename: "oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg",
      alt: "View of Santa Marta",
      createdAt: "2022-01-01T00:00:00Z",
      updatedAt: "2022-01-01T00:00:00Z",
    },
    overlayTitle: {
      text: richText(paragraph(text("Do You Know "), bold("Santa Marta?"))),
    },
    text: richText(
      paragraph(
        text("Santa Marta, nestled "),
        bold("between the Caribbean Sea and the Sierra Nevada mountains, "),
        text("beckons tourists with its captivating blend of "),
        bold("natural beauty"),
        text(" and "),
        bold("rich cultural heritage"),
        text(
          ". Boasting pristine beaches, lush national parks, and a historic city center, Santa Marta offers an ",
        ),
        bold("enchanting escape"),
        text(" for travelers seeking a perfect balance of "),
        bold("sun-soaked relaxation"),
        text(" and "),
        bold("exploration"),
        text(" of Colombia’s diverse landscapes."),
      ),
    ),
  },
};

export const TextRight: Story = {
  args: {
    ...Default.args,
    overlayTitle: {
      ...Default.args.overlayTitle,
      position: "top-right",
    },
  },
};

export const ImageOverlaySubtle: Story = {
  args: {
    ...Default.args,
    overlayTitle: {
      ...Default.args.overlayTitle,
      overlay: "subtle",
    },
  },
};

export const ImageOverlayIntense: Story = {
  args: {
    ...Default.args,
    overlayTitle: {
      ...Default.args.overlayTitle,
      overlay: "intense",
    },
  },
};
