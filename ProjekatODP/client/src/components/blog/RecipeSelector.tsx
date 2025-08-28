import React, { useEffect } from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";

interface RecipeSelectorProps {
  token: string | null;
  recipesApi: typeof import("../../api_services/recept_api/ReceptApiService").recipesApi;
  allRecipes: ReceptListaDto[];
  setAllRecipes: React.Dispatch<React.SetStateAction<ReceptListaDto[]>>;
  selectedRecipes: ReceptListaDto[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<ReceptListaDto[]>>;
}

export const RecipeSelector: React.FC<RecipeSelectorProps> = ({
  token,
  recipesApi,
  allRecipes,
  setAllRecipes,
  selectedRecipes,
  setSelectedRecipes,
}) => {
  useEffect(() => {
    if (!token) return;
    recipesApi.getAllRecipes(token).then(setAllRecipes);
  }, [token, recipesApi, setAllRecipes]);

  return (
    <div className="form-group">
      <label>Select Recommended Recipes</label>
      <select
        multiple
        value={selectedRecipes.map((r) => r.idRecepta.toString())}
        onChange={(e) => {
          const selectedIds = Array.from(e.target.selectedOptions).map((o) =>
            Number(o.value)
          );
          const newSelected = allRecipes.filter((r) =>
            selectedIds.includes(r.idRecepta)
          );
          setSelectedRecipes(newSelected);
        }}
      >
        {allRecipes.map((recipe) => (
          <option key={recipe.idRecepta} value={recipe.idRecepta.toString()}>
            {recipe.nazivR}
          </option>
        ))}
      </select>
    </div>
  );
};
