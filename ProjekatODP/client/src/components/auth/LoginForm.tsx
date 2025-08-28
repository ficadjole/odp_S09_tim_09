import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersApi } from "../../api_services/auth/AuthAPIService";
import { useAuth } from "../../hooks/auth/authHook";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [greska, setGreska] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const confirmLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setGreska("Popunite sva polja");
      return;
    }

    try {
      const odgovor = await usersApi.login(username, password);

      if (odgovor.success && odgovor.data) {
        login(odgovor.data);
        navigate(`/home`);
      } else {
        setGreska(odgovor.message || "Prijava nije uspela");
      }
    } catch (error) {
      console.error(error);
      setGreska("Došlo je do greške prilikom prijave");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={confirmLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {greska && <p className="text-red-600">{greska}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
}
