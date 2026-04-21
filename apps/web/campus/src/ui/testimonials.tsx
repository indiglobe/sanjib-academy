import { cn } from "@/utils/cn";
import { Image } from "@unpic/react";
import { ComponentProps } from "react";

export function TestimonialCard({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "group relative h-full w-90 min-w-90 rounded-2xl border border-neutral-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5",
        props.className,
      )}
    />
  );
}

export function TestimonialCardHeader({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot={`testimonial-card-header`}
      className={cn(`mb-4 flex items-center gap-3`, props.className)}
    />
  );
}

export function TestimonialCardImage({
  src,
  alt,
  ...props
}: ComponentProps<"div"> & Pick<ComponentProps<typeof Image>, "src" | "alt">) {
  return (
    <div
      {...props}
      data-slot={`testimonial-card-image`}
      className={cn(`relative h-12 w-12 overflow-clip rounded-full`)}
    >
      <Image
        src={src}
        alt={alt}
        className={cn(
          `absolute top-0 left-0 h-full w-full object-cover`,
          props.className,
        )}
        layout="fullWidth"
      />
    </div>
  );
}

export function TestimonialAuthor({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot={`testimonial-author`}
      className={cn(`leading-tight`, props.className)}
    />
  );
}

export function TestimonialAuthorName({ ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      data-slot={`testimonial-author-name`}
      className={cn(`font-semibold`, props.className)}
    />
  );
}

export function TestimonialAuthorSocialHandle({
  ...props
}: ComponentProps<"p">) {
  return (
    <p {...props} className={cn(`text-sm text-neutral-500`, props.className)} />
  );
}

export function TestimonialMessage({ ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      data-slot={`testimonial-author-social-handle`}
      className={cn(
        `text-[calc(var(--spacing)*3.75)] leading-relaxed text-neutral-800 dark:text-neutral-400`,
        props.className,
      )}
    />
  );
}
