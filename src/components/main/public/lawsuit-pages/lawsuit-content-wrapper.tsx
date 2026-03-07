import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export default function LawsuitContentWrapper({
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `prose prose-headings:font-semibold prose-a:text-blue-500 prose-a:hover:text-blue-400 prose-a:active:text-blue-600 prose-h2:text-2xl prose-ul:list-disc prose-h2:mb-2 prose-p:text-foreground/70 prose-headings:text-foreground prose-strong:text-foreground prose-lead:text-foreground/60 prose-li:marker:text-foreground prose-li:text-foreground/70 m-auto mx-auto max-w-4xl space-y-8`,
        props.className,
      )}
    />
  );
}
