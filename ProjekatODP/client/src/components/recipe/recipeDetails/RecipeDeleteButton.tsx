import React from "react";
import type { Recipe } from "../../../models/recipe/Recipe";

interface RecipeDeleteButtonProps {
  recipe: Recipe;
  onDelete: () => void;
  userRole: string | undefined;
}

export const RecipeDeleteButton: React.FC<RecipeDeleteButtonProps> = ({
  recipe,
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
