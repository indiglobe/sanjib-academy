import {
  create__WebinarBuyingProfile,
  read__AllWebinarBuyingProfiles,
  read__OneWebinarBuyingProfile,
  update__WebinarBuyingProfile,
  delete__WebinarBuyingProfile,
} from "@repo/data/querries/webinar-buying-profiles";
import {
  create__WebinarBuyingProfileSchema,
  read__OneWebinarBuyingProfileSchema,
  update__WebinarBuyingProfileSchema,
  delete__WebinarBuyingProfileSchema,
} from "@repo/utils/zod-schema/data";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__WebinarBuyingProfileServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(create__WebinarBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await create__WebinarBuyingProfile(data);
  });

export const read__AllWebinarBuyingProfilesServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllWebinarBuyingProfiles();
});

export const read__OneWebinarBuyingProfileServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__OneWebinarBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await read__OneWebinarBuyingProfile(data);
  });

export const update__WebinarBuyingProfileServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(update__WebinarBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await update__WebinarBuyingProfile(data);
  });

export const delete__WebinarBuyingProfileServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(delete__WebinarBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await delete__WebinarBuyingProfile(data);
  });
