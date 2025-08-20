import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Explore.css";
import Navbar from "../design_components/NavBar";
import type { Recipe } from "../models/recipe/Recipe";
import recipesData from "../models/recipe/Recipe";

const categories: Recipe['category'][] = ["Appetizer", "Main course", "Soup", "Salad", "Dessert", "Drink"];

const ExplorePage: React.FC = () => {
  const un = "Maja";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Recipe['category'] | null>(null);

  const filteredRecipes = recipesData.filter((recipe) => {
    const matchesName = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    return matchesName && matchesCategory;
  });

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
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="explore-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="explore-card">
              <img src={`https://picsum.photos/400/250?random=${recipe.id}`} alt={recipe.title} />
              <div className="card-info">
                <h3>{recipe.title}</h3>
                <p>By {recipe.authorId}</p>
                <p>Category: {recipe.category}</p>
                <Link to={`/recipe/${recipe.id}`} className="read-more">
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
