import { createAuthClient } from "better-auth/react";
import { env } from "@repo/env";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_CAMPUS_APP_HOST,
});
