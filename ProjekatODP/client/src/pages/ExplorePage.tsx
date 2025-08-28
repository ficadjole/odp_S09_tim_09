import React, {  useState } from "react";
//import { Link } from "react-router-dom";
import "../styles/pages/Explore.css";
import Navbar from "../components/nav_bar/NavBar";
import { useAuth } from "../hooks/auth/authHook";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import type { KategorijaDto } from "../models/kategorije/KategorijaDto";
import { SearchBar } from "../components/serach_bar/SearchBar";
import { CategoryButtons } from "../components/category_buttons/CategoryButtons";
import type { ICategoryApiService } from "../api_services/category_api/ICategoryApiService";
import UserRecipesList from "../components/user_recipe_list/UserRecipesList";

interface ExplorePageProps {
  categoryApiService: ICategoryApiService;
  recipes: ReceptListaDto[];  
}

const ExplorePage: React.FC<ExplorePageProps> = ({ categoryApiService, recipes }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<KategorijaDto | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<ReceptListaDto[]>(recipes);

  const handleFilteredRecipes = (filtered: ReceptListaDto[]) => {
    setFilteredRecipes(filtered);
  };

  const openRecipe = (id: number) => {
    window.location.href = `/recipes/${id}`;
  };

  return (
    <div className="explore-page">
      <Navbar username={user?.username || ""} />

      <h1>Explore Recipes</h1>

      <SearchBar
        recipes={recipes}
        selectedCategory={selectedCategory}
        primiRecept={handleFilteredRecipes}
      />

      <CategoryButtons
        selectedCategory={selectedCategory}
        primiKategoriju={setSelectedCategory}
        categoryApiService={categoryApiService}
      />

      <UserRecipesList recipes={filteredRecipes} openRecipe={openRecipe} />
    </div>
  );
};

export default ExplorePage;
