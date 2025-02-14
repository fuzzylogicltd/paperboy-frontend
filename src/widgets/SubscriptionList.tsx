import useGetSubscriptions from "../hooks/useGetSubscriptions";

export default function SubscriptionList({
  subscriptionId,
  setSubscriptionId,
}) {
  const { isPending, isError, data, error } =
    useGetSubscriptions(subscriptionId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleSubscriptionClick = (feedId: number): void => {
    setSubscriptionId(feedId);
  };

  return (
    <div className="subs-list">
      <h2>Your feeds</h2>
      <ul>
        {data.data.map((subscription) => (
          <li
            key={subscription.feed.id}
            onClick={() => handleSubscriptionClick(subscription.feed.id)}
          >
            {subscription.customFeedName ?? subscription.feed.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
