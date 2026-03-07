import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function LawsuitPagesNavigation() {
  const router = useRouter();

  return (
    <nav className={cn(`mx-auto mt-8 mb-6 w-full max-w-[100ch] md:mb-0`)}>
      <Button variant={"ghost"} onClick={() => router.history.back()}>
        <ArrowLeft className={cn(`size-6 md:size-10`)} />
      </Button>
    </nav>
  );
}
