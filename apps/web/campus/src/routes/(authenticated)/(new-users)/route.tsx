import { cn } from "@/utils/cn";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(new-users)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section data-slot={`main-content`} className={cn(`w-full px-4`)}>
      <Outlet />
    </section>
  );
}
