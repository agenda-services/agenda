import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layouts/MainLayout";
import { Appointments } from "./pages/Appointments";
import { Login } from "./pages/Login";
import { getAccount } from "./services/accounts/user";
import { useEffect } from "react";
import { callbackGoogle } from "./services/accounts/auth";
import { Calendar } from "./components/Calendar";
import { Clients } from "./pages/Clients";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isLogged") === "true";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get("code");

  useEffect(() => {
    getAccount()
      .then(() => localStorage.setItem("isLogged", "true"))
      .catch(() => localStorage.setItem("isLogged", "false"));
  }, []);

  if (code) {
    callbackGoogle(code).then(() => navigate("/"));
    return <p>Cargando...</p>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Appointments />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="request" element={<Calendar />} />
        <Route
          path="clients"
          element={
            <MainLayout>
              <Clients />
            </MainLayout>
          }

        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
