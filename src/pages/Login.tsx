import LoginForm from "../widgets/LoginForm";

import styles from "./Login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <h1>Welcome back</h1>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
