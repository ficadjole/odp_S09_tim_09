import React from "react";
import { Uloga } from "../../models/auth/UserRole";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import RecipeCard from "../recipe/RecipeCard";

interface UserRecipesProps {
  userRecipes: ReceptListaDto[];
  navigate: (path: string) => void;
  userRole: Uloga;
}

const UserRecipes: React.FC<UserRecipesProps> = ({ userRecipes, navigate, userRole }) => {
  const openRecipe = (id: number) => {
    navigate(`/recipes/${id.toString()}`); 
  };

  return (
    <section className="user-recipes">
      <div className="buttons-wrapper">
        <div className="buttons-container">
          {userRole === Uloga.moderator && (
            <button
              onClick={() => navigate("/add-blog")}
              style={{ marginLeft: "1rem", backgroundColor: "#196c53", color: "white" }}
            >
              + Add New Blog
            </button>
          )}
          <button onClick={() => navigate("/add-recipe")}>+ Add New Recipe</button>
        </div>
      </div>

      <h2>My Recipes</h2>
      {userRecipes.length === 0 && <p>You haven't added any recipes yet.</p>}

      <div className="recipes1-grid">
        {userRecipes.map((recipe) => (
          <RecipeCard key={recipe.idRecepta} recipe={recipe} openRecipe={openRecipe} />
        ))}
      </div>
    </section>
  );
};

export default UserRecipes;
