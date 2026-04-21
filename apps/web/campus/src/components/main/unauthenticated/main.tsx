import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Main({ ...props }: ComponentProps<"main">) {
  return (
    <main className={cn(`mt-24`, ``, props.className)}>{props.children}</main>
  );
}
