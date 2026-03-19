import { cn } from "@/utils/cn";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { LogIn, TextAlignJustify } from "lucide-react";
import { Image } from "@unpic/react";
import {
  Link,
  useNavigate,
  useRouteContext,
  LinkProps,
  useLocation,
} from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { authClient } from "@/lib/auth/auth-client";
import { useNavbarState } from "@/hooks/use-navstate";
import gsap from "gsap";

/**
 * The main component for the navbar for large screen and small screen both
 */
export function Navbar({ ...props }: ComponentProps<"nav">) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const navbar = navbarRef.current;

    if (!navbar) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 150) {
        // Scrolling down → hide navbar
        gsap.to(navbar, { y: "-100%", duration: 0.5, ease: "power2.out" });
      } else {
        // Scrolling up → show navbar
        gsap.to(navbar, { y: "0%", duration: 0.5, ease: "power2.out" });
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      {...props}
      className={cn(
        `fixed top-0 left-0 isolate z-9999 h-0 w-full`,
        props.className,
      )}
    >
      <div
        ref={navbarRef}
        className={cn(
          `relative flex w-full items-center justify-between px-4 py-6 sm:px-10 md:px-20 lg:px-30`,
        )}
      >
        <LogoHamburger />

        <LargeScreenNavbar />

        <SignInButtonOrAvatar />

        <div
          className={cn(
            `bg-background/90 absolute top-0 right-0 bottom-0 left-0 -z-1 backdrop-blur-xs`,
          )}
        />
      </div>

      <SmallScreenNavbar />
    </nav>
  );
}

/**
 * Show logo and hamburger button for smaller screen
 * and only the logo for large screen
 */

function LogoHamburger({ ...props }: ComponentProps<"div">) {
  const { isNavOpen, toggleNavBar } = useNavbarState();

  return (
    <div
      {...props}
      className={cn(`relative flex items-center gap-4`, props.className)}
    >
      <Button
        variant={"ghost"}
        className={cn(
          `focus-visible:ring-primary-500 has-[>svg]:px-1 md:hidden`,
          { hidden: isNavOpen },
        )}
        onClick={toggleNavBar}
      >
        <TextAlignJustify className={cn(`size-8`)} />
      </Button>

      <Link
        to="/"
        className={cn(
          `focus-visible:ring-primary-500 focus-visible:ring-offset-background relative inline-block size-10 overflow-clip rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
          { hidden: isNavOpen },
        )}
      >
        <Image
          className={cn(`absolute h-full w-full object-cover`)}
          src={"/logo256.png"}
          alt="logo"
          layout="fullWidth"
        />
      </Link>
    </div>
  );
}

/**
 * Navbar for smaller screen
 */
function SmallScreenNavbar() {
  const { isNavOpen, toggleNavBar } = useNavbarState();

  return (
    <div
      className={cn(
        `fixed top-0 left-0 isolate z-9999 h-svh w-full max-w-60 pt-6 transition-all md:hidden`,
        {
          "-translate-x-full": !isNavOpen,
          "translate-x-0": isNavOpen,
        },
      )}
    >
      <div className={cn(`flex w-full items-center gap-4 px-4 sm:px-10`)}>
        <Button
          variant={"ghost"}
          className={cn(
            `focus-visible:ring-primary-500 relative hover:bg-transparent hover:text-white focus-visible:ring-offset-0 has-[>svg]:px-1 md:hidden`,
          )}
          onClick={toggleNavBar}
        >
          <TextAlignJustify className={cn(`size-8`)} />
        </Button>

        {/* logo when navbar is open */}
        <Link
          to="/"
          className={cn(
            `focus-visible:ring-primary-500 relative inline-block size-10 overflow-clip rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-0 md:size-14`,
          )}
        >
          <Image
            className={cn(`absolute h-full w-full object-cover`)}
            src={"/logo256.png"}
            alt="logo"
            layout="fullWidth"
          />
        </Link>
        {/* logo when navbar is open */}

        <div
          aria-hidden
          className={cn(
            `bg-background/95 dark:bg-background/80 absolute top-0 right-0 bottom-0 left-0 -z-1 h-[110vh] backdrop-blur-xs`,
          )}
        />
      </div>

      <ul className={cn(`flex w-full flex-col pt-8`)}>
        <li tabIndex={-1} />
        <SmallScreenNavItem activationTriggringPathname="" to="/">
          Home
        </SmallScreenNavItem>
        <SmallScreenNavItem
          activationTriggringPathname="about-us"
          to="/about-us"
        >
          About Us
        </SmallScreenNavItem>
        <SmallScreenNavItem activationTriggringPathname="courses" to="/courses">
          Courses
        </SmallScreenNavItem>
        <SmallScreenNavItem
          activationTriggringPathname="contact-us"
          to="/contact-us"
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

  const { pathname } = location;
  const pathnameFirstSlot = pathname.split("/")[1];

  return (
    <li {...props} className={cn(``, props.className)}>
      <Link
        to={to}
        onClick={closeNavBar}
        className={cn(`block py-4 pl-4 text-lg sm:pl-12`, {
          "bg-primary-500 text-primary-50 dark:text-primary-950":
            activationTriggringPathname === pathnameFirstSlot,
        })}
      >
        {props.children}
      </Link>
    </li>
  );
}

/**
 * navbar for large screen it contains only the logo
 */
function LargeScreenNavbar({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(`inline-block max-md:hidden`, props.className)}
    >
      <ul className={cn(`flex gap-x-2`)}>
        <LargeScreenNavItem activationTriggringPathname="" to="/">
          Home
        </LargeScreenNavItem>
        <LargeScreenNavItem
          activationTriggringPathname="about-us"
          to="/about-us"
        >
          About Us
        </LargeScreenNavItem>
        <LargeScreenNavItem activationTriggringPathname="courses" to="/courses">
          Courses
        </LargeScreenNavItem>
        <LargeScreenNavItem
          activationTriggringPathname="contact-us"
          to="/contact-us"
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

  const { pathname } = location;
  const pathnameFirstSlot = pathname.split("/")[1];

  return (
    <li {...props} className={cn(``, props.className)}>
      <Link
        to={to}
        onClick={closeNavBar}
        className={cn(`rounded-full px-4 py-2 text-base`, {
          "bg-primary-500 text-primary-50 dark:text-primary-950":
            activationTriggringPathname === pathnameFirstSlot,
        })}
      >
        {props.children}
      </Link>
    </li>
  );
}

/**
 * when the user is signed in show the avatar button
 * when the user is signed out show the sign in button
 */
function SignInButtonOrAvatar({ ...props }: ComponentProps<"div">) {
  const { session } = useRouteContext({ from: "/(public)" });

  return (
    <div
      {...props}
      className={cn(`flex items-center justify-center`, props.className)}
    >
      {/* if user is not signed in show signin button */}
      {!session && (
        <Link
          to="/signin"
          search={{
            // callbackUrl: location.href,
            initiator: "landing-page",
          }}
          tabIndex={-1}
        >
          <Button variant={"default"} className={cn(`rounded-full`)}>
            <span>Sign in</span>
            <span className={cn(`max-md:hidden`)}>
              <LogIn />
            </span>
          </Button>
        </Link>
      )}

      {/* if user is signed in show avatar */}
      {session && <PopoverAndAvatar />}
    </div>
  );
}

function PopoverAndAvatar() {
  const { session } = useRouteContext({ from: "/(public)" });
  const navigate = useNavigate();

  async function logout() {
    await authClient.signOut();

    navigate({ to: "/signin" });
  }

  if (!session) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus-visible:ring-primary-500 focus-visible:ring-offset-background rounded-full focus-visible:ring-2 focus-visible:ring-offset-4"
        >
          <Avatar className={cn(`size-10 md:size-12`)}>
            <AvatarImage src={session.user.image ?? undefined} alt="avatar" />
            <AvatarFallback>{session.user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="top-10 z-9999 w-40"
        align="end"
        sideOffset={6}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem asChild className="">
            <Link
              to="/dashboard"
              className={cn(`flex h-full w-full items-center justify-start`)}
            >
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" className={cn(`px-0 py-0`)}>
            <button
              onClick={logout}
              className={cn(
                `flex h-full w-full items-center justify-center rounded-sm px-2 py-1.5`,
              )}
            >
              Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
