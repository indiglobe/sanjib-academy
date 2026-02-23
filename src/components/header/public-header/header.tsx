import { cn } from "@/utils/cn";
import { Navbar } from "./navbar";
import { ComponentProps } from "react";

export function Header({ ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn(`px-4 sm:px-10 md:px-20 lg:px-30`, ``, props.className)}
    >
      <Navbar />
    </header>
  );
}
