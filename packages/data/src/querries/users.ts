import { db } from "@/index";
import { UserTable } from "@/schema";
import { eq } from "drizzle-orm";

export const getUserDetails = async ({ email }: { email: string }) => {
  const user = (
    await db.select().from(UserTable).where(eq(UserTable.email, email))
  )[0];

  if (!user) return null;

  return user;
};
