import { cn } from "@/utils/cn";
import { Navbar } from "@/components/header/public-header/navbar";
import { ComponentProps } from "react";

export function Header({ ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn(
        `max-w-svw px-4 sm:px-10 md:px-20 lg:px-30`,
        ``,
        props.className,
      )}
    >
      <Navbar />
    </header>
  );
}
