import { betterAuth } from "better-auth";
import { env } from "../env";

export const auth = betterAuth({
  // --- ADDED ---
  baseURL: env.BETTER_AUTH_URL, // tells Better Auth where it lives
  secret: env.BETTER_AUTH_SECRET, // used to sign/encrypt cookies & state
  // --- ADDED ---

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwt", // CHANGED: "jwe" needs extra key setup, use "jwt" for now
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

  // --- ADDED ---
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    },
  },
  // --- ADDED ---
});
