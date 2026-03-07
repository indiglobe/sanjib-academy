import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(new-user)/welcome/")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const { userDetails } = context;

    if (userDetails) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return <></>;
}
