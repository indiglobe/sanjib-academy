// import { authMiddleware } from "@/middleware/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BeforeLoadRouterContext } from "@/router";
import { read__OneUserServerFn } from "@/integrations/server-functions/querry/users";
import { fetchSession } from "@/lib/auth/session";
import { redirectSigninSearchParams } from "@/utils/zod-schema";
import { zodValidator } from "@tanstack/zod-adapter";
// import Sidebar from "@/components/main/authenticated/sidebar";
import { cn } from "@/utils/cn";
import { Main } from "@/components/main/authenticated/main";

export const Route = createFileRoute("/(authenticated)")({
  component: RouteComponent,

  validateSearch: zodValidator(redirectSigninSearchParams),

  beforeLoad: async ({ location }) => {
    // Verify if the user has a valid session or not
    const session = await fetchSession();

    // If the user doesn't a valid session redirect them to the time sign in page
    if (!session)
      throw redirect({
        to: "/signin",
        search: {
          redirectUrl: location.pathname,
          initiator: "authenticated-routes",
        },
      });

    const { user } = session;
    const { email } = user;

    // Switch the user details of the signed in user
    const userDetails = await read__OneUserServerFn({
      data: { identifier: { email } },
    });

    // Add those details The context to use later
    return { session, userDetails } satisfies BeforeLoadRouterContext;
  },
});

function RouteComponent() {
  return (
    <Main className={cn(`flex`)}>
      {/* <Sidebar /> */}
      <Outlet />
    </Main>
  );
}
