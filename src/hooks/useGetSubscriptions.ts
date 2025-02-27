import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "../api/data";

export default function useGetSubscriptions() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });

  return { isPending, isError, data, error };
}
