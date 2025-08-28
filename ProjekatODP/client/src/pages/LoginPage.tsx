import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import type { IAuthAPIService } from "../api_services/auth/IAuthAPIService";
import { useAuth } from "../hooks/auth/authHook";
import "../styles/pages/Auth.css";

interface LoginPageProps {
  authApi: IAuthAPIService;
}

export default function LoginPage({ authApi }: LoginPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/home");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="auth-container">
      <LoginForm authApi={authApi} />
    </div>
  );
}
