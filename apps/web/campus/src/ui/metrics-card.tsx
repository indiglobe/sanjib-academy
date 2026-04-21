import { ComponentProps } from "react";
import { cn } from "@/utils/cn";

/* Root Card */
export function MetricCard({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `group /* Gradient */ from-primary-500/40 via-accent-500/30 to-secondary-500/40 hover:from-primary-500/70 hover:via-accent-500/50 hover:to-secondary-500/70 relative overflow-hidden rounded-xl border bg-linear-to-br p-px transition-all duration-300`,
        props.className,
      )}
    >
      {props.children}

      {/* Glow */}
      <div
        className={cn(
          `from-primary-500/30 via-accent-500/20 to-secondary-500/30 pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60`,
        )}
      />
    </div>
  );
}

/* Inner Wrapper */
export function MetricCardInner({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `bg-background/95 relative z-10 flex h-full flex-col items-center justify-center rounded-xl px-6 py-10 text-center backdrop-blur transition-all duration-300 group-hover:scale-[1.02]`,
        props.className,
      )}
    />
  );
}

/* Heading */
export function MetricCardValue({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `from-primary-600 via-accent-500 to-secondary-500 dark:from-primary-300 dark:via-accent-400 dark:to-secondary-400 bg-linear-to-r bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl`,
        props.className,
      )}
    />
  );
}

/* Content */
export function MetricCardLabel({ ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        `text-primary-900/80 dark:text-primary-900/80 mt-3 text-sm leading-relaxed`,
        props.className,
      )}
    />
  );
}
