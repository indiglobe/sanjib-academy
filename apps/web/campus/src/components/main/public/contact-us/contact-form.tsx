import { insertNewContactMessageServerFn } from "@/integrations/server-functions/form-actions/contact-form";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { contactFormSchema, ContactFormSchema } from "@/utils/zod-schema";
import { useForm } from "@tanstack/react-form";
import { useServerFn } from "@tanstack/react-start";
import { SubmitEvent } from "react";

export default function ConatctForm() {
  const insertNewContactMessage = useServerFn(insertNewContactMessageServerFn);
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      message: "",
    } satisfies ContactFormSchema,
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value, meta: {} }) => {
      const { email, firstName, lastName, message, phoneNo } = value;
      return await insertNewContactMessage({
        data: { email, firstName, lastName, message, phoneNo },
      });
    },
    onSubmitMeta: () => {
      return "";
    },
    formId: "contact-form",
  });

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const submitResult = await handleSubmit();

    console.log(submitResult);
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={cn(`@container flex flex-col gap-y-6`)}
      >
        <div
          className={cn(
            `flex w-full flex-col flex-wrap gap-4 @sm:flex-row @sm:flex-nowrap`,
          )}
        >
          <Field name="firstName">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div
                  className={cn(
                    `relative flex w-full flex-col gap-2 @sm:basis-1/2`,
                  )}
                >
                  <label
                    htmlFor="first-name"
                    className={cn(
                      `relative after:absolute after:text-xs after:text-red-400 after:content-['*']`,
                    )}
                  >
                    First name:
                  </label>

                  <input
                    type="text"
                    id="first-name"
                    placeholder="Jhon"
                    className={cn(
                      `focus-visible:ring-offset-background w-full rounded-sm border border-black px-3 py-2 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white dark:focus-visible:ring-white`,
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

          <Field name="lastName">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div
                  className={cn(
                    `relative flex w-full flex-col gap-2 @sm:basis-1/2`,
                  )}
                >
                  <label
                    htmlFor="last-name"
                    className={cn(
                      `relative after:absolute after:text-xs after:text-red-400 after:content-['*']`,
                    )}
                  >
                    Last name:
                  </label>

                  <input
                    type="text"
                    id="last-name"
                    placeholder="Snow"
                    className={cn(
                      `focus-visible:ring-offset-background w-full rounded-sm border border-black px-3 py-2 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white dark:focus-visible:ring-white`,
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
                    Eamil:
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="jhonsnow@thenorth.remembers"
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

        <div className={cn(`flex gap-4`)}>
          <Field name="phoneNo">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div className={cn(`relative flex w-full flex-col gap-2`)}>
                  <label
                    htmlFor="phone-no"
                    className={cn(
                      `relative after:absolute after:text-xs after:text-red-400 after:content-['*']`,
                    )}
                  >
                    Phone no:
                  </label>

                  <input
                    type="text"
                    id="phone-no"
                    placeholder="+91-0707 0707 01"
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

        <div className={cn(`flex gap-4`)}>
          <Field name="message">
            {(field) => {
              const {
                state: {
                  meta: { errors, isTouched },
                },
              } = field;
              return (
                <div className={cn(`relative flex w-full flex-col gap-2`)}>
                  <label
                    htmlFor="message"
                    className={cn(
                      `relative after:absolute after:text-xs after:text-red-400 after:content-['*']`,
                    )}
                  >
                    Message:
                  </label>

                  <textarea
                    id="message"
                    placeholder="You know nothing Jhon Snow..."
                    rows={6}
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

        <div className={cn(`pt-4`)}>
          <Button variant={"primary"} type="submit" className={cn(`w-full`)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
