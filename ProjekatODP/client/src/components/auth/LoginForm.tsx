import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth/authHook";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";

interface LoginFormProps {
  authApi: IAuthAPIService;
}

export function LoginForm({ authApi }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [greska, setGreska] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setGreska("Popunite sva polja");
      return;
    }

    try {
      const odgovor = await authApi.login(username, password);

      if (odgovor.success && odgovor.data) {
        login(odgovor.data);
      } else {
        setGreska(odgovor.message || "Prijava nije uspela");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setGreska("Došlo je do greške prilikom prijave");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
