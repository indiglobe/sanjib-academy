import { readMostUpcomingWebinarServerFn } from "@/integrations/server-functions/querry/webinar-details";
import { useQuery } from "@tanstack/react-query";

export function useMostUpcomingWebinarData() {
  const res = useQuery({
    queryKey: ["most-upcoming-event"],
    queryFn: readMostUpcomingWebinarServerFn,
    refetchOnWindowFocus: false,
  });

  return res;
}
