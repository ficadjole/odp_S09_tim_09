import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/authHook";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    logout();

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "linear-gradient(135deg, #196c53, #4caf7f)",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "12px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginLeft: "30px",
      }}
    >
      Logout
    </button>

  );
};

export default LogoutButton;
