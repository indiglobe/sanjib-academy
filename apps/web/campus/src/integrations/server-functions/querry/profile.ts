import {
  createNewProfile,
  readProfilesDetail,
  TCreateNewProfilesParams,
} from "@repo/data/querries/profile";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const readProfilesDetailServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(z.object({ email: z.email() })))
  .handler(async ({ data }) => {
    const { email } = data;

    return await readProfilesDetail({ email });
  });

export const createNewProfileServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(z.custom<TCreateNewProfilesParams>()))
  .handler(async ({ data }) => {
    const { email, age, phoneNo } = data;

    return await createNewProfile({ email, age, phoneNo: phoneNo.toString() });
  });
