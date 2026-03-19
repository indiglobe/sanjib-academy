import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import CenterContentWrapper from "@/integrations/storybook/content-wrapper";

function AccordionDemo() {
  return (
    <CenterContentWrapper>
      <Accordion
        type="single"
        collapsible
        defaultValue="shipping"
        className="w-full"
      >
        <AccordionItem value="shipping">
          <AccordionTrigger>What are your shipping options?</AccordionTrigger>
          <AccordionContent>
            We offer standard (5-7 days), express (2-3 days), and overnight
            shipping. Free shipping on international orders.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            Returns accepted within 30 days. Items must be unused and in
            original packaging. Refunds processed within 5-7 business days.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>
            How can I contact customer support?
          </AccordionTrigger>
          <AccordionContent>
            Reach us via email, live chat, or phone. We respond within 24 hours
            during business days.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CenterContentWrapper>
  );
}

const meta: Meta<typeof AccordionDemo> & TypedMetaOptions = {
  component: AccordionDemo,
};

export default meta;

type Story = StoryObj<typeof AccordionDemo>;

export const AccordionDemoStory: Story = {
  args: {},
};
