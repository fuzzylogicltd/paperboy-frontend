import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../api/data";

export default function useGetArticles(subscriptionId) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["articles", "feed", subscriptionId],
    queryFn: () => fetchArticles(subscriptionId),
  });

  return { isPending, isError, data, error };
}
