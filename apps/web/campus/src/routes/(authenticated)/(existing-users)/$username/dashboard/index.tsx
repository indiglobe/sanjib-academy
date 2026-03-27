import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated)/(existing-users)/$username/dashboard/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/(authenticated)/(existing-users)/$username/dashboard/"!</div>
  );
}
