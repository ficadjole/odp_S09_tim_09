import React, {useState} from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import type { UserLogin }  from "../models/auth/UserLogin"

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const confirmRegistration = () =>{
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password==="" || name ==="" || username ==="" || confirmPassword ==="" || email === "") {
      alert("Fill in all fields");
      return;
    } 

    const newUser: UserLogin = {
    id: crypto.randomUUID(),
    username,
    email,
    password,
    role: "Visitor",
    };
    
    navigate("/home");

  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
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