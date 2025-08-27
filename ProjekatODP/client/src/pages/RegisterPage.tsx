import React, {useState} from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../api_services/auth/AuthAPIService";
import { Uloga } from "../models/auth/UserRole";
import type { AuthResponse } from "../types/auth/AuthResponse";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ uloga ] = useState(Uloga.korisnik);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const confirmRegistration = async (e: React.FormEvent) =>{
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password==="" || username ==="" || confirmPassword ==="" || email === "") {
      alert("Fill in all fields");
      return;
    } 
    
    try{
      const newUser: AuthResponse = await usersApi.register(
        0,
        username,
        email,
        password,
        uloga
      );

      if(newUser.success && newUser.data){
        alert("Registration successfull.");
        navigate("/home");
      }
      else{
        alert("Registration failed.");

      }
    }
    catch (error){
      console.error(error);
      alert("Something went wrong");

    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}/>
        <button onClick={confirmRegistration}>Register</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;