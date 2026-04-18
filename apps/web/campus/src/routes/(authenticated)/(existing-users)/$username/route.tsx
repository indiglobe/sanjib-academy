import { BeforeLoadRouterContext } from "@/router";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated)/(existing-users)/$username",
)({
  component: RouteComponent,

  beforeLoad: ({ context }) => {
    const { userDetails } = context;

    if (!userDetails) throw redirect({ to: "/welcome" });

    return { userDetails } satisfies BeforeLoadRouterContext;
  },
});

function RouteComponent() {
  return <Outlet />;
}
