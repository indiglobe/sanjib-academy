import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

export function FAQ({ ...props }: ComponentProps<typeof Accordion>) {
  return <Accordion {...props} className={cn(``, props.className)} />;
}

export function FAQItem({ ...props }: ComponentProps<typeof AccordionItem>) {
  return <AccordionItem {...props} className={cn(``, props.className)} />;
}

export function FAQQuestion({
  ...props
}: ComponentProps<typeof AccordionTrigger>) {
  return <AccordionTrigger {...props} className={cn(``, props.className)} />;
}

export function FAQAnswer({
  transformingString,
  ...props
}: { transformingString: string } & ComponentProps<typeof AccordionContent>) {
  return (
    <AccordionContent
      {...props}
      className={cn(
        `prose prose-p:text-black/80 dark:prose-p:text-white/80 prose-li:text-black/70 dark:prose-li:text-white/70`,
        props.className,
      )}
    >
      <ReactMarkdown>{transformingString}</ReactMarkdown>
    </AccordionContent>
  );
}
