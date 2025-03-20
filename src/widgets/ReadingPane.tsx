import { IRead } from "../api/types";
import useGetArticle from "../hooks/useGetArticle";
import ActionMenu from "./ActionMenu";
import { convertToHumanReadableDateAndTime } from "../utils/formatDateTime";

import styles from "./ReadingPane.module.css";
import LoadingSpinner from "./LoadingSpinner";

interface ReadingPaneProps {
  read: IRead | null;
}

export default function ReadingPane({ read }: ReadingPaneProps) {
  const { isPending, isError, data, error } = useGetArticle(
    read?.article.id ?? null
  );

  return (
    <div className={styles.readingPane}>
      <ActionMenu feedName={data?.article.feed.name} read={data} />
      <div className={styles.wrapper}>
        {isPending && read && <LoadingSpinner />}
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
