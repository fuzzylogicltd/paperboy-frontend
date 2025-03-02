import { useState } from "react";
import ReadingPane from "../widgets/ReadingPane";
import Articles from "../widgets/Articles";
import SubscriptionList from "../widgets/SubscriptionList";

import styles from "./Reader.module.css";
import { IArticle } from "../api/types";

export default function ReaderPage() {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [currentArticle, setCurrentArticle] = useState<IArticle | null>(null);

  return (
    <div className={styles.reader}>
      <div className={styles.navigationPanes}>
        <SubscriptionList
          currentSubscription={currentSubscription}
          setCurrentSubscription={setCurrentSubscription}
        />
        <Articles
          currentSubscription={currentSubscription}
          currentArticle={currentArticle}
          setArticle={setCurrentArticle}
        />
      </div>
      <ReadingPane articleId={currentArticle ? currentArticle.id : null} />
    </div>
  );
}
