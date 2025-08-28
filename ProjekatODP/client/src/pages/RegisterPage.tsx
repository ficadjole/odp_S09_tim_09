import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import type { IAuthAPIService } from "../api_services/auth/IAuthAPIService";
import { useAuth } from "../hooks/auth/authHook";
import "../styles/pages/Auth.css";

interface RegisterPageProps {
  authApi: IAuthAPIService;
}

export default function RegisterPage({ authApi }: RegisterPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/explore");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="auth-container">
      <RegisterForm authApi={authApi} />
    </div>
  );
}
