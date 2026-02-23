import { ThemeSwitchingButtons } from "@/components/main/public/theme-switching-buttons";
import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";

export function Footer({ ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        `px-4 sm:px-10 md:px-20 lg:px-30`,
        `mb-10`,
        // `bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-pink-500 2xl:bg-purple-500`,
        props.className,
      )}
    >
      <Theme />

      <QuickPages />

      <UsefulLinks />

      <section className={cn(`mt-10 text-center text-sm`)}>
        &copy; Sanjib Academy all copyright reserve.
      </section>
    </footer>
  );
}

function FooterSectionHeading({ ...props }: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cn(`text-base font-semibold md:text-lg`, props.className)}
    />
  );
}

function FooterSectionList({ ...props }: ComponentProps<"ul">) {
  return <ul {...props} className={cn(`opacity-80`, props.className)} />;
}

function FooterSectionItem({ ...props }: ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={cn(`py-1 text-sm md:text-base`, props.className)}
    />
  );
}

function Theme({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <FooterSectionHeading>Theme</FooterSectionHeading>

      <ThemeSwitchingButtons className={cn(`pt-2`)} />
    </section>
  );
}

function QuickPages({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(`my-2`, props.className)}>
      <FooterSectionHeading>Quick pages</FooterSectionHeading>

      <FooterSectionList>
        <FooterSectionItem>
          <Link to={"/"}>Home</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to={"/courses"}>Courses</Link>
        </FooterSectionItem>
      </FooterSectionList>
    </section>
  );
}

function UsefulLinks({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(`my-2`, props.className)}>
      <FooterSectionHeading>Useful Links</FooterSectionHeading>

      <FooterSectionList>
        <FooterSectionItem>
          <Link to={"/terms-and-conditions"}>Terms and conditions</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to={"/privacy-policy"}>Privacy policy</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to={"/refund-policy"}>Refund policy</Link>
        </FooterSectionItem>
      </FooterSectionList>
    </section>
  );
}
