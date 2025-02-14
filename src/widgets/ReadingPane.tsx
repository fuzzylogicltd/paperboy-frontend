import useGetArticle from "../hooks/useGetArticle";

export default function ReadingPane({ articleId }) {
  const { isPending, isError, data, error } = useGetArticle(articleId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="article-list">
      <h3>{data.data.article.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: data.data.article.body }} />
    </div>
  );
}
