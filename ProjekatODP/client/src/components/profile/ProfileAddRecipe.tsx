import React from "react";
//import type { UserLogin } from "../../models/auth/UserLogin";
import "../../styles/profile/ProfileButtons.css";

interface Props {
  navigate: (path: string) => void;
}

const ProfileAddRecipe: React.FC<Props> = ({ navigate }) => (
  <div className="add-recipe-section">
    <button
      className="add-recipe-btn"
      onClick={() => navigate("/add-recipe")}
    >
      + Add New Recipe
    </button>
  </div>
);

export default ProfileAddRecipe;
