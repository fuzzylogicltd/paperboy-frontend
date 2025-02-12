import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
    <>
      <h1>Paperboy Feed Reader</h1>
      <p>Welcome to this very nice feed reader</p>
      <p>
        <Link to="/signin">Sign in</Link>
      </p>
    </>
  );
}
