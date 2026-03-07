import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { SigninSearchParams } from "@/routes/(guest)/signin/index";
import { fetchSession } from "@/lib/auth/session";
import { BeforeLoadRouterContext } from "@/router";
import { getUserDetailsServerFn } from "@/integrations/server-functions/querry/users";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getRequest();
  // Truth is if the user has a valid session or not
  const session = await fetchSession();

  // Keep the user doesn't have a valid session redirect them to the sign in page
  if (!session) {
    throw redirect({
      to: "/signin",
      search: {
        callbackUrl: request.url,
      } satisfies SigninSearchParams,
    });
  }

  // Add the session to the context to use later
  return await next({
    context: { session: session } satisfies BeforeLoadRouterContext,
  });
});

export const checkExistingUserMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    const { session } = context;
    const { user } = session;
    const { email } = user;

    const userDetails = await getUserDetailsServerFn({ data: { email } });

    if (!userDetails) {
      throw redirect({ to: "/welcome" });
    }

    return await next({
      context: {
        session: session,
        userDetails: userDetails,
      } satisfies BeforeLoadRouterContext,
    });
  });

export const checkNewUserMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    const { session } = context;
    const { user } = session;
    const { email } = user;

    const userDetails = await getUserDetailsServerFn({ data: { email } });

    if (userDetails) {
      throw redirect({ to: "/dashboard" });
    }

    return await next({
      context: {
        session: session,
        userDetails: userDetails,
      } satisfies BeforeLoadRouterContext,
    });
  });
