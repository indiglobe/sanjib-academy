import { useTheme } from "@/integrations/theme/theme-provider";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { Monitor, MoonStar, Smartphone, Sun, Tablet } from "lucide-react";
import { ComponentProps } from "react";

export function ThemeSwitchingButtons({ ...props }: ComponentProps<"div">) {
  const { setTheme } = useTheme();

  return (
    <div {...props} className={cn(`inline-block`, props.className)}>
      <Button
        variant={"outline"}
        size={"sm"}
        className={cn(`rounded-sm rounded-tr-none rounded-br-none border-r-0`)}
        onClick={() => setTheme("light")}
      >
        <Sun />
      </Button>

      <Button
        variant={"outline"}
        size={"sm"}
        className={cn(`rounded-none`)}
        onClick={() => setTheme("system")}
      >
        <Smartphone className={cn(`md:hidden`)} />
        <Tablet className={cn(`max-md:hidden lg:hidden`)} />
        <Monitor className={cn(`max-lg:hidden`)} />
      </Button>

      <Button
        variant={"outline"}
        size={"sm"}
        className={cn(`rounded-sm rounded-tl-none rounded-bl-none border-l-0`)}
        onClick={() => setTheme("dark")}
      >
        <MoonStar />
      </Button>
    </div>
  );
}
