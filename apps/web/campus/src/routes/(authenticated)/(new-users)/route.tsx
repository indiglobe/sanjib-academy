import { BeforeLoadRouterContext } from "@/router";
import { cn } from "@/utils/cn";
import { generateUserNameFromEmail } from "@repo/utils/utility";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(new-users)")({
  component: RouteComponent,

  beforeLoad: ({ context }) => {
    const { userDetails } = context;

    if (userDetails) {
      throw redirect({
        to: "/$username/dashboard",
        params: { username: generateUserNameFromEmail(userDetails.email) },
      });
    }

    return { userDetails } satisfies BeforeLoadRouterContext;
  },
});

function RouteComponent() {
  return (
    <section data-slot={`main-content`} className={cn(`w-full px-4`)}>
      <Outlet />
    </section>
  );
}
