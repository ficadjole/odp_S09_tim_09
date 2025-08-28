import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Recipe } from "../models/recipe/Recipe";
import Navbar from "../design_components/NavBar";
import type { CommentDto } from "../models/comments/CommentDto";
import "../styles/Recipe.css";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import { commentApi } from "../api_services/comment_api/CommentApi";
import { likeApiService } from "../api_services/like_api/LikeApiService";
import { useAuth } from "../hooks/auth/authHook"; 

const RecipeDetailsPage: React.FC = () => {
  const { user, token } = useAuth(); 
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [liked, setLikeD] = useState<boolean>(false);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    recipesApi.getRecipeById(token || "", Number(id)).then((foundRecipe) => {
      if (foundRecipe && foundRecipe.idRecepta !== 0) {
        setRecipe(foundRecipe);
      }
    });
  }, [id, token]);

  useEffect(() => {
    if (!id) return;
    commentApi
      .getAllCommentsForRecipe(token || "", Number(id))
      .then((foundComments) => {
        if (foundComments.length > 0) {
          setComments(foundComments);
        }
      });
  }, [id, token]);

  useEffect(() => {
    if (!recipe || !user || !token) return;

    likeApiService.userLiked(token, recipe.idRecepta, user.id)
      .then((res) => setLikeD(res.korisnikLajkova));

    likeApiService.numberOfLikes(token, recipe.idRecepta)
      .then((res) => setLikeCount(res.brojLajkova));
  }, [recipe, user, token]);
  

  if (!recipe) return <p>Recipe not found</p>;

  const handleAddComment = async () => {
    if (!newComment) return;
    const newCommentV = await commentApi.addComment(
      token || "",
      recipe.idRecepta,
      user?.id ?? 0, 
      newComment
    );
    setComments([...comments, newCommentV]);
    setNewComment("");
  };

  const handleLikeToggle = async () => {
  if (!user || !token || !recipe) return;

  if (!liked) {
    await likeApiService.addLike(token, recipe.idRecepta, user.id);
  } else {
    await likeApiService.removeLike(token, recipe.idRecepta, user.id);
  }

  const likes = await likeApiService.numberOfLikes(token, recipe.idRecepta);
  setLikeCount(likes.brojLajkova);

  setLikeD(!liked);
};


  const handleDeleteRecipe = async () => {
    if (!token || !recipe) return;

    const confirmDelete = window.confirm(
      `Da li ste sigurni da želite da obrišete recept "${recipe.nazivR}"?`
    );
    if (!confirmDelete) return;

    try {
      await recipesApi.deleteRecipe(token, recipe.idRecepta, recipe.kategorije[0]?.idKategorije ?? 0);
      alert("Recept je uspešno obrisan.");
      navigate("/explore"); 
    } catch (err) {
      console.error("Greška pri brisanju recepta:", err);
      alert("Brisanje nije uspelo.");
    }
  };

  return (
    <div className="recipe-details-page">
      <Navbar username={user?.username || ""} />

      <div className="recipe-header">
        <img
          src={`${recipe.slika_url}`}
          alt={recipe.nazivR}
        />
        <h1>{recipe.nazivR}</h1>
        <h3>
          Category:{" "}
          {recipe.kategorije.map((kategorija) => kategorija.nazivK).join(" ")}
        </h3>
        <p>By {recipe.author.username}</p>
        <p>Created at: {new Date(recipe.date).toLocaleDateString()}</p>
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

        <div className="recipe-section rating-section">
          <h2>Likes</h2>
          <button
            className={`like-btn ${liked ? "liked" : ""}`}
            onClick={handleLikeToggle}
          >
            {liked ? "💖 Liked" : "👍 Like"}
          </button>
          <span className="likes-count">
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </span>
        </div>

        <div className="recipe-section comments-section">
          <h2>Comments</h2>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.idKomentara} className="comment">
                <strong>{c.autor?.username}</strong>: {c.tekst}
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
          </div>
        </div>
      </div>

      {user?.uloga === "moderator" && (
        <div className="delete-recipe-container">
          <button className="delete-recipe-btn" onClick={handleDeleteRecipe}>
            🗑 Delete Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailsPage;
