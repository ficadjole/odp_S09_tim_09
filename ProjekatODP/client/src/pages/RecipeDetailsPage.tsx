import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../models/recipe/Recipe";
import Navbar from "../design_components/NavBar";
import type { Comment } from "../models/recipe/Comment";
import "../styles/Recipe.css";
import type { UserLogin } from "../models/auth/UserLogin";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
const testUser: UserLogin = {
  id: "2",
  username: "Maja",
  email: "maja@example.com",
  password: "123",
  role: "Visitor",
};

const RecipeDetailsPage: React.FC = () => {
  const un = "Maja";
  const user = testUser;
  const token = "";
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  /*   const [likes, setLikes] = useState<number>(0);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState(""); */

  useEffect(() => {
    console.log(id);
    if (!id) return;

    recipesApi.getRecipeById(token, Number(id)).then((foundRecipe) => {
      if (foundRecipe && foundRecipe.idRecepta !== 0) {
        setRecipe(foundRecipe);
      }
    });
  }, [id]);

  if (!recipe) return <p>Recipe not found</p>;
  console.log(recipe);
  /*   const handleAddComment = () => {
    if (!newComment) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: un,
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleLikeToggle = () => {
    if (likedUsers.includes(un)) {
      setLikes(likes - 1);
      setLikedUsers(likedUsers.filter((user) => user !== un));
    } else {
      setLikes(likes + 1);
      setLikedUsers([...likedUsers, un]);
    }
  };

  const userHasLiked = likedUsers.includes(un); */
  return (
    <div className="recipe-details-page">
      <Navbar username={un} />

      <div className="recipe-header">
        <img
          src={`https://picsum.photos/800/400?random=${recipe.idRecepta}`}
          alt={recipe.nazivR}
        />
        <h1>{recipe.nazivR}</h1>
        <h3>
          Category:{" "}
          {recipe.kategorije.map((kategorija) => kategorija.nazivK).join(" ")}
        </h3>
        <p>By {recipe.author.username}</p>
      </div>

      <div className="recipe-content">
        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul>{recipe.sastojic}</ul>
        </div>

        <div className="recipe-section">
          <h2>Instructions</h2>
          <p>{recipe.opis}</p>
        </div>

        <div className="recipe-section">
          <h2>Advice</h2>
          <p>{recipe.saveti}</p>
        </div>

        {/*         <div className="recipe-section rating-section">
          <h2>Likes</h2>
          <button
            className={`like-btn ${userHasLiked ? "liked" : ""}`}
            onClick={handleLikeToggle}
          >
            {userHasLiked ? "💖 Liked" : "👍 Like"}
          </button>
          <span className="likes-count">
            {likes} {likes === 1 ? "Like" : "Likes"}
          </span>
        </div>

        <div className="recipe-section comments-section">
          <h2>Comments</h2>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment">
                <strong>{c.author}</strong>: {c.text}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <div className="add-comment">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div> */}

        {/*           <div className="buttons-container">
            {user.role === "Admin" && (
              <button
                className="delete-btn"
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "#196c53",
                  color: "white",
                }}
              >
                Delete Recipe
              </button>
            )}
          </div> */}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
