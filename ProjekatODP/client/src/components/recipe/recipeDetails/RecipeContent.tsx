import React from "react";
import type { Recipe } from "../../../models/recipe/Recipe";

interface RecipeContentProps {
  recipe: Recipe;
}

export const RecipeContent: React.FC<RecipeContentProps> = ({ recipe }) => {
  return (
    <div className="recipe-content">
      <div className="recipe-section">
        <div className="recipe-details"><h2>Ingredients</h2></div>
        
        <ul>{recipe.sastojic}</ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <p>{recipe.opis}</p>
      </div>

      <div className="recipe-section">
        <h2>Advice</h2>
        <p>{recipe.saveti}</p>
      </div>
    </div>
  );
};
