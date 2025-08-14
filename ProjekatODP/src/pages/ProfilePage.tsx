import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Navbar from "../design_components/NavBar";
import type { UserLogin } from "../models/auth/UserLogin";
import type { Recipe } from "../models/recipe/Recipe";
import recipesData from "../models/recipe/Recipe";

const testUser: UserLogin = {
  id: "2",
  username: "Maja",
  email: "maja@example.com",
  password: "123",
  role: "Visitor",
};

const ProfilePage: React.FC = () => {
  const user = testUser;
  const navigate = useNavigate();

  const [userRecipes] = useState<Recipe[]>(
    recipesData.filter((r) => r.authorId === user.id)
  );

  return (
    <div className="profile-page">
      <Navbar username={user.username} />

      <div className="profile-header">
        <h1>{user.username}</h1>
        <p>{user.email}</p>
      </div>

      <section className="user-recipes">
        <div className="section-header">
          <h2>My Recipes</h2>
          <button
            className="add-recipe-btn"
            onClick={() => navigate("/add-recipe")}
          >
            + Add New Recipe
          </button>
        </div>

        {userRecipes.length === 0 && <p>You haven't added any recipes yet.</p>}

        <div className="recipes1-grid">
          {userRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe1-card">
              <img src={`https://picsum.photos/400/250?random=${recipe.id}`} alt={recipe.title}/>
              <div className="recipe1-info">
                <h3>{recipe.title}</h3>
                <p>Category: {recipe.category}</p>
                <Link to={`/recipe/${recipe.id}`} className="read-more">
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
