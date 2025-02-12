import ReaderPage from "./Reader";
import SplashPage from "./Splash";

export default function HomePage() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <SplashPage />;
  }

  return <ReaderPage />;
}
