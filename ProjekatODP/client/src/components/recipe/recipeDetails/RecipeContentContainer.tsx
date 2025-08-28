import React, { useEffect, useState } from "react";
import type { Recipe } from "../../../models/recipe/Recipe";
import { RecipeContent } from "./RecipeContent";
import type { IReceptApiService } from "../../../api_services/recept_api/IReceptApiService";

interface RecipeContentContainerProps {
  token: string | null;
  recipeId: number;
  recipesApi: IReceptApiService;
}

export const RecipeContentContainer: React.FC<RecipeContentContainerProps> = ({
  token,
  recipeId,
  recipesApi,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!token) return;
    recipesApi.getRecipeById(token, recipeId).then(setRecipe);
  }, [token, recipeId]);

  if (!recipe) return <p>Loading recipe content...</p>;

  return <RecipeContent recipe={recipe} />;
};
