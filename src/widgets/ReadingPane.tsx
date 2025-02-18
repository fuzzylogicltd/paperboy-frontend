import useGetArticle from "../hooks/useGetArticle";

import styles from "./ReadingPane.module.css";

export default function ReadingPane({ articleId }) {
  const { isPending, isError, data, error } = useGetArticle(articleId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <div className={styles.readingPane}>
      <div className={styles.wrapper}>
        <h3>{data.article.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: data.article.body }} />
      </div>
    </div>
  );
}
