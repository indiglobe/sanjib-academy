import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> & TypedMetaOptions = {
  component: Button,
  args: { children: "Sample Button" },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButtonStory: Story = {
  args: {},
};

export const PrimaryButtonStory: Story = {
  args: { variant: "primary" },
};

export const SecondaryButtonStory: Story = {
  args: { variant: "secondary" },
};

export const AccentButtonStory: Story = {
  args: { variant: "accent" },
};

export const DestructiveButtonStory: Story = {
  args: { variant: "destructive" },
};

export const GhostButtonStory: Story = {
  args: { variant: "ghost" },
};

export const LinkButtonStory: Story = {
  args: { variant: "link" },
};

export const OutlineButtonStory: Story = {
  args: { variant: "outline" },
};
