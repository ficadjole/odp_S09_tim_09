import React, { useState } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../models/recipe/Recipe";
import recipesData from "../models/recipe/Recipe";
import Navbar from "../design_components/NavBar";
import type {Comment} from "../models/recipe/Comment"
import "../styles/Recipe.css";

const RecipeDetailsPage: React.FC = () => {
  const un = "Maja";
  const { id } = useParams<{ id: string }>();
  const recipe = recipesData.find((r: Recipe) => r.id === id);

  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  if (!recipe) return <p>Recipe not found</p>;

  const handleAddComment = () => {
    if (!newComment) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: un,
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleRate = (value: number) => {
    setRating(value);
  };

  return (
    <div className="recipe-details-page">
      <Navbar username={un} />

      <div className="recipe-header">
        <img
          src={`https://picsum.photos/800/400?random=${recipe.id}`}
          alt={recipe.title}
        />
        <h1>{recipe.title}</h1>
        <p>By {recipe.authorId}</p>
      </div>

      <div className="recipe-content">
        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>

        <div className="recipe-section rating-section">
          <h2>Rate this recipe</h2>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-btn ${rating === star ? "active" : ""}`}
                onClick={() => handleRate(star)}
              >
                ⭐
              </button>
            ))}
          </div>
          {rating && <p>Your rating: {rating} / 5</p>}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
