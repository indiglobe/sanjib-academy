import { useSidebarState } from "@/hooks/use-sidebar-state";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Main({ ...props }: ComponentProps<"main">) {
  const { isSidebarCollapsed } = useSidebarState();
  return (
    <main
      {...props}
      className={cn(
        `px-0 transition-all duration-300 ${isSidebarCollapsed ? "pl-17.5" : "pl-62.5"}`,
        props.className,
      )}
    />
  );
}
