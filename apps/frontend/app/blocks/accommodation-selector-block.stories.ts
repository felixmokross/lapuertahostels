import type { Meta, StoryObj } from "@storybook/react";
import {
  AccommodationSelectorBlock,
  AccommodationSelectorBlockProps,
} from "./accommodation-selector-block";
import { brand, internalLink, media } from "~/common/cms-data.builders";
import { bold, paragraph, richTextRoot, text } from "@lapuertahostels/shared";
import { createId } from "@paralleldrive/cuid2";

const meta = {
  title: "blocks/Accommodation Selector Block",
  component: AccommodationSelectorBlock,
} satisfies Meta<typeof AccommodationSelectorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "AccommodationSelector",
    heading: "Your Home Base for a Perfect Trip",
    text: richTextRoot(
      paragraph(
        text("Choose between our "),
        bold("two accommodations"),
        text(" in Santa Marta."),
      ),
    ) as unknown as AccommodationSelectorBlockProps["text"],
    cards: [
      {
        id: createId(),
        brand: brand({
          id: "aqua",
          name: "Puerta Aqua",
          homeLink: internalLink("/aqua"),
        }),
        image: media("Frente.jpg"),
        description: richTextRoot(
          paragraph(
            text(
              "Stay at our lively hostel in the heart of Santa Marta and meet travelers from all over the world. Our rooftop bar is perfect for a get-together at night.",
            ),
          ),
        ) as unknown as NonNullable<
          AccommodationSelectorBlockProps["cards"]
        >[number]["description"],
      },
      {
        id: createId(),
        brand: brand({
          id: "azul",
          name: "La Puerta Azul",
          homeLink: internalLink("/azul"),
        }),
        image: media("10.jpg"),
        description: richTextRoot(
          paragraph(
            text(
              "Being one of the oldest houses in Santa Marta, La Puerta Azul is filled with beauty and history. It can also be booked completely as a private six-room villa.",
            ),
          ),
        ) as unknown as NonNullable<
          AccommodationSelectorBlockProps["cards"]
        >[number]["description"],
      },
    ],
  },
};
