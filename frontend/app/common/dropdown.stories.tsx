import type { Meta, StoryObj } from "@storybook/react";

import { Dropdown, DropdownButton } from "./dropdown";
import { GlobeAmericasIcon } from "@heroicons/react/16/solid";

const meta = {
  title: "common/Dropdown",
  component: Dropdown,
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    button: (
      <DropdownButton className="inline-flex w-full items-center gap-x-1.5 text-sm font-semibold text-neutral-900">
        <GlobeAmericasIcon className="h-4" />
        English
      </DropdownButton>
    ),
    children: (
      <>
        <Dropdown.Item>Español</Dropdown.Item>
        <Dropdown.Item>Deutsch</Dropdown.Item>
        <Dropdown.Item>Français</Dropdown.Item>
      </>
    ),
  },
};
