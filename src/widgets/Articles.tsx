import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { convertToRelativeTime } from "../utils/formatDateTime";
import useGetArticles from "../hooks/useGetArticles";
import {
  ISubscription,
  IRead,
  IArticle,
  ArticleFilterOptions,
} from "../api/types";

import styles from "./Articles.module.css";
import useUpdateArticle from "../hooks/useUpdateArticle";

interface ArticlesProps {
  currentSubscription: ISubscription | null;
  currentArticle: IArticle | null;
  setArticle: Dispatch<SetStateAction<IArticle | null>>;
  articleFilter: ArticleFilterOptions;
}

export default function Articles({
  currentSubscription,
  currentArticle,
  setArticle,
  articleFilter,
}: ArticlesProps) {
  const [pageCursor, setPageCursor] = useState(null);
  const [reads, setReads] = useState<IRead[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const articlesDivRef = useRef<HTMLDivElement | null>(null);

  const { isPending, isError, data, error } = useGetArticles(
    currentSubscription?.feed?.id,
    pageCursor,
    articleFilter
  );

  const { mutateRead } = useUpdateArticle();

  // TODO:
  // - Reduce number of component re-renders
  // - Try to avoid list flash when setting scroll pos (could be related to previous?)

  useEffect(
    function resetStateOnSubscriptionOrFilterChange() {
      setReads([]);
      setPageCursor(null);
      setScrollPosition(0);
      setArticle(null);
    },
    [currentSubscription?.feed?.id, articleFilter]
  );

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

      setReads((prevReads) => {
        const currentReads = [...prevReads];

        data.data.forEach((read: IRead) => {
          const readIndex = currentReads.findIndex(
            (currentRead) => currentRead.article.id === read.article.id
          );

          if (readIndex !== -1) {
            currentReads.splice(readIndex, 1, read);
          } else {
            currentReads.push(read);
          }
        });

        return currentReads;
      });
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

  const handleArticleClick = (article: IArticle) => {
    setArticle(article);

    // TODO: set article style to read at this point

    const read: IRead = {
      article: article,
    };

    mutateRead.mutate(read);
  };

  return (
    <div className={styles.articles} ref={articlesDivRef}>
      {isPending && <span>Loading...</span>}
      {isError && <span>Error: {error?.message}</span>}

      {reads && (
        <ul role="list">
          {reads.length > 0 &&
            reads.map((read) => {
              const article = read.article;
              const articleClasses = classNames({
                [styles.isRead]: read.read,
                [styles.selected]: currentArticle?.id === article.id,
              });
              return (
                <li
                  key={read.article.id}
                  onClick={() => handleArticleClick(article)}
                  className={articleClasses}
                >
                  <h3>{article.title}</h3>
                  <h4>{article.feed.name}</h4>
                  <p className={styles.shortDescription}>
                    {article.description?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      className={styles.articleImage}
                    />
                  )}
                  <div className={styles.articleAge}>
                    {convertToRelativeTime(article.datePublished)}
                  </div>
                </li>
              );
            })}
          <div ref={observerRef} className={styles.observer}></div>
        </ul>
      )}
    </div>
  );
}
