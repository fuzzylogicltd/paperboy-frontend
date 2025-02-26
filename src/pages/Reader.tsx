import { useState } from "react";
import ReadingPane from "../widgets/ReadingPane";
import Articles from "../widgets/Articles";
import SubscriptionList from "../widgets/SubscriptionList";

import styles from "./Reader.module.css";

export default function ReaderPage() {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [currentArticleId, setCurrentArticleId] = useState(null);

  return (
    <div className={styles.reader}>
      <div className={styles.navigationPanes}>
        <SubscriptionList
          currentSubscription={currentSubscription}
          setCurrentSubscription={setCurrentSubscription}
        />
        <Articles
          currentSubscription={currentSubscription}
          articleId={currentArticleId}
          setArticleId={setCurrentArticleId}
        />
      </div>
      <ReadingPane articleId={currentArticleId} />
    </div>
  );
}
