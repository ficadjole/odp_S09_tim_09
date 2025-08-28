import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Explore.css";
import Navbar from "../components/nav_bar/NavBar";
import { useAuth } from "../hooks/auth/authHook";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import type { KategorijaDto } from "../models/kategorije/KategorijaDto";
import { categoryApiService } from "../api_services/category_api/CategoryApiService";

const ExplorePage: React.FC = () => {
  const { user, token } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<KategorijaDto | null>(null);

  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  useEffect(() => {
    if (!token) return; 

    recipesApi.getAllRecipes(token).then((recipes) => {
      setRecipes(recipes);
    });
  }, [token]);

  const [categories, setCategories] = useState<KategorijaDto[]>([]);
  useEffect(() => {
    if (!token) return;

    categoryApiService.getAllCategories(token).then((categories) => {
      setCategories(categories);
    });
  }, [token]);

  const [filteredRecipes, setFilteredRecipes] = useState<ReceptListaDto[]>([]);
  useEffect(() => {
    if (searchTerm.trim() === "" && selectedCategory === null) {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => {
          const matchesName = recipe.nazivR
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const matchesCategory =
            selectedCategory === null
              ? true
              : recipe.kategorije.some(
                  (category) =>
                    category.nazivK.toLowerCase() ===
                    selectedCategory.nazivK.toLowerCase()
                );

          return matchesName && matchesCategory;
        })
      );
    }
  }, [recipes, searchTerm, selectedCategory]);

  return (
    <div className="explore-page">
      <Navbar username={user?.username || ""} /> 

      <h1>Explore Recipes</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="categories">
        {categories.map((cat) => (
          <div key={cat.idKategorije} className="category-item">
            <button
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
            >
              {cat.nazivK}
            </button>
          </div>
        ))}
      </div>

      <div className="explore-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="explore-card">
              <img src={`${recipe.slika_url}`} alt={recipe.nazivR} />
              <div className="card-info">
                <h3>{recipe.nazivR}</h3>
                <p>
                  Category:{" "}
                  {recipe.kategorije.map((kategorija) => kategorija.nazivK).join(" ")}
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
