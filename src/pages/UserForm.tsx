import SigninForm from "../widgets/SigninForm";
import SignupForm from "../widgets/SignupForm";

import styles from "./UserForm.module.css";

export default function UserForm({ formType }) {
  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        {formType === "signin" && (
          <>
            <h1>Welcome back</h1>
            <div>
              <SigninForm />
            </div>
          </>
        )}

        {formType === "signup" && (
          <>
            <h1>Sign up</h1>
            <div>
              <SignupForm />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
