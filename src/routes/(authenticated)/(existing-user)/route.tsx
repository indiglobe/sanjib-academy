import { BeforeLoadRouterContext } from "@/router";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(existing-user)")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const { userDetails } = context;

    /**
     * If the user details is null redirect them to the welcome
     * page to finish the welcome stuff
     */
    if (!userDetails) {
      throw redirect({ to: "/welcome" });
    }

    return { userDetails: userDetails } satisfies BeforeLoadRouterContext;
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
