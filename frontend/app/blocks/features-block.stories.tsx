import type { Meta, StoryObj } from "@storybook/react";

import { FeaturesBlock } from "./features-block";
import { ParagraphHighlight } from "../components/paragraph";

const meta = {
  title: "blocks/Features Block",
  component: FeaturesBlock,
  argTypes: {},
} satisfies Meta<typeof FeaturesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        image: {
          src: "/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
          alt: "Example image",
        },
        title: "Feel Refreshed",
        paragraphContent: (
          <>
            A day full of exploring the city can be tiring. Our{" "}
            <ParagraphHighlight>air-conditioned</ParagraphHighlight> rooms with{" "}
            <ParagraphHighlight>tasteful</ParagraphHighlight> details give you
            the perfect place to relax and unwind.
          </>
        ),
      },
      {
        image: {
          src: "/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
          alt: "Example image",
        },
        title: "Cool Down in the Pool",
        paragraphContent: (
          <>
            Our <ParagraphHighlight>courtyard pool</ParagraphHighlight> is the
            perfect place to cool down after a hot day under the Carribean sun.
          </>
        ),
      },
      {
        image: {
          src: "/azul/delux%20twin%20with%20terrace/_DSC0325.jpg?updatedAt=1714162301928",
          alt: "Example image",
        },
        title: "Bring Your Family",
        paragraphContent: (
          <>
            Traveling with your loved ones? We offer{" "}
            <ParagraphHighlight>Twin Rooms</ParagraphHighlight> allowing an
            occupancy of up to four people.
          </>
        ),
      },
    ],
  },
};
