import { fetchSession } from "@/lib/auth/session";
import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { read__OneUserServerFn } from "@/integrations/server-functions/querry/users";
import { registerForWebinarInputValidator } from "@/utils/zod-schema";
import { zodValidator } from "@tanstack/zod-adapter";

export const middleware__registerWebinar = createMiddleware({
  type: "function",
})
  .inputValidator(zodValidator(registerForWebinarInputValidator))
  .server(async ({ next, data }) => {
    const session = await fetchSession();
    /**
     * If there is no session that means the user is not signed in
     */
    if (!session) {
      throw redirect({
        to: "/signin",
        search: {
          initiator: "webinar-register",
          redirectUrl: "/redirect-signin",
        },
      });
    }
    /**
     * As the user is check if the user in the database or not
     */
    const user = await read__OneUserServerFn({
      data: { identifier: { email: session.user.email } },
    });
    /**
     * As the user is not in database redirect them in the welcome page
     */
    if (!user) {
      const { requestInitiatedFrom } = data;
      throw redirect({ to: "/welcome", search: { requestInitiatedFrom } });
    }
    return await next({ context: { session } });
  });
