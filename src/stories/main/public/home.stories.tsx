import {
  MasterClass,
  OfferedCourses,
} from "@/components/main/public/home/home";
import CenterContentWrapper from "@/integrations/storybook/content-wrapper";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function HomeDemo() {
  return <></>;
}

const meta: Meta<typeof HomeDemo> & TypedMetaOptions = {
  component: HomeDemo,
};

export default meta;

type Story = StoryObj<typeof HomeDemo>;

export const HomeDemoStory: Story = {
  args: {},
};

function OfferedCoursesDemo() {
  return (
    <CenterContentWrapper>
      <OfferedCourses />
    </CenterContentWrapper>
  );
}

type OfferedCoursesStory = StoryObj<typeof OfferedCoursesDemo>;

export const OfferedCoursesDemoStory: OfferedCoursesStory = {
  args: {},
  render: () => <OfferedCoursesDemo />,
};

function MasterClassDemo() {
  return (
    <>
      <MasterClass />
    </>
  );
}

type MasterClassStory = StoryObj<typeof MasterClassDemo>;

export const MasterClassDemoStory: MasterClassStory = {
  args: {},
  render: () => <MasterClassDemo />,
};
