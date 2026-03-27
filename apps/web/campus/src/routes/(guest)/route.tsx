import { fetchSession } from "@/lib/auth/session";
import { generateUserNameFromEmail } from "@repo/utils/utility";
// import { guestMiddleware } from "@/middleware/guest";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)")({
  component: RouteComponent,

  beforeLoad: async ({ context: {} }) => {
    // Verify if the user has a valid session or not
    const session = await fetchSession();

    // If the user has a valid session redirect them to the dashboard
    if (session)
      throw redirect({
        to: "/$username/dashboard",
        params: { username: generateUserNameFromEmail(session.user.email) },
      });
  },

  // server: {
  //   middleware: [guestMiddleware],
  // },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
