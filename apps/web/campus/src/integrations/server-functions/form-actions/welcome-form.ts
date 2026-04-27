import { welcomeFormSchema } from "@repo/utils/zod-schema/welcome-form";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { create__UserServerFn } from "../querry/users";

export const submitWelcomeFormServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(welcomeFormSchema))
  .handler(async ({ data }) => {
    const { phone, email, age, avatarImageUrl, name } = data;

    const newUser = await create__UserServerFn({
      data: {
        age,
        email,
        name,
        uploadedAvatarImageUrl: avatarImageUrl,
        phoneNo: phone.toString(),
      },
    });

    return { newUser };
  });
