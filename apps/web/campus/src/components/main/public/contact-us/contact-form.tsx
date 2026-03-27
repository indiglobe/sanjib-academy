import { createNewContactMessageServerFn } from "@/integrations/server-functions/form-actions/contact-form";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { contactFormSchema, ContactFormSchema } from "@/utils/zod-schema";
import { useForm } from "@tanstack/react-form";
import { useServerFn } from "@tanstack/react-start";
import { SubmitEvent } from "react";

export default function ConatctForm() {
  /**
   * wrap server functions to use them in client
   */
  const createNewContactMessage = useServerFn(createNewContactMessageServerFn);

  const { Field, handleSubmit } = useForm({
    /**
     * provide default values for the form fields
     */
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      message: "",
    } satisfies ContactFormSchema,
    /**
     * run form validation on form submission
     */
    validators: {
      onSubmit: contactFormSchema,
    },
    /**
     * On submit run this function
     */
    onSubmit: async ({ value }) => {
      const { email, firstName, lastName, message, phoneNo } = value;
      return await createNewContactMessage({
        data: { email, firstName, lastName, message, phoneNo },
      });
    },
    // This is to identify this form in tanstack-devtool
    formId: "contact-form",
  });

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    await handleSubmit();
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={cn(`@container flex flex-col gap-y-6`)}
      >
        {/* name section */}
        <div
          className={cn(
            `flex w-full flex-col flex-wrap gap-4 @sm:flex-row @sm:flex-nowrap`,
          )}
        >
          {/* first name */}
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
          {/* first name */}

          {/* last name */}
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
          {/* last name */}
        </div>
        {/* name section */}

        {/* email secition */}
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
        {/* email secition */}

        {/* phone no section */}
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
        {/* phone no section */}

        {/* message section */}
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
        {/* message section */}

        <div className={cn(`pt-4`)}>
          <Button variant={"primary"} type="submit" className={cn(`w-full`)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
