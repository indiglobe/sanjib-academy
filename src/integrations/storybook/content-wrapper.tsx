import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export default function CenterContentWrapper({
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `flex h-svh w-full items-center justify-center`,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
