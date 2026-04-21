import { read__MostUpcomingWebinarServerFn } from "@/integrations/server-functions/querry/webinar-details";
import { useQuery } from "@tanstack/react-query";

export function useMostUpcomingWebinarData() {
  const res = useQuery({
    queryKey: ["most-upcoming-event"],
    queryFn: read__MostUpcomingWebinarServerFn,
    refetchOnWindowFocus: false,
  });

  return res;
}
