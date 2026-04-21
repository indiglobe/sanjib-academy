import { fetchSession } from "@/lib/auth/session";
import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { courseEnrolmentInputValidator } from "@/utils/zod-schema";
import { env } from "@repo/env";
import { readProfilesDetailServerFn } from "@/integrations/server-functions/querry/profile";

/**
 * this middleware checks if the user is signed in or not.
 * if the user is not signed in it redirects the user to the signin page
 */

export const courseEnrolmentMiddleware = createMiddleware({
  type: "function",
}).server(
  async ({
    next,
    // renamed the variable for understanding better among similar names
    data: dataFromServerAction,
  }) => {
    // fetch sessions from the server to check if the use has a valid session or not
    const session = await fetchSession();

    // parse the data for type safety and sanitization
    const parsedData =
      courseEnrolmentInputValidator.safeParse(dataFromServerAction);

    if (parsedData.error) throw Error("Error form `courseEnrolmentMiddleware`");

    let {
      data: { requestInitiatedFrom },
    } = parsedData;

    // Make the requestInitiatedFrom as a full URL with host name
    requestInitiatedFrom = `${env.VITE_APP_HOST}${requestInitiatedFrom}`;

    // if no session that means the user is not signed in
    // so redirect them to the sign in page
    if (!session) {
      throw redirect({
        to: "/signin",
        search: {
          initiator: "course-register",
          redirectUrl: requestInitiatedFrom,
        },
      });
    }

    const {
      user: { email },
    } = session;

    // Verify is the user is present or not
    const profile = await readProfilesDetailServerFn({ data: { email } });

    // If the user is not present she direct them to the welcome page
    if (!profile) {
      throw redirect({ to: "/welcome", search: { requestInitiatedFrom } });
    }

    const {
      data: { amount, courseDetails },
    } = parsedData;

    return await next({ context: { amount, courseDetails, session } });
  },
);
