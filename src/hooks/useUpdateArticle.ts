import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateArticle } from "../api/data";
import { IRead } from "../api/types";

export default function useUpdateArticle() {
  const queryClient = useQueryClient();

  const mutateRead = useMutation({
    mutationFn: (read: IRead) => {
      return updateArticle(read);
    },
    onSuccess: (data, read) => {
      queryClient.setQueryData(["article", data.articleId], read);
    },
    onError: (res) => {
      console.log("could not update article status", { res });
      //    TODO: return this error to user when we have toasts
    },
  });

  return { mutateRead };
}
