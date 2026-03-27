import { db } from "@/index";
import { ProfileTable } from "@/schema";
import { eq, InferInsertModel } from "drizzle-orm";

export type TReadProfilesDetailParams = { email: string };

export async function readProfilesDetail({ email }: TReadProfilesDetailParams) {
  const profiles = await db
    .select()
    .from(ProfileTable)
    .where(eq(ProfileTable.profileOf, email));

  if (profiles.length === 0) return null;

  return profiles[0];
}

export type TCreateNewProfilesParams = Omit<
  InferInsertModel<typeof ProfileTable>,
  "tableIdentifierToken" | "profileOf"
> & {
  email: Pick<InferInsertModel<typeof ProfileTable>, "profileOf">["profileOf"];
};

export async function createNewProfile({
  email,
  ...rest
}: TCreateNewProfilesParams) {
  await db.insert(ProfileTable).values({ profileOf: email, ...rest });

  return {
    ...rest,
    profileOf: email,
    role: rest.role ?? "basic",
  };
}
