import { cn } from "@/utils/cn";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { LogIn, TextAlignJustify } from "lucide-react";
import { Image } from "@unpic/react";
import {
  Link,
  useRouteContext,
  LinkProps,
  useLocation,
} from "@tanstack/react-router";
import { Button } from "@/ui/button";
import { useNavbarState } from "@/hooks/use-navstate";
import gsap from "gsap";
import { generateUserNameFromEmail } from "@repo/utils/utility";

export function Navbar({ ...props }: ComponentProps<"nav">) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 150) {
        gsap.to(navbar, { y: "-120%", duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(navbar, { y: "0%", duration: 0.4, ease: "power2.out" });
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      {...props}
      className={cn("fixed top-0 left-0 z-9999 w-full", props.className)}
    >
      <div
        ref={navbarRef}
        className={cn(
          "relative flex items-center justify-between",
          "px-4 py-4 sm:px-10 md:px-20 lg:px-28",
          "bg-white/70 backdrop-blur-xl dark:bg-zinc-900/70",
          "border-b border-zinc-200/40 dark:border-zinc-700/40",
          "shadow-sm transition-all",
        )}
      >
        <LogoHamburger />

        <LargeScreenNavbar />

        <NavCTAButton />

        {/* glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent)] opacity-10" />
      </div>

      <SmallScreenNavbar />
    </nav>
  );
}

/* ---------------- Logo + Hamburger ---------------- */

function LogoHamburger({ className, ...props }: ComponentProps<"div">) {
  const { isNavOpen, toggleNavBar } = useNavbarState();

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <Button
        variant="ghost"
        className={cn(
          "hover:bg-primary-500/10 rounded-lg transition md:hidden",
          { hidden: isNavOpen },
        )}
        onClick={toggleNavBar}
      >
        <TextAlignJustify className="size-7" />
      </Button>

      <Link
        to="/"
        className={cn(
          "relative size-10 overflow-hidden rounded-xl shadow-sm",
          "ring-1 ring-zinc-200 dark:ring-zinc-700",
          { hidden: isNavOpen },
        )}
      >
        <Image
          src="/logo256.png"
          alt="logo"
          layout="fullWidth"
          className="absolute h-full w-full object-cover"
        />
      </Link>
    </div>
  );
}

/* ---------------- Mobile Nav ---------------- */

function SmallScreenNavbar() {
  const { isNavOpen, toggleNavBar } = useNavbarState();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-9998 h-screen w-[80%] max-w-xs",
        "bg-white/90 backdrop-blur-xl dark:bg-zinc-900/90",
        "border-r border-zinc-200 dark:border-zinc-700",
        "transition-transform duration-300",
        {
          "-translate-x-full": !isNavOpen,
          "translate-x-0": isNavOpen,
        },
      )}
    >
      <div className="flex items-center gap-4 px-4 pt-6">
        <Button variant="ghost" onClick={toggleNavBar}>
          <TextAlignJustify className="size-7" />
        </Button>

        <Link to="/" className="relative size-10 overflow-hidden rounded-lg">
          <Image
            src="/logo256.png"
            alt="logo"
            layout="fullWidth"
            className="absolute h-full w-full object-cover"
          />
        </Link>
      </div>

      <ul className="mt-8 flex flex-col">
        <SmallScreenNavItem to="/" activationTriggringPathname="">
          Home
        </SmallScreenNavItem>
        <SmallScreenNavItem
          to="/about-us"
          activationTriggringPathname="about-us"
        >
          About Us
        </SmallScreenNavItem>
        <SmallScreenNavItem
          to="/resources"
          activationTriggringPathname="resources"
        >
          Resources
        </SmallScreenNavItem>
        <SmallScreenNavItem
          to="/contact-us"
          activationTriggringPathname="contact-us"
        >
          Contact us
        </SmallScreenNavItem>
      </ul>
    </div>
  );
}

function SmallScreenNavItem({
  to,
  activationTriggringPathname,
  ...props
}: { activationTriggringPathname: string } & ComponentProps<"li"> &
  Pick<LinkProps, "to">) {
  const { closeNavBar } = useNavbarState();
  const location = useLocation();
  const pathnameFirstSlot = location.pathname.split("/")[1];

  const isActive = activationTriggringPathname === pathnameFirstSlot;

  return (
    <li>
      <Link
        to={to}
        onClick={closeNavBar}
        className={cn(
          "block px-6 py-4 text-lg transition-all",
          "hover:bg-primary-500/10",
          {
            "bg-primary-500 text-white": isActive,
          },
        )}
      >
        {props.children}
      </Link>
    </li>
  );
}

/* ---------------- Desktop Nav ---------------- */

function LargeScreenNavbar() {
  return (
    <div className="hidden md:flex">
      <ul className="flex items-center gap-2 rounded-full bg-white/60 px-0 py-1 shadow-sm backdrop-blur dark:bg-zinc-800/60">
        <LargeScreenNavItem to="/" activationTriggringPathname="">
          Home
        </LargeScreenNavItem>
        <LargeScreenNavItem
          to="/about-us"
          activationTriggringPathname="about-us"
        >
          About Us
        </LargeScreenNavItem>
        <LargeScreenNavItem
          to="/resources"
          activationTriggringPathname="resources"
        >
          Resources
        </LargeScreenNavItem>
        <LargeScreenNavItem
          to="/contact-us"
          activationTriggringPathname="contact-us"
        >
          Contact us
        </LargeScreenNavItem>
      </ul>
    </div>
  );
}

function LargeScreenNavItem({
  to,
  activationTriggringPathname,
  ...props
}: { activationTriggringPathname: string } & ComponentProps<"li"> &
  Pick<LinkProps, "to">) {
  const { closeNavBar } = useNavbarState();
  const location = useLocation();
  const pathnameFirstSlot = location.pathname.split("/")[1];

  const isActive = activationTriggringPathname === pathnameFirstSlot;

  return (
    <li>
      <Link
        to={to}
        onClick={closeNavBar}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          "hover:bg-primary-500/10",
          {
            "bg-primary-500 text-white shadow": isActive,
          },
        )}
      >
        {props.children}
      </Link>
    </li>
  );
}

/* ---------------- CTA ---------------- */

function NavCTAButton() {
  const { session } = useRouteContext({ from: "/(public)" });
  const { href } = useLocation();

  return (
    <div className="flex items-center">
      {!session && (
        <Link
          to="/signin"
          search={{ initiator: "landing-page", redirectUrl: href }}
        >
          <Button className="rounded-full px-5 shadow-md transition-all hover:shadow-lg">
            Sign in
            <LogIn className="ml-2 size-4 max-md:hidden" />
          </Button>
        </Link>
      )}

      {session && (
        <Link
          to="/$username"
          params={{
            username: generateUserNameFromEmail(session.user.email),
          }}
        >
          <Button className="rounded-full px-5 shadow-md transition-all hover:shadow-lg">
            Go to Campus
            <LogIn className="ml-2 size-4 max-md:hidden" />
          </Button>
        </Link>
      )}
    </div>
  );
}
