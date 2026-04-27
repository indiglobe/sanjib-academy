import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Main({ ...props }: ComponentProps<"main">) {
  return (
    <main
      {...props}
      className={cn(`px-0 transition-all duration-300`, props.className)}
    />
  );
}
