import { Footer } from "@/components/footer/public-footer/footer";
import { Header } from "@/components/header/public-header/header";
import { getUserDetailsServerFn } from "@/integrations/server-functions/querry/users";
import { fetchSession } from "@/lib/auth/session";
import { BeforeLoadRouterContext } from "@/router";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (!session) return { session } satisfies BeforeLoadRouterContext;

    const { user } = session;
    const { email } = user;

    const userDetails = await getUserDetailsServerFn({ data: { email } });

    return { session, userDetails } satisfies BeforeLoadRouterContext;
  },
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
