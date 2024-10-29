import { Meta, StoryObj } from "@storybook/react";
import { TextWithImageItem } from "./text-with-image-item";
import { media } from "~/common/media.builders";
import { plain, text } from "~/common/rich-text.builders";
import { Page } from "~/payload-types";

const meta = {
  title: "blocks/Text Columns with Images Block/Text with Image Item",
  component: TextWithImageItem,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="my-8 grid grid-cols-1 gap-x-8 gap-y-16 px-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextWithImageItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
    image: media("_DSC0299.jpg"),
    heading: "Example Heading",
    text: [
      plain(text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")),
    ],
    cta: {
      show: true,
      link: {
        label: "Learn More",
        type: "internal",
        page: { url: "/services/example" } as Page,
      },
      variant: "secondary",
    },
    size: "full",
    imageWidth: 430,
    imageSizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
};

export const WithSizeMedium = {
  args: {
    ...Default.args,
    size: "medium",
  },
};

export const WithSizeSmall = {
  args: {
    ...Default.args,
    size: "small",
  },
};

export const WithoutCallToAction = {
  args: {
    ...Default.args,
    cta: undefined,
  },
};

export const WithoutImage = {
  args: {
    ...Default.args,
    image: undefined,
  },
};

export const WithoutText = {
  args: {
    ...Default.args,
    text: undefined,
  },
};

export const WithoutHeading = {
  args: {
    ...Default.args,
    heading: undefined,
  },
};
