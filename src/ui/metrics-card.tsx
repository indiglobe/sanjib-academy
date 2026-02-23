import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function MetricsCard({ ...props }: {} & ComponentProps<"span">) {
  return (
    <span
      {...props}
      data-slot={`metrics-card`}
      className={cn(
        `bg-primary-500/25 dark:bg-primary-500/10 text-primary-500 dark:text-foreground border-primary-500 m-auto flex h-full w-full max-w-75 flex-col items-center justify-start gap-y-4 rounded-lg border px-4 py-10 text-center`,
        props.className,
      )}
    />
  );
}

export function MetricsCardHeading({ ...props }: ComponentProps<"span">) {
  return (
    <span
      {...props}
      data-slot={`metrics-card-heading`}
      className={cn(
        `text-2xl font-extrabold md:text-3xl lg:text-4xl`,
        props.className,
      )}
    />
  );
}

export function MetricsCardContent({ ...props }: ComponentProps<"span">) {
  return (
    <span
      {...props}
      data-slot={`metrics-card-content`}
      className={cn(`text-lg md:text-xl`, props.className)}
    />
  );
}
