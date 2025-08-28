/* import React from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import RecipeCard from "../recipe/RecipeCard";
import type { IReceptApiService } from "../../api_services/recept_api/IReceptApiService";

interface UserRecipesListProps {
  recipes: ReceptListaDto[];
  openRecipe: (id: number) => void;
  recipesApi: IReceptApiService;
}

const UserRecipesList: React.FC<UserRecipesListProps> = ({
  recipes,
  openRecipe,
  recipesApi,
}) => {
  if (recipes.length === 0) {
    return <p className="no-results">No recipes found.</p>;
  }

  return (
    <div className="explore-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idRecepta}
          recipe={recipe}
          openRecipe={openRecipe}
        />
      ))}
    </div>
  );
};

export default UserRecipesList;
 */ import React, { useEffect, useState } from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import RecipeCard from "../recipe/RecipeCard";
import type { IReceptApiService } from "../../api_services/recept_api/IReceptApiService";

interface UserRecipesListProps {
  token: string;
  openRecipe: (id: number) => void;
  recipesApi: IReceptApiService;
  onRecipesLoaded?: (recipes: ReceptListaDto[]) => void;
  filteredRecipes?: ReceptListaDto[]; // filtrirani recepti od parenta
}

const UserRecipesList: React.FC<UserRecipesListProps> = ({
  token,
  openRecipe,
  recipesApi,
  onRecipesLoaded,
  filteredRecipes,
}) => {
  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchRecipes = async () => {
      try {
        const data = await recipesApi.getAllRecipes(token);
        setRecipes(data);
        if (onRecipesLoaded) {
          onRecipesLoaded(data);
        }
      } catch (err) {
        console.error("Greška pri učitavanju recepata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [token, recipesApi]);

  if (loading) return <p>Loading recipes...</p>;

  const recipesToShow = filteredRecipes ?? recipes;

  if (recipesToShow.length === 0) {
    return <p className="no-results">No recipes found.</p>;
  }

  return (
    <div className="explore-grid">
      {recipesToShow.map((recipe) => (
        <RecipeCard
          key={recipe.idRecepta}
          recipe={recipe}
          openRecipe={openRecipe}
        />
      ))}
    </div>
  );
};

export default UserRecipesList;
