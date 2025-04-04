import type { Meta, StoryObj } from "@storybook/react";
import { AccommodationSelectorBlock } from "./accommodation-selector-block";
import {
  brand,
  internalLink,
  media,
  plainText,
  richText,
} from "~/common/cms-data.builders";
import { bold, paragraph, text } from "@lapuertahostels/shared";
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
    heading: plainText("Your Home Base for a Perfect Trip"),
    text: richText(
      paragraph(
        text("Choose between our "),
        bold("two accommodations"),
        text(" in Santa Marta."),
      ),
    ),
    cards: [
      {
        id: createId(),
        brand: brand({
          id: "aqua",
          name: "Puerta Aqua",
          homeLink: internalLink("/aqua"),
        }),
        image: media("Frente.jpg"),
        description: richText(
          paragraph(
            text(
              "Stay at our lively hostel in the heart of Santa Marta and meet travelers from all over the world. Our rooftop bar is perfect for a get-together at night.",
            ),
          ),
        ),
      },
      {
        id: createId(),
        brand: brand({
          id: "azul",
          name: "La Puerta Azul",
          homeLink: internalLink("/azul"),
        }),
        image: media("10.jpg"),
        description: richText(
          paragraph(
            text(
              "Being one of the oldest houses in Santa Marta, La Puerta Azul is filled with beauty and history. It can also be booked completely as a private six-room villa.",
            ),
          ),
        ),
      },
    ],
  },
};
