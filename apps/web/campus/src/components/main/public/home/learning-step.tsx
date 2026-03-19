import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function LearningStep({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `border-primary-500 relative max-w-80 space-y-4 rounded-2xl border px-4 py-6 pt-10`,
        props.className,
      )}
    />
  );
}

export function LearningStepCount({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `border-primary-500 text-primary-500 bg-primary-50 absolute top-0 left-6 -translate-y-1/2 rounded-full border px-4 py-1 text-xs font-semibold`,
        props.className,
      )}
    />
  );
}

export function LearningStepHeading({ ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(`text-primary-500 text-2xl font-semibold`, props.className)}
    />
  );
}

export function LearningStepDetails({ ...props }: ComponentProps<"p">) {
  return <p {...props} className={cn(`text-foreground/60`, props.className)} />;
}
