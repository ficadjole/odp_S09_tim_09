import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Navbar from "../design_components/NavBar";
import type { UserLogin } from "../models/auth/UserLogin";
import { Uloga } from "../models/auth/UserRole";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
const testUser: UserLogin = {
  id: 1,
  username: "ficadjole",
  email: "velemirfilip@gmail.com",
  password: "Fiki2308!*?",
  uloga: Uloga.korisnik,
};

const ProfilePage: React.FC = () => {
  const token = "";
  const user = testUser;
  const navigate = useNavigate();

  const [userRecipes, setUserRecipes] = useState<ReceptListaDto[]>([]);
  useEffect(() => {
    recipesApi.getAllRecipes(token).then((recipes) => {
      setUserRecipes(recipes);
    });
  }, []);
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

        <h2>My Recipes</h2>
        {userRecipes.length === 0 && <p>You haven't added any recipes yet.</p>}

        <div className="recipes1-grid">
          {userRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="recipe1-card">
              <img
                src={`https://picsum.photos/400/250?random=${recipe.idRecepta}`}
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
