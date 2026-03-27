import {
  readProfilesDetail,
  TCreateNewProfiles,
  createNewProfile,
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

export const createNewProfileServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(z.object({ email: z.email() })))
  .handler(async ({ data }) => {
    const { email } = data;

    // return await createNewProfile({ email });
  });
