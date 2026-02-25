import { mostUpcomingWebinarServerFn } from "@/integrations/server-functions/querry/webinar-details";
import { useQuery } from "@tanstack/react-query";

export function useMostUpcomingWebinarData() {
  const res = useQuery({
    queryKey: ["most-upcoming-event"],
    queryFn: mostUpcomingWebinarServerFn,
    refetchOnWindowFocus: false,
  });

  return res;
}
