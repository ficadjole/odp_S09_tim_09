import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { useAuth } from "../hooks/auth/authHook";
import "../styles/Auth.css";

export default function LoginPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/home");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="auth-container">
      <LoginForm />
    </div>
  );
}
