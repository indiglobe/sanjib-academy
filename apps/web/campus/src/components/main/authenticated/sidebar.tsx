import { cn } from "@/utils/cn";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import { ComponentProps } from "react";
import { generateUserNameFromEmail } from "@repo/utils/utility";
import { LuSettings, LuUserPlus } from "react-icons/lu";
import { Button } from "@/ui/button";
import { Image } from "@unpic/react";
import { formatName } from "@repo/utils/utility";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

export default function Sidebar({ ...props }: ComponentProps<"section">) {
  return (
    <section
      {...props}
      data-slot={`sidebar`}
      aria-label="sidebar"
      className={cn(
        `bg-primary-50 text-primary-500 dark:text-foreground flex flex-col justify-between px-4 py-4`,
        props.className,
      )}
    >
      <SidebarTopSection />
      <SidebarBottomSection />
    </section>
  );
}

/**
 * This is sidebar top section
 */
function SidebarTopSection({ className, ...props }: ComponentProps<"div">) {
  const context = useRouteContext({ from: "/(authenticated)" });

  const { userDetails } = context;
  return (
    <div
      data-slot={`sidebar-top-section`}
      className={cn(`space-y-2`, className)}
      {...props}
    >
      <div>
        <Link
          to="/"
          className={cn(
            `focus-visible:ring-primary-500 focus-visible:ring-offset-background relative inline-block size-10 overflow-clip rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
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

      <div>
        {!userDetails && (
          <div className={cn(``)}>
            <Button className={cn(`w-full justify-start`)} variant={"primary"}>
              <Link
                tabIndex={-1}
                to="/welcome"
                className={cn(`flex items-center gap-2`)}
              >
                <span>
                  <LuUserPlus />
                </span>
                <span>Welcome</span>
              </Link>
            </Button>
          </div>
        )}

        {userDetails && (
          <div>
            <Button variant={"primary"}>
              <Link
                tabIndex={-1}
                to="/$username/dashboard"
                params={{
                  username: generateUserNameFromEmail(userDetails.email),
                }}
              >
                Dashboard
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * This is sidebar bottom section
 */
function SidebarBottomSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`sidebar-bottom-section`}
      className={cn(`flex flex-col gap-2`, className)}
      {...props}
    >
      <Button
        variant={"outline"}
        className={cn(`border-primary-500 w-full justify-start bg-transparent`)}
      >
        <span>
          <LuSettings />
        </span>
        <span>Settings</span>
      </Button>

      <SidebarProfileArea />
    </div>
  );
}

function SidebarProfileArea({ ...props }: ComponentProps<typeof Popover>) {
  const context = useRouteContext({ from: "/(authenticated)" });
  const navigate = useNavigate();

  const { session } = context;

  if (!session) return null;

  const {
    user: { name, image, email },
  } = session;

  const formatedName = formatName(name);

  async function logout() {
    await authClient.signOut();

    navigate({ to: "/" });
  }

  return (
    <Popover modal {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            `border-primary-500 flex h-16 w-full justify-start bg-transparent px-2`,
          )}
        >
          <span
            className={cn(
              `bg-primary-500 relative inline-block aspect-square h-full overflow-clip rounded-full`,
            )}
          >
            {image && (
              <Image
                src={image}
                className={cn(`absolute top-0 left-0 h-full w-full`)}
                alt="profile photo"
                layout="fullWidth"
              />
            )}
          </span>
          <span className={cn(`flex flex-col items-start justify-start`)}>
            <span className={cn(`text-xl`)}>{formatedName.firstName}</span>
            <span className={cn(`text-xs`)}>{email}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-primary-400 space-y-2">
        <Button
          className={cn(`flex w-full items-center`)}
          onClick={logout}
          variant={"destructive"}
        >
          <span>
            <LogOutIcon />
          </span>
          <span>Log out</span>
          <span></span>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
