import {
  create__ContactMessage,
  read__AllContactMessages,
  read__OneContactMessage,
  update__ContactMessage,
  delete__ContactMessage,
} from "@repo/data/querries/contact-message";
import { createServerFn } from "@tanstack/react-start";
import {
  delete__ContactMessageSchema,
  update__ContactMessageSchema,
  create__ContactMessageSchema,
  read__OneContactMessageSchema,
} from "@repo/utils/zod-schema/data";

export const create__ContactMessageServerFn = createServerFn({ method: "POST" })
  .inputValidator(create__ContactMessageSchema)
  .handler(async ({ data }) => {
    return await create__ContactMessage(data);
  });

export const read__AllContactMessagesServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllContactMessages();
});

export const read__OneContactMessageServerFn = createServerFn({ method: "GET" })
  .inputValidator(read__OneContactMessageSchema)
  .handler(async ({ data }) => {
    return await read__OneContactMessage(data);
  });

export const update__ContactMessageServerFn = createServerFn({ method: "POST" })
  .inputValidator(update__ContactMessageSchema)
  .handler(async ({ data }) => {
    return await update__ContactMessage(data);
  });

export const delete__ContactMessageServerFn = createServerFn({ method: "POST" })
  .inputValidator(delete__ContactMessageSchema)
  .handler(async ({ data }) => {
    return await delete__ContactMessage(data);
  });
