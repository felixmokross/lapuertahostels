import type { Meta, StoryObj } from "@storybook/react";

import { MaintenanceScreen } from "./maintenance-screen";

const meta = {
  title: "layout/Maintenance Screen",
  component: MaintenanceScreen,
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        aqua: { disable: true },
        azul: { disable: true },
      },
    },
  },
} satisfies Meta<typeof MaintenanceScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Coming soon…",
  },
};
