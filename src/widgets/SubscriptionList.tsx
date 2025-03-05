import { Dispatch, SetStateAction } from "react";
import useGetSubscriptions from "../hooks/useGetSubscriptions";
import AddSubscription from "./AddSubscription";
import { ArticleFilterOptions, ISubscription } from "../api/types";

import styles from "./SubscriptionList.module.css";
import ArticleFilter from "./ArticleFilter";

interface SubscriptionListProps {
  currentSubscription: ISubscription | null;
  setCurrentSubscription: Dispatch<SetStateAction<ISubscription>>;
  articleFilter: ArticleFilterOptions;
  setArticleFilter: Dispatch<SetStateAction<ArticleFilterOptions>>;
}

export default function SubscriptionList({
  currentSubscription,
  setCurrentSubscription,
  articleFilter,
  setArticleFilter,
}: SubscriptionListProps) {
  const { isPending, isError, data, error } = useGetSubscriptions();

  const handleSubscriptionClick = (
    subscription: ISubscription | null
  ): void => {
    setCurrentSubscription(subscription);
  };

  return (
    <div className={styles.subscriptions}>
      <div className={styles.topSection}>
        {isPending && <span>Loading...</span>}
        {isError && <span>Error: {error?.message}</span>}

        {data && (
          <>
            <ArticleFilter
              articleFilter={articleFilter}
              setArticleFilter={setArticleFilter}
            />

            <span
              className={styles.categoryLink}
              onClick={() => handleSubscriptionClick(null)}
            >
              All feeds
            </span>

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
          </>
        )}
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.addSubscription}>
          <AddSubscription />
        </div>
      </div>
    </div>
  );
}
