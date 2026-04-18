import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import {
  WelcomeFormSchema,
  welcomeFormSchema,
  WelcomePageAvatarUploadSchema,
} from "@repo/utils/zod-schema/welcome-form";
import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ComponentProps, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import axios from "axios";
import { UploadResult } from "@/routes/api/upload-image";
import { formatName, generateUserNameFromEmail } from "@repo/utils/utility";
import { useServerFn } from "@tanstack/react-start";
import { submitWelcomeFormServerFn } from "@/integrations/server-functions/form-actions/welcome-form";

export default function WelcomeForm({ ...props }: ComponentProps<"div">) {
  /**
   *  Get the context values from the route
   */
  const { session } = useRouteContext({
    from: "/(authenticated)/(new-users)/welcome/",
  });
  const submitWelcomeForm = useServerFn(submitWelcomeFormServerFn);

  /**
   * Destructured the contexts for the value
   */
  const {
    user: { email, name, image },
  } = session;

  const { Field, handleSubmit, setFieldValue } = useForm({
    // Initialise default values for the form fields
    defaultValues: {
      email,
      name,
      avatarImageUrl: image ?? "",
      age: 0,
      phone: Number("0000000000"),
    } satisfies WelcomeFormSchema,

    // run this function on submit of the form
    onSubmit: async ({ value }) => {
      const { email, age, avatarImageUrl, name, phone } = value;

      await submitWelcomeForm({
        data: { email, age, name, phone, avatarImageUrl },
      });
    },

    // Validate the form fields before submission
    validators: {
      onSubmit: welcomeFormSchema,
    },
  });

  // state related the previewing image
  const [previewImageSrc, setPreviewImageSrc] = useState(image);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  // an utility function for the name
  const formatedName = formatName(name);

  async function uploadTemporayAvatar(files: FileList | null) {
    if (!files) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setPreviewImageSrc(previewUrl);

    /**
     * Form data related to the uploading image
     */
    const formData = new FormData();

    // Generate a request body for the uploading api
    const reqBody = {
      avatar: file,
      userEmail: generateUserNameFromEmail(email),
    } satisfies WelcomePageAvatarUploadSchema;

    // Generate a request body for the uploading api
    Object.entries(reqBody).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setIsAvatarUploading(true);
    const res = await axios.post("/api/upload-image", formData);
    setIsAvatarUploading(false);

    const uploadResult = res.data as UploadResult;

    if (uploadResult.status === "success") {
      setFieldValue("avatarImageUrl", () => uploadResult.result.secure_url);
    }
  }

  // classname for using in fields
  const inputStyle =
    "rounded-lg border px-3 py-2 text-sm bg-background border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition";

  return (
    <div
      {...props}
      className={cn(
        `flex min-h-svh items-center justify-center px-4 py-8`,
        props.className,
      )}
    >
      {/* Card */}
      <div
        className={cn(
          `border-primary-200 dark:border-primary-800 bg-background/80 w-full max-w-lg space-y-6 rounded-2xl border p-6 shadow-xl backdrop-blur-xl sm:p-8`,
        )}
      >
        {/* Heading */}
        <div className={cn(`space-y-2 text-center`)}>
          <h1 className={cn(`text-2xl font-bold sm:text-3xl`)}>
            Hey {formatedName.firstName} 👋
          </h1>
          <p className={cn(`text-foreground/70 text-sm`)}>
            Let's set up your profile to get started
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
          className={cn(`space-y-5`)}
        >
          {/* Avatar */}
          <div className={cn(`flex justify-center`)}>
            <Field name="avatarImageUrl">
              {() => (
                <label className={cn(`group relative cursor-pointer`)}>
                  <div
                    className={cn(
                      `flex size-28 items-center justify-center overflow-hidden rounded-full transition sm:size-32`,
                      `ring-primary-300 dark:ring-primary-700 ring-2`,
                      {
                        "opacity-50": isAvatarUploading,
                      },
                    )}
                  >
                    {previewImageSrc ? (
                      <Image
                        src={previewImageSrc}
                        alt="avatar"
                        layout="fullWidth"
                        className={cn(`h-full w-full object-cover`)}
                      />
                    ) : (
                      <LuImagePlus className={cn(`text-primary-500 size-10`)} />
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={cn(
                      `absolute inset-0 flex items-center justify-center rounded-full bg-black/30 text-xs text-white opacity-0 transition group-hover:opacity-100`,
                    )}
                  >
                    Change
                  </div>

                  <input
                    type="file"
                    className={cn(`hidden`)}
                    accept="image/*"
                    disabled={isAvatarUploading}
                    onChange={(e) => uploadTemporayAvatar(e.target.files)}
                  />
                </label>
              )}
            </Field>
          </div>

          {/* Email */}
          <Field name="email">
            {(field) => (
              <div className={cn(`flex flex-col gap-1`)}>
                <label className={cn(`text-sm font-medium`)}>Email</label>
                <input
                  disabled
                  value={field.state.value ?? ""}
                  className={cn(inputStyle, `cursor-not-allowed opacity-70`)}
                />
              </div>
            )}
          </Field>
          {/* Email */}

          {/* Name */}
          <Field name="name">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;

              return (
                <div className={cn(`relative flex flex-col gap-1`)}>
                  <label className={cn(`text-sm font-medium`)}>Name</label>
                  <input
                    value={field.state.value ?? ""}
                    placeholder="Jhon Doe"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={cn(inputStyle, {
                      "border-red-500": errors.length && isTouched,
                    })}
                  />
                  {errors.length > 0 && isTouched && (
                    <span
                      className={cn(
                        `absolute top-full left-0 text-xs text-red-500`,
                      )}
                    >
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </Field>
          {/* Name */}

          {/* Age */}
          <Field name="age">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;

              return (
                <div className={cn(`relative flex flex-col gap-1`)}>
                  <label className={cn(`text-sm font-medium`)}>Age</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={field.state.value === 0 ? "" : field.state.value}
                    placeholder="0"
                    onChange={(e) => {
                      const newVal = e.target.value;
                      // If empty, set 0
                      if (newVal === "") {
                        field.handleChange(0);
                      } else {
                        // Convert to number
                        field.handleChange(Number(newVal));
                      }
                    }}
                    className={cn(inputStyle, {
                      "border-red-500": errors.length && isTouched,
                    })}
                  />
                  {errors.length > 0 && isTouched && (
                    <span
                      className={cn(
                        `absolute top-full left-0 text-xs text-red-500`,
                      )}
                    >
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </Field>
          {/* Age */}

          {/* Phone no. */}
          <Field name="phone">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;

              return (
                <div className={cn(`relative flex flex-col gap-1`)}>
                  <label className={cn(`text-sm font-medium`)}>Phone no.</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="9876543210"
                    value={field.state.value === 0 ? "" : field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className={cn(inputStyle, {
                      "border-red-500": errors.length && isTouched,
                    })}
                  />
                  {errors.length > 0 && isTouched && (
                    <span
                      className={cn(
                        `absolute top-full left-0 text-xs text-red-500`,
                      )}
                    >
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </Field>
          {/* Phone no. */}

          {/* Submit */}
          <div className={cn(`pt-2`)}>
            <Button
              variant="primary"
              className={cn(`w-full py-2 text-sm sm:text-base`)}
              type="submit"
            >
              Create Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
