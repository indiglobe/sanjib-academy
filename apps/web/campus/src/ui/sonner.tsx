import { cn } from "@/utils/cn";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ className, ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={cn(`toaster group`, className)}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: cn(
            `border text-sm shadow-sm`,
            `bg-background text-foreground`,
            `border-primary-300/40 dark:border-primary-700/40`,
          ),

          description: cn(`text-foreground/70`),

          actionButton: cn(`bg-primary-500 text-white hover:bg-primary-600`),

          cancelButton: cn(
            `border border-primary-300 dark:border-primary-700 hover:bg-primary-100/40 dark:hover:bg-primary-900/40`,
          ),

          /* -------- SUCCESS -------- */
          success: cn(
            `border-secondary-400/50 dark:border-secondary-700/50`,
            `bg-secondary-50 dark:bg-secondary-950`,
            `text-secondary-900 dark:text-secondary-200`,
          ),

          /* -------- ERROR -------- */
          error: cn(
            `border-primary-500/50 dark:border-primary-600/60`,
            `bg-primary-100 dark:bg-primary-950`,
            `text-primary-900 dark:text-primary-200`,
          ),

          /* -------- WARNING -------- */
          warning: cn(
            `border-accent-400/50 dark:border-accent-700/50`,
            `bg-accent-50 dark:bg-accent-950`,
            `text-accent-900 dark:text-accent-200`,
          ),

          /* -------- INFO -------- */
          info: cn(
            `border-accent-300/50 dark:border-accent-700/50`,
            `bg-accent-50 dark:bg-accent-950`,
            `text-accent-900 dark:text-accent-200`,
          ),
        },
      }}
      style={
        {
          "--border-radius": "0px", // keeping sharp edges (your design rule)
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
