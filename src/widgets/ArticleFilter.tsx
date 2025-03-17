import { Dispatch, SetStateAction } from "react";
import { RadioGroup } from "radix-ui";
import styles from "./ArticleFilter.module.css";
import { ArticleFilterOptions } from "../api/types";

interface ArticleFilterProps {
  articleFilter: ArticleFilterOptions;
  setArticleFilter: Dispatch<SetStateAction<ArticleFilterOptions>>;
}

const articleFilterOptions = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read History" },
  { key: "starred", label: "Starred" },
];

const ArticleFilter = ({
  articleFilter,
  setArticleFilter,
}: ArticleFilterProps) => (
  <form>
    <RadioGroup.Root
      className={styles.Root}
      defaultValue="all"
      aria-label="Article Type"
      onValueChange={(value: ArticleFilterOptions) => setArticleFilter(value)}
      value={articleFilter}
    >
      {articleFilterOptions.map((option) => {
        return (
          <div key={option.key}>
            <RadioGroup.Item
              className={styles.Item}
              value={option.key}
              id={option.key}
            >
              <RadioGroup.Indicator className={styles.Indicator} />
            </RadioGroup.Item>
            <label className={styles.Label} htmlFor={option.key}>
              {option.label}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  </form>
);

export default ArticleFilter;
