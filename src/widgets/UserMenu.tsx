import { DropdownMenu } from "radix-ui";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import styles from "./UserMenu.module.css";

const handleLoguout = () => {
  localStorage.removeItem("token");
  location.reload();
};

const UserMenu = ({ feedName }) => {
  return (
    <div className={styles.userMenu}>
      <div className={styles.feedName}>{feedName}</div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.IconButton} aria-label="User menu">
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.Content} sideOffset={5}>
            <DropdownMenu.Item className={styles.Item} onClick={handleLoguout}>
              Log out
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className={styles.Arrow} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default UserMenu;
