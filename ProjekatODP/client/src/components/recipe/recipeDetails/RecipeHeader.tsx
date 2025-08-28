import React from "react";
import type { Recipe } from "../../../models/recipe/Recipe";
import "../../../styles/pages/Recipe.css";

interface RecipeHeaderProps {
  recipe: Recipe;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe }) => {
  return (
    <div className="recipe-header">
      <img src={recipe.slika_url} alt={recipe.nazivR} />
      <h1>{recipe.nazivR}</h1>
      <h3>Category: {recipe.kategorije.map((k) => k.nazivK).join(" ")}</h3>
      <p>By {recipe.author.username}</p>
      <p>Created at: {new Date(recipe.date).toLocaleDateString()}</p>
    </div>
  );
};
