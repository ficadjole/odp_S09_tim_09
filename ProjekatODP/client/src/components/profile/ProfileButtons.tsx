import React from "react";
import { Uloga } from "../../models/auth/UserRole";
import "../../styles/profile/ProfileButtons.css";
import type { NavigateFunction } from "react-router-dom";

interface Props {
  user: {
    username: string;
    uloga: Uloga;
    id: number;
  };
  navigate: NavigateFunction;
}

const ProfileButtons: React.FC<Props> = ({ user }) => (
  <div className="buttons-wrapper">
    <div className="buttons-container">
      <p>Welcome, {user.username}!</p>
    </div>
  </div>
);

export default ProfileButtons;
