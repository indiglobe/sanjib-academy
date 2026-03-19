import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HorizontalCarousel,
  HorizontalCarouselContent,
  HorizontalCarouselItem,
  HorizontalCarouselNext,
  HorizontalCarouselPrevious,
} from "./horizontal-carousel";
import CenterContentWrapper from "@/integrations/storybook/content-wrapper";
import { cn } from "@/utils/cn";

function CarouselDemo() {
  return (
    <CenterContentWrapper>
      <div className={cn(`bg-primary-50 w-full max-w-200`)}>
        <HorizontalCarousel
          opts={{
            align: "start",
          }}
          className="bg-primary-500 w-full"
        >
          <HorizontalCarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <HorizontalCarouselItem key={index} className="basis-full">
                <div className="bg-accent-500 p-10">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </HorizontalCarouselItem>
            ))}
          </HorizontalCarouselContent>
          <HorizontalCarouselPrevious />
          <HorizontalCarouselNext />
        </HorizontalCarousel>
      </div>
    </CenterContentWrapper>
  );
}

const meta: Meta<typeof CarouselDemo> & TypedMetaOptions = {
  component: CarouselDemo,
};

export default meta;

type Story = StoryObj<typeof CarouselDemo>;

export const CarouselDemoStory: Story = {
  args: {},
};
