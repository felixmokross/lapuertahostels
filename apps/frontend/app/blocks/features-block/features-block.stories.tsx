import type { Meta, StoryObj } from "@storybook/react";

import { FeaturesBlock } from "./features-block";
import {
  callToAction,
  media,
  plainText,
  richText,
} from "~/common/cms-data.builders";
import { bold, paragraph, text } from "@lapuertahostels/shared";

const meta = {
  title: "blocks/Features Block",
  component: FeaturesBlock,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeaturesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Features",
    items: [
      {
        image: media("_DSC0358.jpg"),
        heading: plainText("Feel Refreshed"),
        text: richText(
          paragraph(
            text("A day full of exploring the city can be tiring. Our "),
            bold("air-conditioned"),
            text(" rooms with "),
            bold("tasteful"),
            text(" details give you the perfect place to relax and unwind."),
          ),
        ),
      },
      {
        image: media("_DSC0299.jpg"),
        heading: plainText("Cool Down in the Pool"),
        text: richText(
          paragraph(
            text("Our "),
            bold("courtyard pool"),
            text(
              " is the perfect place to cool down after a hot day under the Carribean sun.",
            ),
          ),
        ),
      },
      {
        image: media("_DSC0325.jpg"),
        heading: plainText("Bring Your Family"),
        text: richText(
          paragraph(
            text("Traveling with your loved ones? We offer "),
            bold("Twin Rooms"),
            text(" allowing an occupancy of up to four people."),
          ),
        ),
        cta: callToAction("Book Twin Room"),
      },
    ],
  },
};

export const OrientationFirstImageRight: Story = {
  args: {
    ...Default.args,
    orientation: "first-image-right",
  },
};
