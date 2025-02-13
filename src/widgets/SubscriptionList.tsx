import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "../api/data";

export default function SubscriptionList(
  currentSubscription,
  setCurrentSubscription
) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleSubscriptionClick = (e) => {
    setCurrentSubscription;
  };

  return (
    <>
      <h1>Your feeds</h1>
      <ul>
        {data.data.map((subscription) => (
          <li key={subscription.feed.url} onClick={handleSubscriptionClick}>
            {subscription.feed.name}
          </li>
        ))}
      </ul>
    </>
  );
}
