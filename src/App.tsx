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
        path="/"
        element={
          user ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/login"
        element={
          user ? <Navigate to="/main" replace /> : <ModalLogin />
        }
      />
      <Route
        path="/signup"
        element={
          user ? <Navigate to="/main" replace /> : <ModalSignUp />
        }
      />
      <Route
        path="/guest"
        element={
          user ? <Navigate to="/main" replace /> : <ModalGuest />
        }
      />

      <Route
        path="/main"
        element={
          user ? <MainPage /> : <Navigate to="/login" replace />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
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
