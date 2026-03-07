import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Main({ ...props }: ComponentProps<"main">) {
  return (
    <main
      className={cn(
        `mt-24 px-4 sm:px-10 md:px-20 lg:px-30`,
        ``,
        props.className,
      )}
    >
      {props.children}
    </main>
  );
}
