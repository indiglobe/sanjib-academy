import { BeforeLoadRouterContext } from "@/router";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(new-user)/router")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const { userDetails } = context;

    // If there is a return season null go forward
    if (userDetails === null) {
      return { userDetails } satisfies BeforeLoadRouterContext;
    }

    /**
     * If there is a user details that means, the user is already done
     * welcome stuff, so no need to go to the welcome page and
     * redirect them to the dashboard page
     */
    throw redirect({ to: "/dashboard" });
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
