import { readUserDetailsServerFn } from "@/integrations/server-functions/querry/users";
import { fetchSession } from "@/lib/auth/session";
import { BeforeLoadRouterContext } from "@/router";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,

  beforeLoad: async () => {
    // Verify if the user has a valid session or not
    const session = await fetchSession();

    // If the user doesn't have any validation just returned null
    if (!session) return { session } satisfies BeforeLoadRouterContext;

    const { user } = session;
    const { email } = user;

    // As the user does help validation return the user details
    const userDetails = await readUserDetailsServerFn({ data: { email } });

    // Pause the user details for for using later
    return { session, userDetails } satisfies BeforeLoadRouterContext;
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
