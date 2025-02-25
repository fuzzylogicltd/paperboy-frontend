import useGetArticle from "../hooks/useGetArticle";
import UserMenu from "./UserMenu";

import styles from "./ReadingPane.module.css";

export default function ReadingPane({ articleId }) {
  const { isPending, isError, data, error } = useGetArticle(articleId);
  return (
    <div className={styles.readingPane}>
      <UserMenu />
      <div className={styles.wrapper}>
        {isPending && articleId && <span>Loading...</span>}
        {isError && <span>Error: {error?.message}</span>}

        {data?.article && (
          <>
            <h2>{data.article.title}</h2>
            <h3>
              {data.article.datePublished && data.article.datePublished}
              {data.article.author && ` by ${data.article.author}`} -{" "}
              <a href={data.article.url} target="_blank">
                Original
              </a>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: data.article.body }} />
          </>
        )}
      </div>
    </div>
  );
}
