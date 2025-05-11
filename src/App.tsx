import "./App.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import MainPage from "./pages/MainPage/MainPage";
import getUsername from "./utils/getUsername";

function App() {
  const isLoggedIn = getUsername();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/codeleap-challenge"
          element={
            isLoggedIn ? (
              <Navigate to="/codeleap-challenge/main" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/codeleap-challenge/login" element={<SignUp />} />
        <Route
          path="/codeleap-challenge/main"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
