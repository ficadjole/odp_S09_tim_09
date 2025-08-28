import React from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import RecipeCard from "../recipe/RecipeCard";

interface UserRecipesListProps {
  recipes: ReceptListaDto[];
  openRecipe: (id: number) => void;
}

const UserRecipesList: React.FC<UserRecipesListProps> = ({ recipes, openRecipe }) => {
  if (recipes.length === 0) {
    return <p className="no-results">No recipes found.</p>;
  }

  return (
    <div className="explore-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idRecepta} recipe={recipe} openRecipe={openRecipe} />
      ))}
    </div>
  );
};

export default UserRecipesList;
