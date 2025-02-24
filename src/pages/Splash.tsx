import { Link } from "react-router-dom";

import styles from "./Splash.module.css";

export default function SplashPage() {
  return (
    <div className={styles.splash}>
      <div className={styles.wrapper}>
        <h1>Paperboy Feed Reader</h1>
        <p>Welcome to this very nice feed reader</p>
        <p>
          <Link to="/signin" className="button">
            Sign in
          </Link>
        </p>
        <p>
          Or <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
