import useGetSubscriptions from "../hooks/useGetSubscriptions";
import AddSubscription from "./AddSubscription";
import { ISubscription } from "../api/types";

import styles from "./SubscriptionList.module.css";

interface SubscriptionListProps {
  currentSubscription: ISubscription | null;
  setCurrentSubscription: Function;
}

export default function SubscriptionList({
  currentSubscription,
  setCurrentSubscription,
}: SubscriptionListProps) {
  const { isPending, isError, data, error } = useGetSubscriptions();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const handleSubscriptionClick = (subscription: ISubscription): void => {
    setCurrentSubscription(subscription);
  };

  return (
    <div className={styles.subscriptions}>
      <div className={styles.topSection}>
        <h2>Feeds</h2>
        <ul role="list">
          {data.map((subscription: ISubscription) => (
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
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.addSubscription}>
          <AddSubscription />
        </div>
      </div>
    </div>
  );
}
