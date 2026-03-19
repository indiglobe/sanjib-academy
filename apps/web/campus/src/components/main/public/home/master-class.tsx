import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function MasterClassCard({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `bg-primary-50 border-primary-500 w-full max-w-80 space-y-2 rounded-lg border px-4 py-6`,
        props.className,
      )}
    />
  );
}

export function MasterClassIcon({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `text-primary-500 flex items-center justify-center [&>svg]:size-10`,
        props.className,
      )}
    />
  );
}

export function MasterClassHeading({ ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        `text-primary-500 text-2xl font-bold md:text-3xl lg:text-4xl`,
        props.className,
      )}
    />
  );
}

export function MasterClassContent({ ...props }: ComponentProps<"p">) {
  return <p {...props} className={cn(``, props.className)} />;
}
