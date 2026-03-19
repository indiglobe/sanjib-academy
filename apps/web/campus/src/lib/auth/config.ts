import { betterAuth } from "better-auth";
import { env } from "@repo/env";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwt",
      refreshCache: true,
    },
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },

  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    },
  },
});
