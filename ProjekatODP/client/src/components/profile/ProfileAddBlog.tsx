import React from "react";
//import type { UserLogin } from "../../models/auth/UserLogin";
//import { Uloga } from "../../models/auth/UserRole";
import "../../styles/profile/ProfileButtons.css";

interface Props {
  navigate: (path: string) => void;
}

const ProfileAddBlog: React.FC<Props> = ({ navigate }) => (
  <div className="add-blog-section">
    <button
      className="add-blog-btn"
      onClick={() => navigate("/add-blog")}
      style={{ backgroundColor: "#196c53", color: "white" }}
    >
      + Add New Blog
    </button>
  </div>
);

export default ProfileAddBlog;
