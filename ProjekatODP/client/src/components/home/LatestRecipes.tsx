import React, { useMemo } from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import RecipeCard from "../recipe/RecipeCard";

interface Props {
  recipes: ReceptListaDto[];
  openRecipe: (id: number) => void;
}

const LatestRecipes: React.FC<Props> = ({ recipes, openRecipe }) => {
  const latestRecipes = useMemo(() => {
    return recipes
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [recipes]);

  return (
    <section className="recipes-section">
      <h2>New Recipes</h2>
      <div className="recipes-grid">
        {latestRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idRecepta}
            recipe={recipe}
            openRecipe={openRecipe}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestRecipes;
