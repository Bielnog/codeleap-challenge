import { AuthProvider, useAuth } from "./utils/AuthContext"; // ajuste o caminho
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import MainPage from "./pages/MainPage/MainPage";

function RoutesWithAuth() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/codeleap-challenge"
        element={
          isLoggedIn ? (
            <Navigate to="/codeleap-challenge/main" replace />
          ) : (
            <Navigate to="/codeleap-challenge/login" replace />
          )
        }
      />
      <Route
        path="/codeleap-challenge/login"
        element={
          isLoggedIn ? (
            <Navigate to="/codeleap-challenge/main" replace />
          ) : (
            <SignUp />
          )
        }
      />
      <Route
        path="/codeleap-challenge/main"
        element={
          isLoggedIn ? (
            <MainPage />
          ) : (
            <Navigate to="/codeleap-challenge/login" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesWithAuth />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
