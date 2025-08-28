import React from "react";
import "../../styles/profile/ProfileHeader.css"

interface ProfileHeaderProps {
  user: {
    username: string;
    email: string;
    uloga: string;
  };
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
