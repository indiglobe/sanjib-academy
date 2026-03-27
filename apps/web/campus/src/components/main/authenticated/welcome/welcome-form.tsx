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
import lodash from "lodash";
import { ComponentProps, SubmitEvent, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import axios from "axios";
import { UploadResult } from "@/routes/api/upload-image";
import { formatName, generateUserNameFromEmail } from "@repo/utils/utility";

export default function WelcomeForm({ ...props }: ComponentProps<"div">) {
  /**
   *  Get the context value from the route
   */
  const { session } = useRouteContext({
    from: "/(authenticated)/(new-users)/welcome/",
  });
  /**
   * Destructured the context for the value
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
    } satisfies WelcomeFormSchema,
    // run this function on submit of the form
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    // Validate the form fields before submission
    validators: {
      onSubmit: welcomeFormSchema,
    },
  });
  // state related the previewing image
  const [previewImageSrc, setPreviewImageSrc] = useState(image);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const formatedName = formatName(name);

  //
  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    await handleSubmit();
  }

  // When the user uploads their avatar run function
  async function uploadTemporayAvatar(files: FileList | null) {
    if (!files) return;

    // Take the first image as avatar
    const firstAvatarImage = files[0];

    /**
     * Set preview so that the image is visible to the user
     * on when they are selecting an image from their device
     */
    const previewUrl = URL.createObjectURL(firstAvatarImage);
    setPreviewImageSrc(previewUrl);

    /**
     * Form data related to the uploading image
     */
    const formData = new FormData();

    // Generate a request body for the uploading api
    const reqBody = {
      avatar: firstAvatarImage,
      userEmail: generateUserNameFromEmail(email),
    } satisfies WelcomePageAvatarUploadSchema;

    // Populated for data with firm fields according to the request body
    Object.entries(reqBody).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setIsAvatarUploading(true);
    // Send image to the api so taht the backend can upload image
    const res = await axios.post("/api/upload-image", formData);
    setIsAvatarUploading(false);

    // After successful Upload This is the uploaded result
    const uploadResult = res.data as UploadResult;

    // Set Uploaded URL to the Form Field
    if (uploadResult.status === "success") {
      setFieldValue("avatarImageUrl", () => uploadResult.result.secure_url);
    }
  }

  return (
    <div {...props} className={cn(``, props.className)}>
      <h1 className={cn(`flex flex-col py-10`)}>
        <span className={cn(`text-2xl`)}>Hey {formatedName.firstName}!</span>
        <span className={cn(`text-xl`)}>
          👋 Let's get your profile set up so you can get started.
        </span>
      </h1>
      <form
        onSubmit={onSubmit}
        className={cn(`m-auto flex max-w-160 flex-col gap-4`)}
      >
        {/* Avatar section */}
        <div className={cn(`flex gap-4`)}>
          <Field name="avatarImageUrl">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div
                  className={cn(
                    `relative flex w-full flex-col items-center justify-center gap-2`,
                  )}
                >
                  <label htmlFor="avatarImageUrl" className={cn(`relative`)}>
                    <span
                      className={cn(
                        `relative flex size-36 items-center justify-center overflow-clip rounded-full`,
                        {
                          "bg-primary-500":
                            !previewImageSrc || previewImageSrc.length === 0,
                          "border-primary-500 border-2": !(
                            !previewImageSrc || previewImageSrc.length === 0
                          ),
                          "opacity-50": isAvatarUploading,
                        },
                      )}
                    >
                      {!(!previewImageSrc || previewImageSrc.length === 0) && (
                        <Image
                          src={previewImageSrc}
                          alt={`image of ${lodash.kebabCase(name)}`}
                          className={cn(
                            `absolute top-0 left-0 h-full w-full object-cover`,
                          )}
                          layout="fullWidth"
                        />
                      )}

                      {(!previewImageSrc || previewImageSrc.length === 0) && (
                        <LuImagePlus className={cn(`size-20`)} />
                      )}
                    </span>
                  </label>

                  <input
                    type="file"
                    id="avatarImageUrl"
                    accept="image/png, image/gif, image/jpeg"
                    disabled={isAvatarUploading}
                    className={cn(
                      `focus-visible:ring-offset-background absolute -z-1 size-0 h-0 w-0 rounded-sm border border-black p-0 opacity-0 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:focus-visible:ring-white`,
                      {
                        "border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500":
                          errors.length > 0 && isTouched,
                      },
                    )}
                    onChange={async (e) => {
                      await uploadTemporayAvatar(e.target.files);
                    }}
                  />
                  {errors.length > 0 && isTouched && (
                    <span
                      className={cn(
                        `absolute top-full left-0 translate-y-1/10 text-xs text-red-500`,
                      )}
                    >
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </Field>
        </div>
        {/* Avatar section */}

        {/* Email section */}
        <div className={cn(`flex gap-4`)}>
          <Field name="email">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div className={cn(`relative flex w-full flex-col gap-2`)}>
                  <label
                    htmlFor="email"
                    className={cn(
                      `relative after:absolute after:text-xs after:text-red-400 after:content-['*']`,
                    )}
                  >
                    Email:
                  </label>

                  <input
                    type="text"
                    id="email"
                    placeholder=""
                    disabled
                    className={cn(
                      `focus-visible:ring-offset-background rounded-sm border border-black px-3 py-2 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:focus-visible:ring-white`,
                      {
                        "border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500":
                          errors.length > 0 && isTouched,
                      },
                    )}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {errors.length > 0 && isTouched && (
                    <span
                      className={cn(
                        `absolute top-full left-0 translate-y-1/10 text-xs text-red-500`,
                      )}
                    >
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </Field>
        </div>
        {/* Email section */}

        {/* Name section */}
        <div className={cn(`flex gap-4`)}>
          <Field name="name">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div className={cn(`relative flex w-full flex-col gap-2`)}>
                  <label
                    htmlFor="name"
                    className={cn(
                      `relative after:absolute after:text-xs after:text-red-400 after:content-['*']`,
                    )}
                  >
                    Name:
                  </label>

                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className={cn(
                      `focus-visible:ring-offset-background rounded-sm border border-black px-3 py-2 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white dark:focus-visible:ring-white`,
                      {
                        "border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500":
                          errors.length > 0 && isTouched,
                      },
                    )}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {errors.length > 0 && isTouched && (
                    <span
                      className={cn(
                        `absolute top-full left-0 translate-y-1/10 text-xs text-red-500`,
                      )}
                    >
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </Field>
        </div>
        {/* Name section */}

        {/* Age section */}
        <div className={cn(`flex gap-4`)}>
          <Field name="age">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div className={cn(`relative flex w-full flex-col gap-2`)}>
                  <label
                    htmlFor="age"
                    className={cn(
                      `relative after:absolute after:text-xs after:text-red-400 after:content-['*']`,
                    )}
                  >
                    Age:
                  </label>

                  <input
                    type="number"
                    id="age"
                    placeholder="Enter your age"
                    className={cn(
                      `focus-visible:ring-offset-background rounded-sm border border-black px-3 py-2 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white dark:focus-visible:ring-white`,
                      {
                        "border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500":
                          errors.length > 0 && isTouched,
                      },
                    )}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  {errors.length > 0 && isTouched && (
                    <span
                      className={cn(
                        `absolute top-full left-0 translate-y-1/10 text-xs text-red-500`,
                      )}
                    >
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </Field>
        </div>
        {/* Age section */}

        <div className={cn(`ml-auto flex`)}>
          <Button variant={"primary"} type="submit">
            Create profile
          </Button>
        </div>
      </form>
    </div>
  );
}
