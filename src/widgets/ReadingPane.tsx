import useGetArticle from "../hooks/useGetArticle";
import UserMenu from "./UserMenu";

import styles from "./ReadingPane.module.css";

// TODO: Clear reading pane when selected feed is changed

export default function ReadingPane({ articleId }) {
  const { isPending, isError, data, error } = useGetArticle(articleId);
  return (
    <div className={styles.readingPane}>
      <UserMenu
        feedName={data?.article.feed.name}
        articleUrl={data?.article.url}
      />
      <div className={styles.wrapper}>
        {isPending && articleId && <span>Loading...</span>}
        {isError && <span>Error: {error?.message}</span>}

        {data?.article && (
          <>
            <h1>{data.article.title}</h1>
            <div className={styles.articleMeta}>
              <h2>
                {data.article.datePublished && data.article.datePublished}
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
