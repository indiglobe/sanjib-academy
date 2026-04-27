import { Main } from "@/components/main/authenticated/main";
import { WelcomeOnboarding } from "@/components/main/authenticated/welcome/welcome-onbording";
import { fetchSession } from "@/lib/auth/session";
import { formatName } from "@repo/utils/utility";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(new-users)/welcome/")({
  component: RouteComponent,

  head: async () => {
    const session = await fetchSession();

    if (!session) {
      return { meta: [{ title: "Welcome | Sanjib Academy" }] };
    }

    const {
      user: { name },
    } = session;

    return { meta: [{ title: `Welcome ${formatName(name).firstName}` }] };
  },
});

function RouteComponent() {
  return (
    <Main>
      <WelcomeOnboarding />
    </Main>
  );
}
