import React,  {useState} from "react";
import "../styles/Auth.css";
import { useNavigate, Link } from "react-router-dom";

const LoginPage: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const confirmLogin = () =>{
    if (password==="" ||  username ==="") {
      alert("Fill in all fields");
      return;
    } 
    navigate("/home");
     
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        <button onClick={confirmLogin}>Login</button>
        <p>
          Don’t have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;