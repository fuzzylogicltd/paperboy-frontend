import useGetSubscriptions from "../hooks/useGetSubscriptions";
import AddSubscription from "./AddSubscription";

import styles from "./SubscriptionList.module.css";

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
    return <span>Error: {error?.message}</span>;
  }

  const handleSubscriptionClick = (feedId: number): void => {
    setSubscriptionId(feedId);
  };

  return (
    <div className={styles.subscriptions}>
      <ul role="list">
        {data.map((subscription) => (
          <li
            key={subscription.feed.id}
            onClick={() => handleSubscriptionClick(subscription.feed.id)}
            className={
              subscriptionId === subscription.feed.id ? styles.selected : ""
            }
          >
            {subscription.customFeedName ?? subscription.feed.name}
          </li>
        ))}
      </ul>
      <div className={styles.addSubscription}>
        <AddSubscription />
      </div>
    </div>
  );
}
