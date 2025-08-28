import React, { useState } from "react";
import "../styles/pages/Explore.css";
import Navbar from "../components/nav_bar/NavBar";
import { useAuth } from "../hooks/auth/authHook";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import type { KategorijaDto } from "../models/kategorije/KategorijaDto";
import { SearchBar } from "../components/serach_bar/SearchBar";
import { CategoryButtons } from "../components/category_buttons/CategoryButtons";
import type { ICategoryApiService } from "../api_services/category_api/ICategoryApiService";
import UserRecipesList from "../components/user_recipe_list/UserRecipesList";
import type { IReceptApiService } from "../api_services/recept_api/IReceptApiService";

interface ExplorePageProps {
  categoryApiService: ICategoryApiService;
  recipesApi: IReceptApiService;
}

const ExplorePage: React.FC<ExplorePageProps> = ({
  categoryApiService,
  recipesApi,
}) => {
  const { user, token } = useAuth();
  const [selectedCategory, setSelectedCategory] =
    useState<KategorijaDto | null>(null);

  const [allRecipes, setAllRecipes] = useState<ReceptListaDto[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<
    ReceptListaDto[] | null
  >(null);

  const handleRecipesLoaded = (recipes: ReceptListaDto[]) => {
    setAllRecipes(recipes);
    setFilteredRecipes(null); // inicijalno nema filtera
  };

  const handleFilteredRecipes = (filtered: ReceptListaDto[]) => {
    setFilteredRecipes(filtered.length > 0 ? filtered : null);
  };

  const openRecipe = (id: number) => {
    window.location.href = `/recipes/${id}`;
  };

  return (
    <div className="explore-page">
      <Navbar username={user?.username || ""} />

      <h1>Explore Recipes</h1>

      <SearchBar
        recipes={allRecipes} // uvek pretražujemo po svim receptima
        selectedCategory={selectedCategory}
        primiRecept={handleFilteredRecipes}
      />

      <CategoryButtons
        selectedCategory={selectedCategory}
        primiKategoriju={setSelectedCategory}
        categoryApiService={categoryApiService}
      />

      <UserRecipesList
        token={token || ""}
        openRecipe={openRecipe}
        recipesApi={recipesApi}
        onRecipesLoaded={handleRecipesLoaded}
        filteredRecipes={filteredRecipes ?? undefined}
      />
    </div>
  );
};

export default ExplorePage;
