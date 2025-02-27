import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../api/data";

export default function useGetArticle(articleId: number | null) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["article", articleId],
    queryFn: articleId ? () => fetchArticle(articleId) : skipToken,
  });

  return { isPending, isError, data, error };
}
