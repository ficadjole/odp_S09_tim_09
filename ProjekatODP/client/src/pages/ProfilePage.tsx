import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Navbar from "../design_components/NavBar";
import { Uloga } from "../models/auth/UserRole";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import { categoryApiService } from "../api_services/category_api/CategoryApiService" 
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import { useAuth } from "../hooks/auth/authHook";

const ProfilePage: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [userRecipes, setUserRecipes] = useState<ReceptListaDto[]>([]);
  const [newCategory, setNewCategory] = useState<string>(""); // unos za kategoriju
  const [message, setMessage] = useState<string>(""); // feedback poruka

  useEffect(() => {
    if (!token || !user) return;
    recipesApi.getAllRecipesUser(token, user?.id).then((recipes) => {
      setUserRecipes(recipes);
    });
  }, [token]);

  const handleAddCategory = async () => {
    if (!token || !newCategory.trim()) return;
    try {
      const res = await categoryApiService.addCategory(token, newCategory);
      if (res && res.nazivK) {
        setMessage(`Kategorija "${res.nazivK}" uspešno dodata!`);
        setNewCategory("");
      } else {
        setMessage("Došlo je do greške prilikom dodavanja kategorije.");
      }
    } catch {
      setMessage("Došlo je do greške.");
    }
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="profile-page">
      <Navbar username={user.username} />

      <div className="profile-header">
        <h1>{user.username}</h1>
        <p>{user.email}</p>
      </div>

      <section className="user-recipes">
        <div className="buttons-wrapper">
          <div className="buttons-container">
            {user.uloga === Uloga.moderator && (
              <button
                className="add-blog-btn"
                onClick={() => navigate("/add-blog")}
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "#196c53",
                  color: "white",
                }}
              >
                + Add New Blog
              </button>
            )}
            <button
              className="add-recipe-btn"
              onClick={() => navigate("/add-recipe")}
            >
              + Add New Recipe
            </button>
          </div>
        </div>

        {user.uloga === Uloga.moderator && (   
        <div className="add-category-section">
          <h3>Dodaj novu kategoriju</h3>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Unesi naziv kategorije"
          />
          <button className="add-category-btn" onClick={handleAddCategory}>
            + Add New Category
          </button>
          {message && <p>{message}</p>}
        </div>
      )}

        <h2>My Recipes</h2>
        {userRecipes.length === 0 && <p>You haven't added any recipes yet.</p>}

        <div className="recipes1-grid">
          {userRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="recipe1-card">
              <img
                src={`${recipe.slika_url}`}
                alt={recipe.nazivR}
              />
              <div className="recipe1-info">
                <h3>{recipe.nazivR}</h3>
                <p>
                  Category:{" "}
                  {recipe.kategorije
                    .map((kategorija) => kategorija.nazivK)
                    .join(" ")}
                </p>
                <Link to={`/recipe/${recipe.idRecepta}`} className="read-more">
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
