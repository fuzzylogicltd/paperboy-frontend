import { useEffect, useState, useRef } from "react";
import moment from "moment";
import useGetArticles from "../hooks/useGetArticles";

import styles from "./Articles.module.css";

export default function Articles({ subscriptionId, articleId, setArticleId }) {
  const [pageCursor, setPageCursor] = useState(null);
  const [reads, setReads] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const observerRef = useRef(null);
  const articlesDivRef = useRef(null);

  const { isPending, isError, data, error } = useGetArticles(
    subscriptionId,
    pageCursor
  );

  console.log("load articles");

  // TODO:
  // - Reduce number of component re-renders
  // - Try to avoid list flash when setting scroll pos (could be related to previous?)

  useEffect(
    function updateEndlessScrollOnDataChange() {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && data?.pageCursor) {
            const scrollPos = articlesDivRef?.current.scrollTop;
            setScrollPosition(scrollPos);
            setPageCursor(data.pageCursor);
          }
        },
        { threshold: 1.0 }
      );

      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current);
        }
      };
    },
    [data]
  );

  useEffect(
    function updateReadsStateOnDataChange() {
      if (!data) {
        return;
      }

      setReads((prevReads) => [...prevReads, ...data.data]);
    },
    [data]
  );

  useEffect(
    function setScrollPositionOfArticleListOnArticleLoad() {
      if (articlesDivRef.current) {
        articlesDivRef.current.scrollTop = scrollPosition;
      }
    },
    [reads]
  );

  useEffect(
    function resetEndlessScrollPositionOnSubscriptionChange() {
      setReads([]);
      setPageCursor(null);
      setScrollPosition(0);
    },
    [subscriptionId]
  );

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
    <div className={styles.articles} ref={articlesDivRef}>
      <ul role="list">
        {reads.length > 0 &&
          reads.map((read) => {
            const article = read.article;
            return (
              <li
                key={read.article.id}
                onClick={() => handleArticleClick(article.id)}
                className={articleId === article.id ? styles.selected : ""}
              >
                <h3>{article.title}</h3>
                <h4>{article.feed.name}</h4>
                <p className="shortDescription">
                  {article.description.replace(/<\/?[^>]+(>|$)/g, "")}
                </p>
                {article.imageUrl && (
                  <img src={article.imageUrl} className={styles.articleImage} />
                )}
                <div className={styles.articleAge}>
                  {moment(article.datePublished).fromNow()}
                </div>
              </li>
            );
          })}
        <div ref={observerRef} className={styles.observer}></div>
      </ul>
    </div>
  );
}
