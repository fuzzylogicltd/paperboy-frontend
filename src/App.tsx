import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route path="*" /> TODO: make 404 */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
