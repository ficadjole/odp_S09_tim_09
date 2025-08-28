import React from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import "../../styles/recipe/RecipeCard.css";

interface RecipeCardProps {
  recipe: ReceptListaDto;
  openRecipe: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, openRecipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.slika_url} alt={recipe.nazivR} />
      <div className="recipe-info">
        <h3>{recipe.nazivR}</h3>
        <h3>Created at: {new Date(recipe.date).toDateString()}</h3>
        <button className="read-more" onClick={() => openRecipe(recipe.idRecepta)}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
