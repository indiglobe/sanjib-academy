import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/utils/cn/index";

const buttonVariants = cva(
  "focus-visible:ring-offset-background inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-base font-medium whitespace-nowrap transition-all outline-none focus-visible:border-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-red-400 dark:aria-invalid:ring-red-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-background dark:text-foreground hover:bg-primary-400 focus-visible:bg-primary-600 focus-visible:ring-primary-600",
        primary:
          "bg-primary-500 text-background dark:text-foreground hover:bg-primary-400 focus-visible:bg-primary-600 focus-visible:ring-primary-600",
        secondary:
          "bg-secondary-500 text-background dark:text-foreground hover:bg-secondary-400 focus-visible:bg-secondary-600 focus-visible:ring-secondary-600",
        accent:
          "bg-accent-500 dark:text-background text-foreground hover:bg-accent-400 focus-visible:bg-accent-600 focus-visible:ring-accent-600",
        destructive:
          "text-background dark:text-foreground bg-red-500 hover:bg-red-400 focus-visible:bg-red-600 focus-visible:ring-red-600",
        ghost: "hover:bg-background hover:text-foreground",
        outline:
          "bg-background border-foreground border hover:bg-black/20 dark:hover:bg-white/20",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
