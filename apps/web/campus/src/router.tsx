import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import * as TanstackQuery from "./integrations/tanstack/querry";
import { routeTree } from "./routeTree.gen";
import { fetchSession } from "@/lib/auth/session";
import { getUserDetailsServerFn as getUserDetails } from "@/integrations/server-functions/querry/users";

// -----------------------------
// Types
// -----------------------------
export type AppSession = Awaited<ReturnType<typeof fetchSession>>;
export type AppUserDetails = Awaited<ReturnType<typeof getUserDetails>>;

export interface AppRouterContext {
  queryClient: ReturnType<typeof TanstackQuery.getContext>["queryClient"];
  session: AppSession | null;
  userDetails: AppUserDetails | null;
}

export type BeforeLoadRouterContext = Partial<AppRouterContext>;

// -----------------------------
// Create router
// -----------------------------
export const getRouter = async () => {
  const rqContext = TanstackQuery.getContext();
  const queryClient = rqContext.queryClient;

  // ✅ Proper null-safe assignment
  const session = null;
  const userDetails: AppUserDetails | null = null;

  // Initialise router context
  const context: AppRouterContext = {
    queryClient,
    session,
    userDetails,
  };

  const router = createRouter({
    routeTree,
    context,
    defaultPreload: "intent",
    Wrap: ({ children }) => (
      <TanstackQuery.Provider {...rqContext}>{children}</TanstackQuery.Provider>
    ),
    scrollRestoration: true,
    scrollRestorationBehavior: "instant",
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};
