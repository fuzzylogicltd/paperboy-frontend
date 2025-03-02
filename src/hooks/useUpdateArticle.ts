import { useMutation } from "@tanstack/react-query";
import { updateArticle } from "../api/data";
import { IRead } from "../api/types";

export default function useUpdateArticle() {
  const mutateRead = useMutation({
    mutationFn: (read: IRead) => {
      return updateArticle(read);
    },
    onSuccess: () => {
      // TODO: check if we need to do anything here, like invalidate RQ cache or something?
    },
    onError: (res) => {
      console.log("could not update article status", { res });
      //    TODO: return this error to user when we have toasts
    },
  });

  return { mutateRead };
}
