import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "..";
import { UserTable } from "@/schema";
import {
  create__User,
  delete__User,
  read__AllUsers,
  read__OneUser,
  update__User,
} from "./users";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);
  await db.delete(UserTable);

  const users: (typeof UserTable.$inferInsert)[] = [
    {
      age: 20,
      email: "debobratapurkait25@gmail.com",
      name: "Debobrata Purkait",
      phoneNo: "9876543210",
      uploadedAvatarImageUrl:
        "https://avatars.githubusercontent.com/u/97165289",
      role: "admin",
    },
  ];

  await db.insert(UserTable).values(users);
});

afterAll(async () => {
  await db.delete(UserTable);
  await db.execute(sql`ROLLBACK`);
});

describe("user querries works fine", () => {
  test("creates a new user to the db", async () => {
    // call the querry function
    const insertedUserDetail = await create__User({
      age: 50,
      email: "example@email.com",
      name: "Some Example",
      phoneNo: "9876543210",
      uploadedAvatarImageUrl: "",
    });

    // assert the expected result
    expect(insertedUserDetail).toEqual({
      age: 50,
      email: "example@email.com",
      name: "Some Example",
      phoneNo: "9876543210",
      uploadedAvatarImageUrl: "",
      role: "basic",
      tableIdentifierToken: "USER",
    });

    const [insertedUser] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, "example@email.com"));

    // check if the data is inserted or not
    expect(insertedUser).toEqual({
      age: 50,
      email: "example@email.com",
      name: "Some Example",
      phoneNo: "9876543210",
      uploadedAvatarImageUrl: "",
      role: "basic",
      tableIdentifierToken: "USER",
    });
  });

  test("reads all users from the db", async () => {
    const userList = await read__AllUsers();

    // check if all users querry returns an array
    expect(Array.isArray(userList)).toBe(true);
  });

  test("reads a single existing user from the db", async () => {
    const user = await read__OneUser({
      identifier: { email: "debobratapurkait25@gmail.com" },
    });

    // exactly provides a single user
    expect(user).toEqual({
      age: 20,
      email: "debobratapurkait25@gmail.com",
      name: "Debobrata Purkait",
      phoneNo: "9876543210",
      uploadedAvatarImageUrl:
        "https://avatars.githubusercontent.com/u/97165289",
      role: "admin",
      tableIdentifierToken: "USER",
    });
  });

  test("reads a single non-existing user from the db", async () => {
    const user = await read__OneUser({
      identifier: { email: "debo@gmail.com" },
    });

    // asserts user to be null
    expect(user).toBe(null);
  });

  test("update a user into the db", async () => {
    await update__User({
      identifier: { email: "debobratapurkait25@gmail.com" },
      dataToUpdate: { name: "Debo Purkait" },
    });

    const [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, "debobratapurkait25@gmail.com"));

    expect(user.name).toBe("Debo Purkait");
  });

  test("deletes a user from the db", async () => {
    await delete__User({
      identifier: { email: "debobratapurkait25@gmail.com" },
    });

    const [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, "debobratapurkait25@gmail.com"))
      .limit(1);

    expect(user).not.toBeDefined();
  });
});
