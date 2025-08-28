import React from "react";
import type { UserLogin } from "../../models/auth/UserLogin";

interface ProfileHeaderProps {
  user: UserLogin;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="profile-header">
      <h1>{user.username}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default ProfileHeader;
