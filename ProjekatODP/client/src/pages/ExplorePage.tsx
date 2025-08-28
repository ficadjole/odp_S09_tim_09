import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Explore.css";
import Navbar from "../components/nav_bar/NavBar";
import { useAuth } from "../hooks/auth/authHook";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import type { KategorijaDto } from "../models/kategorije/KategorijaDto";
import { SearchBar } from "../components/serach_bar/SearchBar";
import { CategoryButtons } from "../components/category_buttons/CategoryButtons";
import type { ICategoryApiService } from "../api_services/category_api/ICategoryApiService";

interface ExplorePageProps {
  categoryApiService: ICategoryApiService;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ categoryApiService }) => {
  const { user, token } = useAuth();
  const [selectedCategory, setSelectedCategory] =
    useState<KategorijaDto | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<ReceptListaDto[]>([]);
  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  useEffect(() => {
    if (!token) return;

    recipesApi.getAllRecipes(token).then((recipes) => {
      setRecipes(recipes);
      setFilteredRecipes(recipes);
    });
  }, [token]);

  const odradiPrimanje = (filteredRecipes: ReceptListaDto[]) => {
    setFilteredRecipes(filteredRecipes);
  };

  return (
    <div className="explore-page">
      <Navbar username={user?.username || ""} />

      <h1>Explore Recipes</h1>
      <SearchBar
        recipes={recipes}
        selectedCategory={selectedCategory}
        primiRecept={odradiPrimanje}
      ></SearchBar>

      <CategoryButtons
        selectedCategory={selectedCategory}
        primiKategoriju={setSelectedCategory}
        categoryApiService={categoryApiService}
      ></CategoryButtons>

      <div className="explore-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="explore-card">
              <img src={`${recipe.slika_url}`} alt={recipe.nazivR} />
              <div className="card-info">
                <h3>{recipe.nazivR}</h3>
                <p>
                  Category:{" "}
                  {recipe.kategorije
                    .map((kategorija) => kategorija.nazivK)
                    .join(" ")}
                </p>
                <Link to={`/recipes/${recipe.idRecepta}`} className="read-more">
                  View Recipe
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
