import { BeforeLoadRouterContext } from "@/router";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(new-user)/router")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const { userDetails } = context;
    if (userDetails === null) {
      return { userDetails } satisfies BeforeLoadRouterContext;
    }

    throw redirect({ to: "/" });
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
