import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { convertToRelativeTime } from "../utils/formatDateTime";
import useGetArticles from "../hooks/useGetArticles";
import { ISubscription, IRead, ArticleFilterOptions } from "../api/types";

import styles from "./Articles.module.css";
import useUpdateArticle from "../hooks/useUpdateArticle";
import LoadingSpinner from "./LoadingSpinner";

interface ArticlesProps {
  currentSubscription: ISubscription | null;
  currentRead: IRead | null;
  setRead: Dispatch<SetStateAction<IRead | null>>;
  articleFilter: ArticleFilterOptions;
}

export default function Articles({
  currentSubscription,
  currentRead,
  setRead,
  articleFilter,
}: ArticlesProps) {
  const [pageCursor, setPageCursor] = useState(null);
  const [reads, setReads] = useState<IRead[]>([]);

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
      setRead(null);
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

  const handleArticleClick = (clickedRead: IRead): void => {
    const newReads: IRead[] = reads.map((read: IRead) => {
      return read.article.id === clickedRead.article.id
        ? { ...read, read: true }
        : read;
    });

    setReads(newReads);

    const read: IRead = {
      ...clickedRead,
      read: true,
    };

    setRead(read);
    mutateRead.mutate(read);
  };

  return (
    <div className={styles.articles} ref={articlesDivRef}>
      {isPending && <LoadingSpinner />}
      {isError && <span>Error: {error?.message}</span>}
      {/* <LoadingSpinner /> */}
      {reads?.length > 0 && (
        <ul role="list">
          {reads.map((read) => {
            const article = read.article;
            const articleClasses = classNames({
              [styles.isRead]: read.read,
              [styles.selected]: currentRead?.article.id === article.id,
            });
            return (
              <li
                key={read.article.id}
                onClick={() => handleArticleClick(read)}
                className={articleClasses}
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
                  {read.starred && <FontAwesomeIcon icon={faStar} />}
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
