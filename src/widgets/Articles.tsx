import useGetArticles from "../hooks/useGetArticles";

export default function Articles({ subscriptionId, setArticleId }) {
  const { isPending, isError, data, error } = useGetArticles(subscriptionId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleArticleClick = (articleId: number) => {
    setArticleId(articleId);
  };

  return (
    <div className="article-list">
      <ul>
        {data &&
          data.data.map((article) => {
            return (
              <li
                key={article.article.id}
                onClick={() => handleArticleClick(article.article.id)}
              >
                {article.article.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
