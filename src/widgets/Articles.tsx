import useGetArticles from "../hooks/useGetArticles";

import styles from "./Articles.module.css";

export default function Articles({ subscriptionId, articleId, setArticleId }) {
  const { isPending, isError, data, error } = useGetArticles(subscriptionId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const handleArticleClick = (articleId: number) => {
    setArticleId(articleId);
  };

  return (
    <div className="article-list">
      <ul>
        {data &&
          data.map((read) => {
            return (
              <li
                key={read.article.id}
                onClick={() => handleArticleClick(read.article.id)}
                className={articleId === read.article.id ? styles.selected : ""}
              >
                {decodeURIComponent(read.article.title)}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
