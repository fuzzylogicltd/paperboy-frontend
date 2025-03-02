import { useEffect, useState, useRef } from "react";
import convertToRelativeTime from "../utils/relativeTime";
import useGetArticles from "../hooks/useGetArticles";
import { ISubscription, IRead, IArticle } from "../api/types";

import styles from "./Articles.module.css";
import useUpdateArticle from "../hooks/useUpdateArticle";

interface ArticlesProps {
  currentSubscription: ISubscription | null;
  currentArticle: IArticle | null;
  setArticle: Function;
}

export default function Articles({
  currentSubscription,
  currentArticle,
  setArticle,
}: ArticlesProps) {
  const [pageCursor, setPageCursor] = useState(null);
  const [reads, setReads] = useState<IRead[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const articlesDivRef = useRef<HTMLDivElement | null>(null);

  const { isPending, isError, data, error } = useGetArticles(
    currentSubscription?.feed?.id,
    pageCursor
  );

  const { mutateRead } = useUpdateArticle();

  // TODO:
  // - Reduce number of component re-renders
  // - Try to avoid list flash when setting scroll pos (could be related to previous?)

  useEffect(
    function updateEndlessScrollOnDataChange() {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            data?.pageCursor &&
            articlesDivRef.current
          ) {
            const scrollPos = articlesDivRef?.current.scrollTop;
            setScrollPosition(scrollPos);
            setPageCursor(data.pageCursor);
          }
        },
        { threshold: 0.5 }
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
    [currentSubscription?.feed?.id]
  );

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const handleArticleClick = (article: IArticle) => {
    setArticle(article);

    const read: IRead = {
      starred: false,
      article: article,
    };

    mutateRead.mutate(read);
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
                onClick={() => handleArticleClick(article)}
                className={
                  currentArticle?.id === article.id ? styles.selected : ""
                }
              >
                <h3>{article.title}</h3>
                <h4>{article.feed.name}</h4>
                <p className={styles.shortDescription}>
                  {article.description?.replace(/<\/?[^>]+(>|$)/g, "")}
                </p>
                {article.imageUrl && (
                  <img src={article.imageUrl} className={styles.articleImage} />
                )}
                <div className={styles.articleAge}>
                  {convertToRelativeTime(article.datePublished)}
                </div>
              </li>
            );
          })}
        <div ref={observerRef} className={styles.observer}></div>
      </ul>
    </div>
  );
}
