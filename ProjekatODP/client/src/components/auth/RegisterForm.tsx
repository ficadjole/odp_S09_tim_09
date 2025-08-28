import React, { useState } from "react";
import { usersApi } from "../../api_services/auth/AuthAPIService";
import { Uloga } from "../../models/auth/UserRole";
import type { AuthResponse } from "../../types/auth/AuthResponse";
import { useAuth } from "../../hooks/auth/authHook";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [greska, setGreska] = useState("");
  const [uloga] = useState(Uloga.korisnik);

  const { login } = useAuth();

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
        email,
        password,
        uloga
      );

      if (newUser.success && newUser.data) {
        login(newUser.data);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setGreska(newUser.message || "Registracija nije uspela");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
      setGreska("Došlo je do greške prilikom registracije");
    }
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <form onSubmit={confirmRegistration} className="space-y-4">
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
