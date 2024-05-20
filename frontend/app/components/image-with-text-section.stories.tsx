import type { Meta, StoryObj } from "@storybook/react";

import { ImageWithTextSection } from "./image-with-text-section";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { Button } from "./button";

const meta = {
  title: "Image with Text Section",
  component: ImageWithTextSection,
  argTypes: {},
} satisfies Meta<typeof ImageWithTextSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageLeft: Story = {
  args: {
    orientation: "image-left",
    image: {
      src: "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
      alt: "Example image",
    },
    children: (
      <>
        <Heading size="medium" variant="brand" as="h4" className="-mt-4">
          Beautiful Rooms
        </Heading>
        <Paragraph size="large" className="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio
          in quam interdum vulputate. Morbi id sapien in libero vehicula
          dignissim. Curabitur eget urna eu mauris consectetur imperdiet. Proin
          consequat libero et justo cursus ultricies.
        </Paragraph>
        <Button size="large" className="mt-6">
          Book Now
        </Button>
      </>
    ),
  },
};

export const ImageRight: Story = {
  args: {
    ...ImageLeft.args,
    orientation: "image-right",
  },
};
