import useGetArticle from "../hooks/useGetArticle";
import UserMenu from "./UserMenu";
import { convertToHumanReadableDateAndTime } from "../utils/formatDateTime";

import styles from "./ReadingPane.module.css";

interface ReadingPaneProps {
  articleId: number | null;
}

export default function ReadingPane({ articleId }: ReadingPaneProps) {
  const { isPending, isError, data, error } = useGetArticle(articleId);

  return (
    <div className={styles.readingPane}>
      <UserMenu feedName={data?.article.feed.name} />
      <div className={styles.wrapper}>
        {isPending && articleId && <span>Loading...</span>}
        {isError && <span>Error: {error?.message}</span>}

        {data?.article && (
          <>
            <h1>{data.article.title}</h1>
            <div className={styles.articleMeta}>
              <h2>
                {data.article.datePublished &&
                  convertToHumanReadableDateAndTime(data.article.datePublished)}
                {data.article.author && ` by ${data.article.author}`} -{" "}
                <a href={data.article.url} target="_blank">
                  Original
                </a>
              </h2>
            </div>
            <div
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: data.article.body }}
            />
          </>
        )}
      </div>
    </div>
  );
}
