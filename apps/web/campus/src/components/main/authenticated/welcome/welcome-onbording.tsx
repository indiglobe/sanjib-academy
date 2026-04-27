import { ChangeEvent, ComponentProps, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import {
  Link,
  redirect,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { submitWelcomeFormServerFn } from "@/integrations/server-functions/form-actions/welcome-form";
import {
  welcomeFormSchema,
  WelcomeFormSchema,
} from "@repo/utils/zod-schema/welcome-form";
import { useForm } from "@tanstack/react-form";
import { ChevronDown, ChevronUp, Upload } from "lucide-react";
import { Image } from "@unpic/react";
import { Button } from "@/ui/button";

export function WelcomeOnboarding({
  className,
  ...props
}: ComponentProps<"section">) {
  const { requestInitiatedFrom: requestInitiatedFromUrl } = useSearch({
    from: "/(authenticated)/(new-users)/welcome/",
  });
  /**
   *  Get the context values from the route
   */
  const { session } = useRouteContext({
    from: "/(authenticated)/(new-users)/welcome/",
  });
  /**
   * Wrapper around submitWelcomeFormServerFn to use in client
   */
  const submitWelcomeForm = useServerFn(submitWelcomeFormServerFn);

  /**
   * Destructured the contexts for the value
   */
  const {
    user: { email, name, image },
  } = session;

  // save the initialImageUrl to se when the user rests avatart imaeg
  const initialImageValue = useRef(image ?? "");
  const fileInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [file, setFile] = useState<File | null>(null);

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

      /**
       * If welcome form is shown because of some actions there should be
       * some URL as search params
       */
      if (requestInitiatedFromUrl) {
        redirect({ to: requestInitiatedFromUrl });
      }
    },

    // Validate the form fields before submission
    validators: {
      onSubmit: welcomeFormSchema,
    },

    formId: "welcome-form",
  });

  function handleAvatarFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];

      // calculate file size in megabyte
      const fileSizeInMB = file.size / 1024 / 1024;

      if (fileSizeInMB > 5) {
        console.log("too large");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setFile(file);

      setFieldValue("avatarImageUrl", previewUrl);
    }
  }

  return (
    <section
      {...props}
      className={cn(`relative w-full overflow-hidden`, className)}
      data-slot={`welcome-onboarding`}
    >
      {/* Background Layer */}
      <div
        className={cn(
          `from-primary-500/50 via-background to-primary-500/5 dark:from-primary-50 dark:via-background dark:to-accent-50/5 absolute inset-0 -z-10 bg-linear-to-br`,
        )}
      />
      <div
        className={cn(
          `from-primary-500/20 via-accent-500/10 to-secondary-500/20 absolute inset-0 -z-10 bg-linear-to-tr opacity-40 blur-2xl`,
        )}
      />

      <div
        className={cn(`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24`)}
      >
        <div
          className={cn(
            `grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center`,
          )}
        >
          {/* -------- LEFT SIDE -------- */}
          <div className={cn(`flex flex-col gap-6`)}>
            <h1
              className={cn(
                `text-primary-700 dark:text-primary-600 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl`,
              )}
            >
              Learn Trading with Structure — Not Guesswork
            </h1>

            <p
              className={cn(`text-foreground/70 max-w-lg text-sm sm:text-base`)}
            >
              Join SANJIB ACADEMY and learn how markets actually move. No
              shortcuts. No noise. Just clear frameworks, live sessions, and
              practical execution.
            </p>

            {/* Key Points */}
            <div className={cn(`flex flex-col gap-3 pt-2`)}>
              {[
                "Institutional-level concepts simplified",
                "Live + recorded structured classes",
                "Real market execution strategies",
              ].map((item) => (
                <div
                  key={item}
                  className={cn(
                    `text-foreground/80 flex items-center gap-3 text-sm`,
                  )}
                >
                  <span className={cn(`h-2 w-2 rounded-full bg-green-500`)} />
                  {item}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={cn(`mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3`)}>
              {[
                { label: "Students", value: "100+" },
                { label: "Sessions", value: "50+" },
                { label: "Satisfaction", value: "95%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    `border-primary-300/40 dark:border-primary-700/40 bg-background border px-4 py-3 text-center`,
                  )}
                >
                  <p
                    className={cn(
                      `text-primary-600 dark:text-primary-300 text-lg font-semibold`,
                    )}
                  >
                    {item.value}
                  </p>
                  <p className={cn(`text-foreground/60 text-xs`)}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* -------- RIGHT FORM -------- */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleSubmit();
            }}
            className={cn(
              `border-primary-300/40 dark:border-primary-700/40 bg-background flex flex-col gap-4 border p-6`,
            )}
          >
            <h2 className={cn(`text-foreground text-lg font-semibold`)}>
              Get Started
            </h2>

            <Field name="avatarImageUrl">
              {(field) => {
                const hasImage = !!field.state.value;

                return (
                  <div className={cn("flex flex-col items-center gap-3")}>
                    {/* Avatar Preview */}
                    <div className="group relative">
                      <div
                        className={cn(
                          "bg-primary-500/10 ring-primary-300 dark:ring-primary-700 flex size-24 items-center justify-center overflow-hidden rounded-full ring-2 transition sm:size-28",
                          {
                            "opacity-100": file,
                          },
                        )}
                      >
                        {hasImage ? (
                          <Image
                            src={field.state.value}
                            alt="avatar"
                            layout="fullWidth"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Upload className="text-primary-500 size-6" />
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <label
                        htmlFor="avatar"
                        className={cn(
                          "absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-xs text-white opacity-0 transition group-hover:opacity-100",
                        )}
                      >
                        Change
                      </label>
                    </div>

                    {/* Hidden Input */}
                    <input
                      ref={fileInputRef}
                      id="avatar"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleAvatarFileChange(e)}
                      className="hidden"
                    />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Upload */}
                      <Button
                        variant={"primary"}
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className={cn("rounded-none text-xs")}
                      >
                        Upload Photo
                      </Button>

                      {/* Reset */}
                      {initialImageValue.current && (
                        <Button
                          variant={"outline"}
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              "avatarImageUrl",
                              initialImageValue.current,
                            )
                          }
                          className={cn(
                            "rounded-none border-yellow-500 text-xs",
                          )}
                        >
                          Reset
                        </Button>
                      )}

                      {/* Remove */}
                      {hasImage && (
                        <Button
                          variant={"outline"}
                          type="button"
                          onClick={() => setFieldValue("avatarImageUrl", "")}
                          className={cn("rounded-none border-red-500 text-xs")}
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    {/* Helper Text */}
                    <p className="text-foreground/50 text-center text-xs">
                      JPG, PNG or WebP. Max 5MB. Recommended 400x400px.
                    </p>
                  </div>
                );
              }}
            </Field>

            <Field name="name">
              {(field) => {
                const {
                  state: {
                    meta: { errors, isTouched },
                  },
                } = field;

                return (
                  <div className={cn(`relative flex flex-col gap-1`)}>
                    <label htmlFor="name" className={cn(`text-sm font-medium`)}>
                      Name
                    </label>
                    <input
                      id="name"
                      value={field.state.value ?? ""}
                      placeholder="Jhon Doe"
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(
                        `border-primary-300 dark:border-primary-700 focus:border-primary-500 focus-visible:ring-primary-500 focus-visible:ring-offset-background border bg-transparent px-3 py-2 text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
                        {
                          "border-red-500": errors.length && isTouched,
                        },
                      )}
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

            <Field name="email">
              {(field) => (
                <div className={cn(`flex flex-col gap-1`)}>
                  <label htmlFor="email" className={cn(`text-sm font-medium`)}>
                    Email
                  </label>
                  <input
                    id="email"
                    disabled
                    value={field.state.value ?? ""}
                    className={cn(
                      `border-primary-300 dark:border-primary-700 focus:border-primary-500 focus-visible:ring-primary-500 focus-visible:ring-offset-background border bg-transparent px-3 py-2 text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
                    )}
                  />
                </div>
              )}
            </Field>

            <Field name="phone">
              {(field) => {
                const {
                  state: {
                    meta: { errors, isTouched },
                  },
                } = field;

                return (
                  <div className={cn(`relative flex flex-col gap-1`)}>
                    <label
                      htmlFor="phone"
                      className={cn(`text-sm font-medium`)}
                    >
                      Phone no.
                    </label>
                    <input
                      id="phone"
                      type="text"
                      inputMode="numeric"
                      placeholder="9876543210"
                      value={field.state.value === 0 ? "" : field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className={cn(
                        "border-primary-300 dark:border-primary-700 focus:border-primary-500 focus-visible:ring-primary-500 focus-visible:ring-offset-background border bg-transparent px-3 py-2 text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        {
                          "border-red-500": errors.length && isTouched,
                        },
                      )}
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

            <Field name="age">
              {(field) => {
                const {
                  state: {
                    value,
                    meta: { errors, isTouched },
                  },
                } = field;

                const safeValue = typeof value === "number" ? value : 0;

                return (
                  <div className="relative flex flex-col gap-1">
                    <label htmlFor="age" className="text-sm font-medium">
                      Age
                    </label>

                    <div
                      className={cn(
                        "border-primary-300 dark:border-primary-700 focus-within:border-primary-500 focus-within:ring-primary-500 focus-within:ring-offset-background flex items-stretch border transition-all focus-within:ring-2 focus-within:ring-offset-2",
                        {
                          "border-red-500": errors.length && isTouched,
                        },
                      )}
                    >
                      {/* INPUT */}
                      <input
                        id="age"
                        type="number"
                        value={safeValue === 0 ? "" : safeValue}
                        placeholder="Age"
                        onChange={(e) => {
                          const val = e.target.value;
                          field.handleChange(val === "" ? 0 : Number(val));
                        }}
                        className={cn(
                          "w-full bg-transparent px-3 py-2 text-sm outline-none",
                          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                        )}
                      />

                      {/* STEPPER */}
                      <div className="border-primary-300 dark:border-primary-700 flex flex-col border-l">
                        <button
                          type="button"
                          onClick={() =>
                            field.setValue((prev) => {
                              const current =
                                typeof prev === "number" ? prev : 0;
                              return Math.min(current + 1, 100);
                            })
                          }
                          className="hover:bg-primary-100/40 dark:hover:bg-primary-900/40 flex h-1/2 items-center justify-center px-2"
                        >
                          <ChevronUp className="size-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            field.setValue((prev) => {
                              const current =
                                typeof prev === "number" ? prev : 0;
                              return Math.max(current - 1, 0);
                            })
                          }
                          className="border-primary-300 dark:border-primary-700 hover:bg-primary-100/40 dark:hover:bg-primary-900/40 flex h-1/2 items-center justify-center border-t px-2"
                        >
                          <ChevronDown className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* ERROR */}
                    {errors.length > 0 && isTouched && (
                      <span className="absolute top-full left-0 text-xs text-red-500">
                        {errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            </Field>

            {/* CTA */}
            <button
              type="submit"
              className={cn(
                `bg-primary-500 hover:bg-primary-600 mt-2 px-4 py-2 text-sm font-medium text-white transition`,
              )}
            >
              Continue
            </button>

            <p className={cn(`text-foreground/50 text-center text-xs`)}>
              By continuing, you agree to our{" "}
              <Link to="/terms-and-conditions" className={cn(`underline`)}>
                terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className={cn(`underline`)}>
                privacy policy
              </Link>{" "}
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
