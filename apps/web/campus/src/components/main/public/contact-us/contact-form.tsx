import { createNewContactMessageServerFn } from "@/integrations/server-functions/form-actions/contact-form";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { contactFormSchema, ContactFormSchema } from "@/utils/zod-schema";
import { useForm } from "@tanstack/react-form";
import { useServerFn } from "@tanstack/react-start";
import { ComponentProps } from "react";

export default function ConatctForm({
  className,
  ...props
}: ComponentProps<"div">) {
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

  return (
    <div className={cn(``, className)} {...props}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
        className={cn(`flex w-full flex-col gap-6`)}
      >
        {/* Name Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
          <Field name="firstName">
            {(field) => (
              <div className="relative flex flex-1 flex-col gap-1">
                <label
                  htmlFor="first-name"
                  className="font-medium after:text-red-500 after:content-['*']"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="John"
                  className={cn(
                    `w-full rounded-sm border px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none dark:border-white dark:focus:ring-white`,
                    {
                      "border-red-500 focus:ring-red-500":
                        field.state.meta.errors.length &&
                        field.state.meta.isTouched,
                    },
                  )}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched && (
                    <span className="absolute top-full text-xs text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
              </div>
            )}
          </Field>

          <Field name="lastName">
            {(field) => (
              <div className="relative flex flex-1 flex-col gap-1">
                <label
                  htmlFor="last-name"
                  className="font-medium after:text-red-500 after:content-['*']"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Snow"
                  className={cn(
                    `w-full rounded-sm border px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none dark:border-white dark:focus:ring-white`,
                    {
                      "border-red-500 focus:ring-red-500":
                        field.state.meta.errors.length &&
                        field.state.meta.isTouched,
                    },
                  )}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched && (
                    <span className="absolute top-full text-xs text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
              </div>
            )}
          </Field>
        </div>

        {/* Email */}
        <Field name="email">
          {(field) => (
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-medium after:text-red-500 after:content-['*']"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="jhonsnow@thenorth.remembers"
                className={cn(
                  `w-full rounded-sm border px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none dark:border-white dark:focus:ring-white`,
                  {
                    "border-red-500 focus:ring-red-500":
                      field.state.meta.errors.length &&
                      field.state.meta.isTouched,
                  },
                )}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 &&
                field.state.meta.isTouched && (
                  <span className="absolute top-full text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
            </div>
          )}
        </Field>

        {/* Phone */}
        <Field name="phoneNo">
          {(field) => (
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="phone-no"
                className="font-medium after:text-red-500 after:content-['*']"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone-no"
                placeholder="+91-0707 0707 01"
                className={cn(
                  `w-full rounded-sm border px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none dark:border-white dark:focus:ring-white`,
                  {
                    "border-red-500 focus:ring-red-500":
                      field.state.meta.errors.length &&
                      field.state.meta.isTouched,
                  },
                )}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 &&
                field.state.meta.isTouched && (
                  <span className="absolute top-full text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
            </div>
          )}
        </Field>

        {/* Message */}
        <Field name="message">
          {(field) => (
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="message"
                className="font-medium after:text-red-500 after:content-['*']"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="You know nothing John Snow..."
                rows={6}
                className={cn(
                  `w-full rounded-sm border px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none dark:border-white dark:focus:ring-white`,
                  {
                    "border-red-500 focus:ring-red-500":
                      field.state.meta.errors.length &&
                      field.state.meta.isTouched,
                  },
                )}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 &&
                field.state.meta.isTouched && (
                  <span className="absolute top-full text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
            </div>
          )}
        </Field>

        <Button
          variant="primary"
          type="submit"
          className="text-background bg-primary-500 dark:bg-primary-400 hover:bg-primary-600 w-full py-2 font-medium transition-colors"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
