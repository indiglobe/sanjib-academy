import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const getUserDetailsServerFn = createServerFn()
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data: { email } }) => {
    const user = (
      await db.select().from(UserTable).where(eq(UserTable.email, email))
    )[0];

    if (!user) return null;

    return user;
  });
