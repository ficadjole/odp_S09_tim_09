import React, { useMemo } from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import type { LikeDto } from "../../models/like/LikeDto";
import RecipeCard from "../recipe/RecipeCard";

interface Props {
  recipes: ReceptListaDto[];
  likes: LikeDto[];
  openRecipe: (id: number) => void;
}

const PopularRecipes: React.FC<Props> = ({ recipes, likes, openRecipe }) => {
  const popularRecipes = useMemo(() => {
    return recipes
      .slice()
      .sort((a, b) => {
        const likesA =
          likes.find((l) => l.idRecepta === a.idRecepta)?.brojLajkova || 0;
        const likesB =
          likes.find((l) => l.idRecepta === b.idRecepta)?.brojLajkova || 0;
        return likesB - likesA;
      })
      .slice(0, 6);
  }, [recipes, likes]);

  return (
    <section className="recipes-section">
      <h2>Popular Recipes</h2>
      <div className="recipes-grid">
        {popularRecipes.map((recipe) => (
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

export default PopularRecipes;
