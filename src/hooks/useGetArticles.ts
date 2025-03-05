import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../api/data";
import { ArticleFilterOptions } from "../api/types";

export default function useGetArticles(
  subscriptionId: number | undefined,
  pageCursor: number | null,
  articleFilter: ArticleFilterOptions
) {
  let starred = false;
  let read = null;

  if (articleFilter === "starred") {
    starred = true;
  }

  if (articleFilter === "read") {
    read = true;
  } else if (articleFilter === "unread") {
    read = false;
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["articles", "feed", subscriptionId, pageCursor, starred, read],
    queryFn: () => fetchArticles(subscriptionId, pageCursor, starred, read),
  });

  return { isPending, isError, data, error };
}
