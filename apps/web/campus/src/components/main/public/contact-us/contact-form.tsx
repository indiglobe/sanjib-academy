import { create__NewContactMessageServerFn } from "@/integrations/server-functions/form-actions/contact-form";
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
  const create__NewContactMessage = useServerFn(
    create__NewContactMessageServerFn,
  );

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
    onSubmit: async ({ value }) => {
      const { email, firstName, lastName, message, phoneNo } = value;
      return await create__NewContactMessage({
        data: { email, firstName, lastName, message, phoneNo },
      });
    },
    formId: "contact-form",
  });

  return (
    <div
      className={cn(
        "dark:border-zinc-700d backdrop-blur-xld w-full rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-xl transition-all sm:p-8 dark:bg-zinc-900/70",
        className,
      )}
      {...props}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
            Send a message
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            We'll get back to you within 24 hours.
          </p>
        </div>

        {/* Name */}
        <div className={cn(`@container`)}>
          <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
            <Field name="firstName">
              {(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    First name *
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className={cn(
                      "focus:ring-primary-500 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800",
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
                      <span className="mt-1 text-xs text-red-500">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                </div>
              )}
            </Field>

            <Field name="lastName">
              {(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Last name *
                  </label>
                  <input
                    type="text"
                    placeholder="Snow"
                    className={cn(
                      "focus:ring-primary-500 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800",
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
                      <span className="mt-1 text-xs text-red-500">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                </div>
              )}
            </Field>
          </div>
        </div>

        {/* Email */}
        <Field name="email">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email *
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={cn(
                  "focus:ring-primary-500 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800",
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
                  <span className="mt-1 text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
            </div>
          )}
        </Field>

        {/* Phone */}
        <Field name="phoneNo">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Phone *
              </label>
              <input
                type="text"
                placeholder="+91 00000 00000"
                className={cn(
                  "focus:ring-primary-500 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800",
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
                  <span className="mt-1 text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
            </div>
          )}
        </Field>

        {/* Message */}
        <Field name="message">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Message *
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className={cn(
                  "focus:ring-primary-500 w-full resize-none rounded-sm border border-zinc-300 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800",
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
                  <span className="mt-1 text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
            </div>
          )}
        </Field>

        {/* Button */}
        <Button
          variant="primary"
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-500 w-full rounded-none py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
        >
          Send Message 🚀
        </Button>
      </form>
    </div>
  );
}
