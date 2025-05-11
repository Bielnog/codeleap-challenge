import { AuthProvider, useAuth } from "./utils/AuthContext";
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ModalLogin from "./components/BaseComponents/ModalLogin/ModalLogin";
import ModalSignUp from "./components/ModalSignUp/ModalSignUp";
import ModalGuest from "./components/BaseComponents/ModalLogin/ModalGuest";

function RoutesWithAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Routes>
      <Route
        path="/codeleap-challenge"
        element={
          user ? (
            <Navigate to="/codeleap-challenge/main" replace />
          ) : (
            <Navigate to="/codeleap-challenge/login" replace />
          )
        }
      />

      <Route
        path="/codeleap-challenge/login"
        element={
          user ? (
            <Navigate to="/codeleap-challenge/main" replace />
          ) : (
            <ModalLogin />
          )
        }
      />
      <Route
        path="/codeleap-challenge/signup"
        element={
          user ? (
            <Navigate to="/codeleap-challenge/main" replace />
          ) : (
            <ModalSignUp />
          )
        }
      />
      <Route
        path="/codeleap-challenge/guest"
        element={
          user ? (
            <Navigate to="/codeleap-challenge/main" replace />
          ) : (
            <ModalGuest />
          )
        }
      />

      <Route
        path="/codeleap-challenge/main"
        element={
          user ? (
            <MainPage />
          ) : (
            <Navigate to="/codeleap-challenge/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/codeleap-challenge" replace />} />
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
