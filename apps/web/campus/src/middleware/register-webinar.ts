import { fetchSession } from "@/lib/auth/session";
import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

export const registerWebinarMiddleware = createMiddleware().server(
  async ({ next }) => {
    const session = await fetchSession();

    if (!session) {
      throw redirect({
        to: "/signin",
        search: {
          initiator: "webinar-register",
          redirectUrl: "/redirect-signin",
        },
      });
    }

    return await next();
  },
);
