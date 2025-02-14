import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../api/data";

export default function useGetArticle(articleId) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticle(articleId),
    enabled: !!articleId,
  });

  return { isPending, isError, data, error };
}
