import { useTheme } from "@/integrations/theme/theme-provider";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { Monitor, MoonStar, Smartphone, Sun, Tablet } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";

export function ThemeSwitchingButtons({ ...props }: ComponentProps<"div">) {
  const { setTheme, theme } = useTheme();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div {...props} className={cn(`inline-block`, props.className)}>
      <Button
        variant={"outline"}
        size={"sm"}
        className={cn(
          `bg-primary-500 hover:bg-primary-600 rounded-sm rounded-tr-none rounded-br-none border-r-0 border-white text-white`,
          {
            "text-primary-200 dark:text-primary-800":
              theme == "light" && isRendered,
          },
        )}
        onClick={() => setTheme("light")}
      >
        <Sun />
      </Button>

      <Button
        variant={"outline"}
        size={"sm"}
        className={cn(
          `bg-primary-500 hover:bg-primary-600 rounded-none border-white text-white`,
          {
            "text-primary-200 dark:text-primary-800":
              theme == "system" && isRendered,
          },
        )}
        onClick={() => setTheme("system")}
      >
        <Smartphone className={cn(`md:hidden`)} />
        <Tablet className={cn(`max-md:hidden lg:hidden`)} />
        <Monitor className={cn(`max-lg:hidden`)} />
      </Button>

      <Button
        variant={"outline"}
        size={"sm"}
        className={cn(
          `bg-primary-500 hover:bg-primary-600 rounded-sm rounded-tl-none rounded-bl-none border-l-0 border-white text-white`,
          {
            "text-primary-200 dark:text-primary-800":
              theme == "dark" && isRendered,
          },
        )}
        onClick={() => setTheme("dark")}
      >
        <MoonStar />
      </Button>
    </div>
  );
}
