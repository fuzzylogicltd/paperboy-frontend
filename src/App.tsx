import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import UserForm from "./pages/UserForm";
import HomePage from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<UserForm formType="signin" />} />
          <Route path="/signup" element={<UserForm formType="signup" />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route path="*" /> TODO: make 404 */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
