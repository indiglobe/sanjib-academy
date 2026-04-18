import { ComponentProps } from "react";
import {
  Settings,
  LogOut,
  Menu,
  X,
  UserPlus,
  LucideHome,
  ClipboardPenLine,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/ui/button";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import {
  Link,
  useRouteContext,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { formatName, generateUserNameFromEmail } from "@repo/utils/utility";
import { authClient } from "@/lib/auth/auth-client";

export default function Sidebar({
  className,
  ...props
}: ComponentProps<"aside">) {
  const { isSidebarCollapsed, toggleSidebarBar } = useSidebarState();
  const { userDetails, session } = useRouteContext({
    from: "/(authenticated)",
  });
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "border-primary-200 bg-primary-50/50 fixed top-0 left-0 flex h-svh flex-col justify-between border-r transition-all duration-300",
        isSidebarCollapsed ? "w-17.5" : "w-62.5",
        className,
      )}
      {...props}
    >
      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4">
          {!isSidebarCollapsed && (
            <h1 className="text-primary-800 text-lg font-semibold">
              {
                formatName(userDetails ? userDetails.name : session.user.name)
                  .firstName
              }
            </h1>
          )}
          <Button
            variant="ghost"
            className="text-primary-800 hover:bg-primary-100"
            onClick={toggleSidebarBar}
          >
            {isSidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-2">
          {userDetails && <ExistingUserSidebarItems />}
          {!userDetails && <NewUserSidebarItems />}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton
          className={cn(
            "text-accent-700 hover:bg-accent-100 text-sm transition",
            isSidebarCollapsed && "justify-center",
          )}
        >
          <Link tabIndex={-1} to="/" className={cn(``)}>
            <LucideHome size={20} />
            <SidebarButtonContent>Home</SidebarButtonContent>
          </Link>
        </SidebarButton>

        <SidebarButton
          className={cn(
            "text-accent-700 hover:bg-accent-100 text-sm transition",
            isSidebarCollapsed && "justify-center",
          )}
        >
          <Link tabIndex={-1} to="/settings" className={cn(``)}>
            <Settings size={20} />
            <SidebarButtonContent>Settings</SidebarButtonContent>
          </Link>
        </SidebarButton>

        <SidebarButton
          className={cn(
            "text-sm text-red-700 transition hover:bg-red-100 dark:hover:bg-red-950",
            isSidebarCollapsed && "justify-center",
          )}
          onClick={async () => {
            await authClient.signOut();
            navigate({ to: "/" });
          }}
        >
          <LogOut size={20} />
          <SidebarButtonContent>Logout</SidebarButtonContent>
        </SidebarButton>
      </div>
    </aside>
  );
}

function SidebarButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `relative flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition`,
        className,
      )}
      {...props}
    />
  );
}

function SidebarButtonContent({ className, ...props }: ComponentProps<"span">) {
  const { isSidebarCollapsed } = useSidebarState();
  return (
    <span
      className={cn(
        `absolute top-0 left-0 flex h-full w-full items-center justify-start pl-10 text-nowrap`,
        `${isSidebarCollapsed && "opacity-0"}`,
      )}
      {...props}
    />
  );
}

function NewUserSidebarItems() {
  const { isSidebarCollapsed } = useSidebarState();
  return (
    <>
      <SidebarButton
        className={cn(
          "text-primary-800 hover:bg-primary-100 flex items-center gap-3 px-3 py-2 text-sm font-medium transition",
          isSidebarCollapsed && "justify-center",
        )}
      >
        <Link to={"/welcome"} tabIndex={-1}>
          <UserPlus />
          <SidebarButtonContent>Get Started</SidebarButtonContent>
        </Link>
      </SidebarButton>
    </>
  );
}

function ExistingUserSidebarItems() {
  const { isSidebarCollapsed } = useSidebarState();
  const { userDetails } = useRouteContext({
    from: "/(authenticated)",
  });
  const location = useLocation();

  const activePath = location.pathname.split("/")[2];

  if (!userDetails) return null;

  return (
    <>
      <SidebarButton
        className={cn(
          "text-primary-800 hover:bg-primary-100 flex items-center gap-3 px-3 py-2 text-sm font-medium transition",
          isSidebarCollapsed && "justify-center",
          activePath === "dashboard" && "bg-primary-100",
        )}
      >
        <Link
          to={"/$username/dashboard"}
          tabIndex={-1}
          params={{
            username: generateUserNameFromEmail(userDetails.email),
          }}
        >
          <ClipboardPenLine />
          <SidebarButtonContent>Dashboard</SidebarButtonContent>
        </Link>
      </SidebarButton>

      <SidebarButton
        className={cn(
          "text-primary-800 hover:bg-primary-100 flex items-center gap-3 px-3 py-2 text-sm font-medium transition",
          isSidebarCollapsed && "justify-center",
          activePath === "courses" && "bg-primary-100",
        )}
      >
        <Link
          to={"/$username/courses"}
          tabIndex={-1}
          params={{
            username: generateUserNameFromEmail(userDetails.email),
          }}
        >
          <GraduationCap />
          <SidebarButtonContent>Courses</SidebarButtonContent>
        </Link>
      </SidebarButton>
    </>
  );
}
