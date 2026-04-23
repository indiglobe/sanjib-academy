import { createServerFn } from "@tanstack/react-start";
import {
  read__AllUsers,
  create__User,
  delete__User,
  read__OneUser,
  update__User,
} from "@repo/data/querries/users";
import {
  create__UserSchema,
  delete__UserSchema,
  update__UserSchema,
  read__OneUserSchema,
} from "@repo/utils/zod-schema/data";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__UserServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__UserSchema))
  .handler(async ({ data }) => {
    return await create__User(data);
  });

export const read__AllUsersServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllUsers();
});

export const read__OneUserServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneUserSchema))
  .handler(async ({ data }) => {
    return await read__OneUser(data);
  });

export const update__UserServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__UserSchema))
  .handler(async ({ data }) => {
    return await update__User(data);
  });

export const delete__UserServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__UserSchema))
  .handler(async ({ data }) => {
    return await delete__User(data);
  });
