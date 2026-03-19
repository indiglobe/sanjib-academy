import { ThemeSwitchingButtons } from "@/components/main/theme-switching-buttons";
import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ComponentProps } from "react";

export function Footer({ ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        `px-4 sm:px-10 md:px-20 lg:px-30`,
        `bg-primary-500 text-background dark:text-foreground rounded-tl-4xl rounded-tr-4xl pt-8 pb-10`,
        props.className,
      )}
    >
      {/* footer main section  */}
      <section
        className={cn(`grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4`)}
      >
        <FooterIntro />

        <Theme />

        <QuickPages />

        <UsefulLinks />
      </section>
      {/* footer main section  */}

      {/* copyright section */}
      <section
        className={cn(
          `mt-10 flex flex-col text-center text-sm font-semibold md:flex-row md:justify-between`,
        )}
      >
        <span>&copy; Sanjib Academy all copyright reserve.</span>
        <span>
          Developed by{" "}
          <a className={cn(`underline`)} href="https://indiglobe.in/">
            Indiglobe
          </a>
        </span>
      </section>
      {/* copyright section */}

      {/* background used to increase the size of the footer at bottom */}
      <div aria-hidden className={cn(`mb-50 md:mb-30`)} />
      {/* background used to increase the size of the footer at bottom */}
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

function FooterIntro({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <Link className={cn(`relative inline-block size-10`)} to="/">
        <Image
          src="/logo256.png"
          alt="logo"
          layout="fullWidth"
          className={cn(`object-cover`)}
        />
      </Link>
    </section>
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
          <Link to={"/about-us"}>About us</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to={"/courses"}>Courses</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to={"/contact-us"}>Contact us</Link>
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
          <Link to={"/disclaimer"}>Disclaimer</Link>
        </FooterSectionItem>
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
