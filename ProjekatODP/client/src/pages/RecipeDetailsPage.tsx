import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../models/recipe/Recipe";
import Navbar from "../design_components/NavBar";
import type { CommentDto } from "../models/comments/CommentDto";
import "../styles/Recipe.css";
//import type { UserLogin } from "../models/auth/UserLogin";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import { commentApi } from "../api_services/comment_api/CommentApi";
import { likeApiService } from "../api_services/like_api/LikeApiService";
import { type LikeDto } from "../models/like/LikeDto";
/* const testUser: UserLogin = {
  id: "2",
  username: "Maja",
  email: "maja@example.com",
  password: "123",
  role: "Visitor",
}; */

const RecipeDetailsPage: React.FC = () => {
  const un = "Maja";
  const token = "";
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [liked, setLikeD] = useState<boolean>(false);
  const [newLike, setNewLike] = useState<LikeDto>();
  const [newComment, setNewComment] = useState("");
  /*   const [likes, setLikes] = useState<number>(0);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
   */

  useEffect(() => {
    if (!id) return;

    recipesApi.getRecipeById(token, Number(id)).then((foundRecipe) => {
      if (foundRecipe && foundRecipe.idRecepta !== 0) {
        setRecipe(foundRecipe);
      }
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    console.log(id);
    commentApi
      .getAllCommentsForRecipe(token, Number(id))
      .then((foundComments) => {
        if (foundComments.length > 0) {
          setComments(foundComments);
        }
      });
  }, [id]);

  if (!recipe) return <p>Recipe not found</p>;
  const handleAddComment = async () => {
    if (!newComment) return;
    const newCommentV = await commentApi.addComment(
      token,
      recipe.idRecepta,
      1, //OVDE MORAM STAVITI ID KORISNIKA IZ TOKENA
      newComment
    );
    setComments([...comments, newCommentV]);
    setNewComment("");
  };

  const handleLikeToggle = async () => {
    if (liked === false) {
      const newLike = await likeApiService.addLike(token, recipe.idRecepta, 1);

      const nmbrOfLikes = await likeApiService.numberOfLikes(
        token,
        recipe.idRecepta
      );
      setNewLike(nmbrOfLikes);
      setLikeD(true);
    } else {
      const deletedLike = await likeApiService.removeLike(
        token,
        recipe.idRecepta,
        1
      );
      const nmbrOfLikes = await likeApiService.numberOfLikes(
        token,
        recipe.idRecepta
      );
      setNewLike(nmbrOfLikes);
      setLikeD(false);
    }
  };

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
            {newLike?.brojLajkova}{" "}
            {newLike?.brojLajkova === 1 ? "Like" : "Likes"}
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
    </div>
  );
};

export default RecipeDetailsPage;
