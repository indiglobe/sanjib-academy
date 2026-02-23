import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GoogleSigninButton } from "./signin-buttons";
import { cn } from "@/utils/cn";

function GoogleSigninButtonDemo() {
  return (
    <div className={cn(`flex h-svh w-full items-center justify-center`)}>
      <GoogleSigninButton />
    </div>
  );
}

const meta: Meta<typeof GoogleSigninButtonDemo> & TypedMetaOptions = {
  component: GoogleSigninButtonDemo,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof GoogleSigninButtonDemo>;

export const GoogleSigninButtonDemoStory: Story = {
  args: {},
};
