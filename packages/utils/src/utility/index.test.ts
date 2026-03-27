import { generateUserNameFromEmail, formatName } from "./index";
import { test, expect, describe } from "vitest";

describe.skip("generates username corrctly", () => {
  test('"example@email.com" returns "example"', () => {
    expect(generateUserNameFromEmail("example@email.com")).toBe("example");
  });

  test('"some.example@email.com" returns "some.example"', () => {
    expect(generateUserNameFromEmail("some.example@email.com")).toBe(
      "some.example",
    );
  });

  test('"some.example1@email.com" returns "some.example1"', () => {
    expect(generateUserNameFromEmail("some.example1@email.com")).toBe(
      "some.example1",
    );
  });
});

describe("formatName returns correct data", () => {
  test("simple name", () => {
    expect(formatName("Jhon Doe")).toEqual({
      firstName: "Jhon",
      lastName: "Doe",
    });
  });

  test("name with Mr.", () => {
    expect(formatName("Mr. Jhon Doe")).toEqual({
      firstName: "Jhon",
      lastName: "Doe",
    });
  });

  test("name with Mrs.", () => {
    expect(formatName("Mrs. Jane Smith")).toEqual({
      firstName: "Jane",
      lastName: "Smith",
    });
  });

  test("name with Ms.", () => {
    expect(formatName("Ms. Jane Smith")).toEqual({
      firstName: "Jane",
      lastName: "Smith",
    });
  });

  test("name with Dr.", () => {
    expect(formatName("Dr. Jane Smith")).toEqual({
      firstName: "Jane",
      lastName: "Smith",
    });
  });

  test("name with MD.", () => {
    expect(formatName("MD. Jane Smith")).toEqual({
      firstName: "Jane",
      lastName: "Smith",
    });
  });

  test("name with Mr. and middle name", () => {
    expect(formatName("Mr. Jhon Alex Doe")).toEqual({
      firstName: "Jhon",
      lastName: "Doe",
    });
  });
});
