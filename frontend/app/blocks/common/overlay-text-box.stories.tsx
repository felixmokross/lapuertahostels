import { Meta, StoryObj } from "@storybook/react";
import { OverlayTextBox } from "./overlay-text-box";
import {
  externalLink,
  media,
  plainText,
  richText,
} from "~/common/cms-data.builders";
import { bold, paragraph, text } from "@lapuertahostels/shared";
import { MediaImage } from "~/common/media";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { PageLink } from "~/common/page-link";

const meta = {
  component: OverlayTextBox,
  title: "blocks/common/OverlayTextBox",
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="my-12 flex flex-col-reverse gap-4 lg:relative lg:h-[35rem]">
        <MediaImage
          transformation={{
            aspectRatio: { width: 4, height: 3 },
            width: 800,
          }}
          className="h-[35rem] w-full object-cover lg:h-full"
          layout="responsive"
          srcMultiplier={6}
          sizes="100vw"
          media={media("david-hertle-3YCkAhD--Ic-unsplash.jpg")}
        />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OverlayTextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: plainText("Feel at Home"),
    text: richText(
      paragraph(
        text("Experience "),
        bold("Colombian hospitality"),
        text(" in our boutique hostel's "),
        bold("inviting community areas"),
        text(", perfect for "),
        bold("connecting"),
        text(" and creating "),
        bold("unforgettable"),
        text(" memories."),
      ),
    ),
    cta: {
      as: PageLink,
      label: plainText("Discover More"),
      variant: "secondary",
      link: externalLink("http://example.com/"),
    },
  },
};

export const TopRight: Story = {
  args: {
    ...Default.args,
    position: "top-right",
  },
};

export const BottomLeft: Story = {
  args: {
    ...Default.args,
    position: "bottom-left",
  },
};

export const BottomRight: Story = {
  args: {
    ...Default.args,
    position: "bottom-right",
  },
};

export const WithIconForCallToAction: Story = {
  args: {
    ...Default.args,
    cta: {
      ...Default.args.cta!,
      icon: Cog6ToothIcon,
    },
  },
};

export const WithoutCallToAction: Story = {
  args: {
    ...Default.args,
    cta: undefined,
  },
};
