import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import { Link } from "@tanstack/react-router";

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link to="/">Documentation</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

const meta: Meta<typeof NavigationMenuDemo> & TypedMetaOptions = {
  component: NavigationMenuDemo,
};

export default meta;

type Story = StoryObj<typeof NavigationMenuDemo>;

export const NavigationMenuDemoStory: Story = {
  args: {},
};
