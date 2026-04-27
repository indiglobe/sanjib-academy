import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DevTools } from "../integrations/tanstack/devtools";
import appCss from "../styles/styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/integrations/theme/theme-provider";
import { cn } from "@/utils/cn";
import { RootNotFound } from "@/components/main/root-not-found";
import { RootError } from "@/components/main/root-error";
import { Toaster } from "@/ui/shadcn/sonner";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Sanjib Academy",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Volkhov:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
    ],
  }),

  shellComponent: RootDocument,

  notFoundComponent: RootNotFound,

  errorComponent: RootError,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className={cn(
          `flex max-w-svw flex-col overflow-x-clip overflow-y-auto`,
        )}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        <DevTools />
        <Scripts />
      </body>
    </html>
  );
}
