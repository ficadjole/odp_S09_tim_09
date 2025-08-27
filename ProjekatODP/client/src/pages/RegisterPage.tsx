import React, { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../api_services/auth/AuthAPIService";
import { Uloga } from "../models/auth/UserRole";
import type { AuthResponse } from "../types/auth/AuthResponse";
import { useAuth } from "../hooks/auth/authHook"; 

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [greska, setGreska] = useState("");
  const [uloga] = useState(Uloga.korisnik);

  const { login } = useAuth(); 
  const navigate = useNavigate();

  const confirmRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setGreska("Popunite sva polja");
      return;
    }

    if (password !== confirmPassword) {
      setGreska("Lozinke se ne poklapaju");
      return;
    }

    try {
      const newUser: AuthResponse = await usersApi.register(
        username,
        password,
        email,
        uloga
      );

      if (newUser.success && newUser.data) {
        login(newUser.data);
        navigate(`/`);
      } else {
        setGreska(newUser.message || "Registracija nije uspela");
      }
    } catch (error) {
      console.error(error);
      setGreska("Došlo je do greške prilikom registracije");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {greska && <p className="text-red-600">{greska}</p>}
        <button onClick={confirmRegistration}>Register</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
