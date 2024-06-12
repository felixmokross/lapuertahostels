import type { Meta, StoryObj } from "@storybook/react";

import { MaintenanceScreen } from "./maintenance-screen";
import { allModes } from ".storybook/modes";

const meta = {
  title: "layout/Maintenance Screen",
  component: MaintenanceScreen,
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        "locale-es": allModes["locale-es"],
        "locale-de": allModes["locale-de"],
        "locale-fr": allModes["locale-fr"],
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
