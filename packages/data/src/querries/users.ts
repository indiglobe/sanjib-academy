import { db } from "@/index";
import { UserTable } from "@/schema";
import { eq, InferInsertModel } from "drizzle-orm";

export type TReadUserDetailsParams = Pick<
  InferInsertModel<typeof UserTable>,
  "email"
>;

export const readUserDetails = async ({ email }: TReadUserDetailsParams) => {
  const user = (
    await db.select().from(UserTable).where(eq(UserTable.email, email))
  )[0];

  if (!user) return null;

  return user;
};

export type TCreateNewUserParams = Omit<
  InferInsertModel<typeof UserTable>,
  "tableIdentifierToken"
>;

export const createNewUser = async (userDetails: TCreateNewUserParams) => {
  await db.insert(UserTable).values(userDetails);

  return { ...userDetails, tableIdentifierToken: "USER" };
};
