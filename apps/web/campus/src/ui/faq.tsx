import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { cn } from "@/utils/cn";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { ComponentProps, useRef } from "react";
import ReactMarkdown from "react-markdown";

export function FAQ({ ...props }: ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props} className={cn("w-full space-y-4", props.className)} />
  );
}

export function FAQItem({ ...props }: ComponentProps<typeof AccordionItem>) {
  return (
    <AccordionItem
      {...props}
      className={cn(
        `group data-[state=open]:border-primary/40 rounded-2xl border border-black/10 bg-white/60 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg data-[state=open]:shadow-xl dark:border-white/10 dark:bg-white/5`,
        props.className,
      )}
    />
  );
}

export function FAQQuestion({
  children,
  ...props
}: ComponentProps<typeof AccordionTrigger>) {
  const iconRef = useRef<SVGSVGElement | null>(null);

  useGSAP(() => {
    const el = iconRef.current;
    if (!el) return;

    const parent = el.closest("[data-state]");
    if (!parent) return;

    const observer = new MutationObserver(() => {
      const isOpen = parent.getAttribute("data-state") === "open";

      gsap.to(el, {
        rotate: isOpen ? 180 : 0,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    observer.observe(parent, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <AccordionTrigger
      {...props}
      className={cn(
        `hover:text-primary flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold transition-colors duration-200`,
        props.className,
      )}
    >
      <span>{children}</span>
    </AccordionTrigger>
  );
}

export function FAQAnswer({
  transformingString,
  ...props
}: { transformingString: string } & ComponentProps<typeof AccordionContent>) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = contentRef.current;
    if (!el) return;

    const parent = el.closest("[data-state]");
    if (!parent) return;

    const observer = new MutationObserver(() => {
      const isOpen = parent.getAttribute("data-state") === "open";

      if (isOpen) {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    });

    observer.observe(parent, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <AccordionContent
      {...props}
      className={cn("overflow-hidden px-6 pb-6", props.className)}
    >
      <div
        ref={contentRef}
        className={`prose prose-p:my-2 prose-p:text-black/80 dark:prose-p:text-white/80 prose-li:text-black/70 dark:prose-li:text-white/70 text-sm leading-relaxed text-black/80 dark:text-white/80`}
      >
        <ReactMarkdown>{transformingString}</ReactMarkdown>
      </div>
    </AccordionContent>
  );
}
