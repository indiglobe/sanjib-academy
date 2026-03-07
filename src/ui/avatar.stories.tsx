import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./avatar";
import { ComponentProps } from "react";
import CenterContentWrapper from "@/integrations/storybook/content-wrapper";
import { PlusIcon } from "lucide-react";

function AvatarDemo({
  size,
  showIcon,
  showBadge,
  showImageAvatar,
}: Pick<ComponentProps<typeof Avatar>, "size"> & {
  showImageAvatar: boolean;
  showBadge: boolean;
  showIcon: boolean;
}) {
  return (
    <CenterContentWrapper>
      <Avatar size={size}>
        <AvatarImage
          src={showImageAvatar ? "https://github.com/shadcn.png" : undefined}
          alt="@shadcn"
          className="grayscale"
        />
        <AvatarFallback>CN</AvatarFallback>
        {showBadge && <AvatarBadge>{showIcon && <PlusIcon />}</AvatarBadge>}
      </Avatar>
    </CenterContentWrapper>
  );
}

const meta: Meta<typeof AvatarDemo> & TypedMetaOptions = {
  component: AvatarDemo,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg", undefined],
    },
    showImageAvatar: {
      control: "boolean",
    },
    showBadge: {
      control: "boolean",
    },
    showIcon: {
      control: "boolean",
    },
  },
  args: {
    size: "default",
    showImageAvatar: true,
    showBadge: true,
    showIcon: true,
  },
};

export default meta;

type Story = StoryObj<typeof AvatarDemo>;

export const WithoutImage: Story = {
  args: {},
};
