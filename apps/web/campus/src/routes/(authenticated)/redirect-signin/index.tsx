/**
 * This route is for redirection only,
 * No components should be rendered in this route.
 */

import { read__OneUserServerFn } from "@/integrations/server-functions/querry/users";
import {
  redirectSigninSearchParams,
  RedirectSigninSearchParams,
} from "@/utils/zod-schema";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/(authenticated)/redirect-signin/")({
  validateSearch: zodValidator(redirectSigninSearchParams),

  beforeLoad: async ({ search, context }) => {
    const { redirectUrl, requestInitiatedFrom } = search;
    const { session } = context;
    const { user } = session;
    const { email } = user;

    /**
     * after successful sign in fetch userdetails
     */
    const userDetails = await read__OneUserServerFn({
      data: { identifier: { email } },
    });

    /**
     * if there is no userDetails that means the user is a new
     * user and redirect them to welcome page
     */
    if (!userDetails)
      throw redirect({
        to: "/welcome",
        search: { redirectUrl, requestInitiatedFrom },
      });

    type PublicRoutes = RedirectSigninSearchParams["redirectUrl"];

    const publicRoutes = [
      "/",
      "/about-us",
      "/courses",
      "/contact-us",
      "/disclaimer",
      "/terms-and-conditions",
      "/refund-policy",
      "/privacy-policy",
    ] satisfies PublicRoutes[];

    if (!redirectUrl) throw redirect({ to: "/" });

    if (publicRoutes.includes(redirectUrl as any))
      throw redirect({ to: redirectUrl });

    // if (
    //   redirectUrl === "/redirect-signin" &&
    //   initiator === "webinar-register"
    // ) {
    //   const { session } = context;
    //   const { user } = session;
    //   const { email } = user;

    //   const userDetails = await read__OneUserServerFn({ data: { email } });

    //   if (!userDetails) {
    //     throw redirect({ to: "/welcome" });
    //   }
    // }
  },
});
