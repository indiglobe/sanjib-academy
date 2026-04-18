import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import AdminLayout from "./collapsible-sidebar";

const meta: Meta<typeof AdminLayout> & TypedMetaOptions = {
  component: AdminLayout,
};

export default meta;

type Story = StoryObj<typeof AdminLayout>;

export const AdminLayoutStory: Story = {
  args: {},
};
