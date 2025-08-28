import React, { useEffect, useState } from "react";
import type { Recipe } from "../../../models/recipe/Recipe";
import { RecipeHeader } from "./RecipeHeader";
import type { IReceptApiService } from "../../../api_services/recept_api/IReceptApiService";

interface RecipeHeaderContainerProps {
  token: string | null;
  idRecepta: number;
  recipesApi: IReceptApiService;
}

export const RecipeHeaderContainer: React.FC<RecipeHeaderContainerProps> = ({
  token,
  idRecepta,
  recipesApi,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!token) return;
    recipesApi.getRecipeById(token, idRecepta).then(setRecipe);
  }, [token, idRecepta]);

  if (!recipe) return <p>Loading recipe...</p>;

  return <RecipeHeader recipe={recipe} />;
};
