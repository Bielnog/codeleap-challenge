import "./App.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const isLoggedIn = localStorage.getItem("username");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<SignUp />} />
        <Route
          path="/main"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
