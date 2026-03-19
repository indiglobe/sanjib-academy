import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { fetchSession } from "@/lib/auth/session";
import { BeforeLoadRouterContext } from "@/router";

export const guestMiddleware = createMiddleware().server(async ({ next }) => {
  // Verify if the user has a valid session or not
  const session = await fetchSession();

  // If they have a validation redirect them to the dashboard,
  // Otherwise go to the next middleware
  if (session) {
    throw redirect({ to: "/dashboard" });
  }

  return await next({
    context: { session: session } satisfies BeforeLoadRouterContext,
  });
});
