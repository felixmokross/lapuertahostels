import { Meta, StoryObj } from "@storybook/react";
import { OverlayTitle } from "./overlay-title";
import { bold, paragraph, text } from "~/common/rich-text.builders";
import { callToAction, media, richText } from "~/common/cms-data.builders";
import { SlideImage } from "../slides-block/slide-image";
import { getSrcFromMedia } from "~/common/media";

const meta = {
  component: OverlayTitle,
  title: "blocks/common/OverlayTitle",
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <SlideImage
          src={getSrcFromMedia(media("david-hertle-3YCkAhD--Ic-unsplash.jpg"))}
        />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OverlayTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: richText(
      paragraph(text("This is")),
      paragraph(text("an "), bold("Overlay Title")),
    ),
    cta: callToAction("Click me", "primary"),
  },
};

export const PositionTopLeft: Story = {
  args: {
    ...Default.args,
    position: "top-left",
  },
};

export const PositionTopRight: Story = {
  args: {
    ...Default.args,
    position: "top-right",
  },
};

export const PositionBottomRight: Story = {
  args: {
    ...Default.args,
    position: "bottom-right",
  },
};

export const PositionBottomLeft: Story = {
  args: {
    ...Default.args,
    position: "bottom-left",
  },
};

export const OverlaySubtle: Story = {
  args: {
    ...Default.args,
    overlay: "subtle",
  },
};

export const OverlayIntense: Story = {
  args: {
    ...Default.args,
    overlay: "intense",
  },
};

export const WithSupportingText: Story = {
  args: {
    ...Default.args,
    supportingText: richText(
      paragraph(text("Book through us and get one night for free.")),
    ),
    position: "bottom-right",
    overlay: "intense",
  },
};

export const WithoutCallToAction: Story = {
  args: {
    ...Default.args,
    position: "bottom-left",
    cta: undefined,
  },
};
