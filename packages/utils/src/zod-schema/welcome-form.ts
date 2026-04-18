import z from "zod";

export const welcomeFormSchema = z.object({
  email: z.email("Please provide valid email."),
  name: z.string().min(3, "Name is too small."),
  avatarImageUrl: z.url("Provide a valid url"),
  age: z
    .number()
    .min(18, "Minimum age has to be 18.")
    .max(150, "Age cannot be more than 150"),
  phone: z.number().refine((value) => {
    return value.toString().length === 10;
  }, "Phone no. has to be exactly 10 digit."),
});

export type WelcomeFormSchema = z.infer<typeof welcomeFormSchema>;

const MAX_UPLOAD_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const welcomePageAvatarUploadSchema = z.object({
  avatar: z
    .instanceof(File, { message: "File is required." })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max file size is 3MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .png, .jpeg, and .jpg formats are supported.",
    ),
  userEmail: z.string(),
});

export type WelcomePageAvatarUploadSchema = z.infer<
  typeof welcomePageAvatarUploadSchema
>;
