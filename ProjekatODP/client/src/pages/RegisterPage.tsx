import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import { useAuth } from "../hooks/auth/authHook";
import "../styles/pages/Auth.css";

export default function RegisterPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/explore");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="auth-container">
      <RegisterForm/>
    </div>
  );
}
