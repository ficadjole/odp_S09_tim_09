import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Explore.css";
import Navbar from "../design_components/NavBar";
/* import type { Recipe } from "../models/recipe/Recipe"; */
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";

const ExplorePage: React.FC = () => {
  const un = "Maja";
  const [searchTerm, setSearchTerm] = useState("");
  /*   if (!token) {
    alert("Morate biti ulogovani kao urednik da biste dodali knjigu!");
    return;
  } */
  //const [selectedCategory, setSelectedCategory] = useState<Recipe['category'] | null>(null);

  /*   const filteredRecipes = recipesData.filter((recipe) => {
    const matchesName = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    return matchesName && matchesCategory;
  }); */

  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  useEffect(() => {
    recipesApi.getAllRecipes("").then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  console.log(recipes);

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

      {/*  <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat ? null : cat)
            }
          >
            {cat}
          </button>
        ))}
      </div> */}

      <div className="explore-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idRecepta} className="explore-card">
              <img
                src={`https://picsum.photos/400/250?random=${recipe.idRecepta}`}
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
    </div>
  );
};

export default ExplorePage;
