import React from "react";

interface RecipeDeleteButtonProps {
  onDelete: () => void;
  userRole: string | undefined;
}

export const RecipeDeleteButton: React.FC<RecipeDeleteButtonProps> = ({
  onDelete,
  userRole,
}) => {
  if (userRole !== "moderator") return null;

  return (
    <div className="delete-recipe-container">
      <button className="delete-recipe-btn" onClick={onDelete}>
        🗑 Delete Recipe
      </button>
    </div>
  );
};
