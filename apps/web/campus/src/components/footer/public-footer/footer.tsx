import { ThemeSwitchingButtons } from "@/components/main/theme-switching-buttons";
import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ComponentProps } from "react";

export function Footer({ ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "from-primary-500 via-primary-600 to-primary-700 dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 relative overflow-hidden rounded-t-[2.5rem] bg-linear-to-br px-4 pt-12 pb-10 text-white shadow-2xl sm:px-10 md:px-20 lg:px-28",
        props.className,
      )}
    >
      {/* subtle glow background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent)] opacity-10" />

      {/* Main grid */}
      <section className="relative z-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <FooterIntro />
        <Theme />
        <QuickPages />
        <UsefulLinks />
      </section>

      {/* Divider */}
      <div className="relative z-10 mt-10 h-px w-full bg-white/20" />

      {/* Bottom section */}
      <section className="relative z-10 mt-6 flex flex-col items-center justify-center gap-3 text-sm font-medium text-white/80 md:flex-row md:items-center md:justify-between">
        <span>© Sanjib Academy. All rights reserved.</span>

        <span>
          Developed by{" "}
          <a
            className="hover:text-accent-300 underline transition-colors"
            href="https://indiglobe.in/"
          >
            Indiglobe
          </a>
        </span>
      </section>

      {/* extra spacing */}
      <div aria-hidden className="mb-40 md:mb-24" />
    </footer>
  );
}

function FooterSectionHeading({ ...props }: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cn(
        "text-base font-semibold tracking-wide text-white md:text-lg",
        props.className,
      )}
    />
  );
}

function FooterSectionList({ ...props }: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={cn("mt-3 space-y-2 text-white/80", props.className)}
    />
  );
}

function FooterSectionItem({ ...props }: ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={cn(
        "hover:text-accent-300 text-sm transition-all duration-200 hover:translate-x-1 md:text-base",
        props.className,
      )}
    />
  );
}

function FooterIntro({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn("flex flex-col gap-4", props.className)}>
      <Link className="relative inline-block size-12" to="/">
        <Image
          src="/logo256.png"
          alt="logo"
          layout="fullWidth"
          className="rounded-lg object-cover shadow-md"
        />
      </Link>

      <p className="max-w-xs text-sm leading-relaxed text-white/80">
        Empowering students with quality education and curated resources to
        accelerate learning and growth.
      </p>
    </section>
  );
}

function Theme({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn("", props.className)}>
      <FooterSectionHeading>Theme</FooterSectionHeading>

      <div className="mt-3 inline-block rounded-xl bg-white/10 p-3 backdrop-blur-md">
        <ThemeSwitchingButtons />
      </div>
    </section>
  );
}

function QuickPages({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn("", props.className)}>
      <FooterSectionHeading>Quick Pages</FooterSectionHeading>

      <FooterSectionList>
        <FooterSectionItem>
          <Link to="/">Home</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to="/about-us">About us</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to="/resources">Resources</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to="/contact-us">Contact us</Link>
        </FooterSectionItem>
      </FooterSectionList>
    </section>
  );
}

function UsefulLinks({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn("", props.className)}>
      <FooterSectionHeading>Useful Links</FooterSectionHeading>

      <FooterSectionList>
        <FooterSectionItem>
          <Link to="/disclaimer">Disclaimer</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to="/terms-and-conditions">Terms and conditions</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to="/privacy-policy">Privacy policy</Link>
        </FooterSectionItem>
        <FooterSectionItem>
          <Link to="/refund-policy">Refund policy</Link>
        </FooterSectionItem>
      </FooterSectionList>
    </section>
  );
}
