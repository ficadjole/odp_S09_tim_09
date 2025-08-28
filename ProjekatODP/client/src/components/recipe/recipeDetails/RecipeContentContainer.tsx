import React, { useEffect, useState } from "react";
import type { Recipe } from "../../../models/recipe/Recipe";
import { RecipeContent } from "./RecipeContent";
import type { IReceptApiService } from "../../../api_services/recept_api/IReceptApiService";

interface RecipeContentContainerProps {
  token: string;
  idRecepta: number;
  recipesApi: IReceptApiService;
}

export const RecipeContentContainer: React.FC<RecipeContentContainerProps> = ({
  token,
  idRecepta,
  recipesApi,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!token) return;
    recipesApi.getRecipeById(token, idRecepta).then(setRecipe);
  }, [token, idRecepta]);

  if (!recipe) return <p>Loading recipe content...</p>;

  return <RecipeContent recipe={recipe} />;
};
