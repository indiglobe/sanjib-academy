import { fetchSession } from "@/lib/auth/session";
import { createMiddleware } from "@tanstack/react-start";

export const middleware__isUserSigninedIn = createMiddleware().server(
  async ({ next }) => {
    const session = await fetchSession();

    if (!session) {
      return await next({ context: { userSignnedIn: false } });
    }

    return await next({ context: { userSignnedIn: true } });
  },
);
