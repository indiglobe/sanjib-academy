import { createServerFn } from "@tanstack/react-start";
import {
  read__AllBenefitedUsers,
  update__BenefitedUser,
  read__OneBenefitedUser,
  delete__BenefitedUser,
  create__BenefitedUser,
} from "@repo/data/querries/benefited-users";
import {
  update__BenefitedUserSchema,
  read__OneBenefitedUserSchema,
  delete__BenefitedUserSchema,
  create__BenefitedUserSchema,
} from "@repo/utils/zod-schema/data";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__BenefitedUserServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(create__BenefitedUserSchema))
  .handler(async ({ data }) => {
    const createdUserDetails = await create__BenefitedUser(data);

    return createdUserDetails;
  });

export const read__AllBenefitedUsersServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const benefitedUsers = await read__AllBenefitedUsers();

  return benefitedUsers;
});

export const read__OneBenefitedUserServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(read__OneBenefitedUserSchema))
  .handler(async ({ data }) => {
    const benefitedUser = await read__OneBenefitedUser(data);

    return benefitedUser;
  });

export const update__BenefitedUserServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(update__BenefitedUserSchema))
  .handler(async ({ data }) => {
    const updateResponse = await update__BenefitedUser(data);

    return updateResponse;
  });

export const delete__BenefitedUserServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(delete__BenefitedUserSchema))
  .handler(async ({ data }) => {
    const deleteResponse = await delete__BenefitedUser(data);

    return deleteResponse;
  });
