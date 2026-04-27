import { betterAuth } from "better-auth";
import { env } from "@repo/env";

const isProd = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  baseURL: env.STORAGE_BETTER_AUTH_URL,
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
      redirectURI: `${env.STORAGE_BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },

  advanced: {
    useSecureCookies: isProd,

    defaultCookieAttributes: {
      httpOnly: true,
      path: "/",

      // ✅ CRITICAL DIFFERENCE
      sameSite: isProd ? "none" : "lax",
      secure: isProd,

      // ✅ ONLY in production
      ...(isProd && {
        domain: ".sanjibacademy.com",
      }),
    },
  },
});
