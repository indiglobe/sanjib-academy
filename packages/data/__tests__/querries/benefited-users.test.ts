import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { UserTable, BenefitedUserTable } from "@/schema";
import {
  create__BenefitedUser,
  read__AllBenefitedUsers,
  read__OneBenefitedUser,
  update__BenefitedUser,
  delete__BenefitedUser,
} from "@/querries/benefited-users";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);
  // clean both tables (order matters due to FK)
  await db.delete(BenefitedUserTable);

  await db.insert(UserTable).values([
    {
      email: "user1@email.com",
      age: 82,
      name: "User One",
      phoneNo: "8585858585",
      uploadedAvatarImageUrl: "https://example.com/avatar1.png",
    },
    {
      email: "user2@email.com",
      age: 82,
      name: "User Two",
      phoneNo: "8585858585",
      uploadedAvatarImageUrl: "",
    },
  ]);

  await db
    .insert(BenefitedUserTable)
    .values([{ userEmail: "user2@email.com" }]);
});

afterAll(async () => {
  await db.delete(BenefitedUserTable);
  await db.execute(sql`ROLLBACK`);
});

describe("benefited user queries works fine", () => {
  test("creates a new benefited user", async () => {
    const result = await create__BenefitedUser({
      email: "user1@email.com",
    });

    expect(result).toEqual({
      userEmail: "user1@email.com",
      tableIdentifierToken: "BUSR",
    });

    const [row] = await db
      .select()
      .from(BenefitedUserTable)
      .where(eq(BenefitedUserTable.userEmail, "user1@email.com"));

    expect(row).toEqual({
      userEmail: "user1@email.com",
      tableIdentifierToken: "BUSR",
      benefitedSince: null,
    });
  });

  test("reads all benefited users", async () => {
    const users = await read__AllBenefitedUsers();

    expect(Array.isArray(users)).toBe(true);
  });

  test("reads a One existing benefited user", async () => {
    const user = await read__OneBenefitedUser({
      identifier: { email: "user1@email.com" },
    });

    expect(user).toEqual({
      name: "User One",
      email: "user1@email.com",
      imageUrl: "https://example.com/avatar1.png",
      userTableIdentifierToken: "USER",
      benefitedUserTableIdentifierToken: "BUSR",
      benefitedSince: null,
    });
  });

  test("reads a non-existing benefited user", async () => {
    const user = await read__OneBenefitedUser({
      identifier: { email: "notfound@email.com" },
    });

    expect(user).toBe(null);
  });

  test("updates a benefited user (email change)", async () => {
    const _5YearsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 5);
    _5YearsAgo.setMilliseconds(0);

    await update__BenefitedUser({
      identifier: { email: "user1@email.com" },
      dataToUpdate: {
        benefitedSince: _5YearsAgo,
      },
    });

    const [row] = await db
      .select()
      .from(BenefitedUserTable)
      .where(eq(BenefitedUserTable.userEmail, "user1@email.com"));

    expect(new Date(row.benefitedSince!.getTime())).toEqual(
      new Date(_5YearsAgo),
    );
  });

  test("deletes a benefited user", async () => {
    await delete__BenefitedUser({
      identifier: { email: "updated@email.com" },
    });

    const [row] = await db
      .select()
      .from(BenefitedUserTable)
      .where(eq(BenefitedUserTable.userEmail, "updated@email.com"))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
