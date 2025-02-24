import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../api/data";

export default function useGetArticles(subscriptionId, pageCursor) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["articles", "feed", subscriptionId, pageCursor],
    queryFn: () => fetchArticles(subscriptionId, pageCursor),
  });

  return { isPending, isError, data, error };
}
