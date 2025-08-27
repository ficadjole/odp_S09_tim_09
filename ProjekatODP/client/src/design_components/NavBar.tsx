import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";
import userPic from "../pictures/user.png";
import logoPic from "../pictures/log.png";

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logoPic} alt="Logo" className="logo" />
      </div>

      <div className="navbar-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Explore
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Profile
        </NavLink>
      </div>

      <div className="navbar-right">
        <img src={userPic} alt="User png" className="userPng" height={20} />
        <span className="username">{username}</span>
      </div>
    </nav>
  );
};

export default Navbar;
