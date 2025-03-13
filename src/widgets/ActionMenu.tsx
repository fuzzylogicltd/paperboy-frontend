import { DropdownMenu } from "radix-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { IRead } from "../api/types";
import useUpdateArticle from "../hooks/useUpdateArticle";

import styles from "./ActionMenu.module.css";

interface UserMenuProps {
  feedName: string | undefined;
  read: IRead | null;
}

const ActionMenu = ({ feedName, read }: UserMenuProps) => {
  const handleLoguout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  const { mutateRead } = useUpdateArticle();

  const handleStarArticleToggle = () => {
    if (!read) {
      return;
    }

    const updatedRead: IRead = { ...read, starred: !read.starred };
    mutateRead.mutate(updatedRead);
  };

  return (
    <div className={styles.actionMenu}>
      <div className={styles.feedName}>{feedName}</div>
      <div className={styles.actionButtons}>
        <div>
          {read && (
            <button
              className="iconButton"
              aria-label="Star article"
              onClick={() => handleStarArticleToggle()}
            >
              <FontAwesomeIcon icon={read.starred ? faStarSolid : faStar} />
            </button>
          )}
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="iconButton" aria-label="User menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className={styles.Content} sideOffset={5}>
              <DropdownMenu.Item
                className={styles.Item}
                onClick={handleLoguout}
              >
                Log out
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className={styles.Arrow} />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default ActionMenu;
