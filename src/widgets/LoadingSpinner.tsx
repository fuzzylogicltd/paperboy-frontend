import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <span className={styles.spinner}></span>
    </div>
  );
}
