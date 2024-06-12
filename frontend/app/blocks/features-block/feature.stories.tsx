import type { Meta, StoryObj } from "@storybook/react";
import { allModes } from ".storybook/modes";

import { Feature } from "./feature";

const meta = {
  title: "blocks/Features Block/Feature",
  component: Feature,
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
      },
    },
  },
} satisfies Meta<typeof Feature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageLeft: Story = {
  args: {
    orientation: "image-left",
    image: {
      url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
      alt: "Example image",
    },
    heading: "Beautiful Rooms",
    text: [
      {
        children: [
          {
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio in quam interdum vulputate. Morbi id sapien in libero vehicula dignissim. Curabitur eget urna eu mauris consectetur imperdiet. Proinconsequat libero et justo cursus ultricies.",
          },
        ],
      },
    ],
    cta: {
      show: true,
      text: "Book Now",
      url: "/book-now",
    },
  },
};

export const ImageRight: Story = {
  args: {
    ...ImageLeft.args,
    orientation: "image-right",
  },
};
