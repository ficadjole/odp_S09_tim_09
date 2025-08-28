import React from "react";
import RecipeCard from "../recipe/RecipeCard";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import "../../styles/profile/UserRecipeSection.css";

interface Props {
  recipes: ReceptListaDto[];
  openRecipe: (id: number) => void; 
}

const UserRecipesSection: React.FC<Props> = ({ recipes, openRecipe }) => (
  <div className="recipes1-grid">
    {recipes.map((recipe) => (
      <RecipeCard
        key={recipe.idRecepta}
        recipe={recipe}
        openRecipe={openRecipe} 
      />
    ))}
  </div>
);

export default UserRecipesSection;
