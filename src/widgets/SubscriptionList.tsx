import useGetSubscriptions from "../hooks/useGetSubscriptions";
import AddSubscription from "./AddSubscription";

import styles from "./SubscriptionList.module.css";

export default function SubscriptionList({
  currentSubscription,
  setCurrentSubscription,
}) {
  const { isPending, isError, data, error } = useGetSubscriptions(
    currentSubscription?.feed.id
  );

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const handleSubscriptionClick = (subscription): void => {
    setCurrentSubscription(subscription);
  };

  return (
    <div className={styles.subscriptions}>
      <h2>Feeds</h2>
      <ul role="list">
        {data.map((subscription) => (
          <li
            key={subscription.feed.id}
            onClick={() => handleSubscriptionClick(subscription)}
            className={
              currentSubscription?.feed.id === subscription.feed.id
                ? styles.selected
                : ""
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
