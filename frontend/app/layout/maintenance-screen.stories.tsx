import type { Meta, StoryObj } from "@storybook/react";

import { MaintenanceScreen } from "./maintenance-screen";
import { plainText } from "~/common/cms-data.builders";

const meta = {
  title: "layout/Maintenance Screen",
  component: MaintenanceScreen,
  argTypes: {},
} satisfies Meta<typeof MaintenanceScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: plainText("Coming soon…"),
  },
};
