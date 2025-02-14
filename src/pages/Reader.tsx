import { useState } from "react";
import ReadingPane from "../widgets/ReadingPane";
import Articles from "../widgets/Articles";
import SubscriptionList from "../widgets/SubscriptionList";

import styles from "./Reader.module.css";

export default function ReaderPage() {
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState(null);
  const [currentArticleId, setCurrentArticleId] = useState(null);

  console.log({ currentSubscriptionId }, { currentArticleId });

  return (
    <div className={styles.reader}>
      <SubscriptionList
        subscriptionId={currentSubscriptionId}
        setSubscriptionId={setCurrentSubscriptionId}
      />
      <Articles
        subscriptionId={currentSubscriptionId}
        articleId={currentArticleId}
        setArticleId={setCurrentArticleId}
      />
      <ReadingPane articleId={currentArticleId} />
    </div>
  );
}
