import React, { useEffect, useState } from "react";
import type { Recipe } from "../../../models/recipe/Recipe";
import { RecipeHeader } from "./RecipeHeader";
import type { IReceptApiService } from "../../../api_services/recept_api/IReceptApiService";

interface RecipeHeaderContainerProps {
  token: string | null;
  recipeId: number;
  recipesApi: IReceptApiService;
}

export const RecipeHeaderContainer: React.FC<RecipeHeaderContainerProps> = ({
  token,
  recipeId,
  recipesApi,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!token) return;
    recipesApi.getRecipeById(token, recipeId).then(setRecipe);
  }, [token, recipeId]);

  if (!recipe) return <p>Loading recipe...</p>;

  return <RecipeHeader recipe={recipe} />;
};
