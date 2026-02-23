import { authMiddleware } from "@/middleware/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BeforeLoadRouterContext } from "@/router";
import { getUserDetailsServerFn } from "@/integrations/server-functions/querry/users";
import { fetchSession } from "@/lib/auth/session";

export const Route = createFileRoute("/(authenticated)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (!session) throw redirect({ to: "/signin" });

    const { user } = session;
    const { email } = user;

    const userDetails = await getUserDetailsServerFn({ data: { email } });

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
