import useGetArticle from "../hooks/useGetArticle";
import UserMenu from "./UserMenu";

import styles from "./ReadingPane.module.css";

export default function ReadingPane({ articleId }) {
  const { isPending, isError, data, error } = useGetArticle(articleId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const article = data.article;

  return (
    <div className={styles.readingPane}>
      <UserMenu />
      <div className={styles.wrapper}>
        <h2>{article.title}</h2>
        <h3>
          {article.datePublished && article.datePublished}
          {article.author && ` by ${article.author}`} -{" "}
          <a href={article.url} target="_blank">
            Original
          </a>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </div>
  );
}
