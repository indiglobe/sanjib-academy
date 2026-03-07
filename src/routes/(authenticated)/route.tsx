import { authMiddleware } from "@/middleware/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BeforeLoadRouterContext } from "@/router";
import { getUserDetailsServerFn } from "@/integrations/server-functions/querry/users";
import { fetchSession } from "@/lib/auth/session";

export const Route = createFileRoute("/(authenticated)")({
  component: RouteComponent,

  beforeLoad: async () => {
    // Verify if the user has a valid session or not
    const session = await fetchSession();

    // If the user doesn't a valid session redirect them to the time sign in page
    if (!session) throw redirect({ to: "/signin" });

    const { user } = session;
    const { email } = user;

    // Switch the user details of the signed in user
    const userDetails = await getUserDetailsServerFn({ data: { email } });

    // Add those details The context to use later
    return { session, userDetails } satisfies BeforeLoadRouterContext;
  },

  server: {
    middleware: [authMiddleware],
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
