import type { Meta, StoryObj } from "@storybook/react";

import { Feature } from "./feature";

const meta = {
  title: "blocks/Features Block/Feature",
  component: Feature,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto my-36 max-w-6xl space-y-36 sm:px-16 lg:my-32 lg:space-y-24 lg:px-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Feature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageLeft: Story = {
  args: {
    orientation: "image-left",
    image: {
      url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
      alt: "Example image",
      aspectRatio: undefined!,
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
