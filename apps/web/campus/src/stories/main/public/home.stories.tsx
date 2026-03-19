import {
  MasterClass,
  OfferedCourses,
  OurMethod,
  Testimonials,
} from "@/components/main/public/home/home";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import { cn } from "@/utils/cn";
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
    <>
      <OfferedCourses />
    </>
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

function OurMethodDemo() {
  return (
    <div className={cn(`px-4 sm:px-10 md:px-20 lg:px-30`)}>
      <OurMethod />
    </div>
  );
}

type OurMethodStory = StoryObj<typeof OurMethodDemo>;

export const OurMethodDemoStory: OurMethodStory = {
  args: {},
  render: () => <OurMethodDemo />,
};

function TestimonialsDemo() {
  return (
    <div className={cn(`px-4 sm:px-10 md:px-20 lg:px-30`)}>
      <Testimonials />
    </div>
  );
}

type TestimonialsStory = StoryObj<typeof TestimonialsDemo>;

export const TestimonialsDemoStory: TestimonialsStory = {
  args: {},
  render: () => <TestimonialsDemo />,
};
