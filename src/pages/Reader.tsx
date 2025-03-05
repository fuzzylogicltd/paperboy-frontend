import { useState } from "react";
import ReadingPane from "../widgets/ReadingPane";
import Articles from "../widgets/Articles";
import SubscriptionList from "../widgets/SubscriptionList";

import styles from "./Reader.module.css";
import { IArticle, ArticleFilterOptions, ISubscription } from "../api/types";

export default function ReaderPage() {
  const [currentSubscription, setCurrentSubscription] =
    useState<ISubscription | null>(null);
  const [currentArticle, setCurrentArticle] = useState<IArticle | null>(null);
  const [articleFilter, setArticleFilter] =
    useState<ArticleFilterOptions>("all");

  return (
    <div className={styles.reader}>
      <div className={styles.navigationPanes}>
        <SubscriptionList
          currentSubscription={currentSubscription}
          setCurrentSubscription={setCurrentSubscription}
          articleFilter={articleFilter}
          setArticleFilter={setArticleFilter}
        />
        <Articles
          currentSubscription={currentSubscription}
          currentArticle={currentArticle}
          setArticle={setCurrentArticle}
          articleFilter={articleFilter}
        />
      </div>
      <ReadingPane articleId={currentArticle ? currentArticle.id : null} />
    </div>
  );
}
