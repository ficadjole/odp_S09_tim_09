import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Explore.css";
import Navbar from "../design_components/NavBar";
/* import type { Recipe } from "../models/recipe/Recipe"; */
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import type { KategorijaDto } from "../models/kategorije/KategorijaDto";
import { categoryApiService } from "../api_services/category_api/CategoryApiService";

const ExplorePage: React.FC = () => {
  const un = "Maja";
  const token = "";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<KategorijaDto | null>(null);
  /*   if (!token) {
    alert("Morate biti ulogovani kao urednik da biste dodali knjigu!");
    return;
  } */

  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  useEffect(() => {
    recipesApi.getAllRecipes(token).then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  const [categories, setCategories] = useState<KategorijaDto[]>([]);
  useEffect(() => {
    categoryApiService.getAllCategories(token).then((categories) => {
      setCategories(categories);
    });
  });

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
      <Navbar username={un} />

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
          <button
            key={cat.idKategorije}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat ? null : cat)
            }
          >
            {cat.nazivK}
          </button>
        ))}
      </div>

      <div className="explore-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="explore-card">
              <img
                src={`${recipe.slika_url}`}
                alt={recipe.nazivR}
              />
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

      <Link to={`/add-recipe`} className="read-more">
        Add New Recipe +
      </Link>
    </div>
  );
};

export default ExplorePage;
