import React from "react";

interface ProfileHeaderProps {
  username: string;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, email }) => (
  <div className="profile-header">
    <h1>{username}</h1>
    <p>{email}</p>
  </div>
);

export default ProfileHeader;
