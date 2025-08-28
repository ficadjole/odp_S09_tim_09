import React from "react";

interface RecipeLikesProps {
  liked: boolean;
  likeCount: number;
  onToggleLike: () => void;
}

export const RecipeLikes: React.FC<RecipeLikesProps> = ({
  liked,
  likeCount,
  onToggleLike,
}) => {
  return (
    <div className="recipe-section rating-section">
      <div className="recipe-details"><h2 >Likes</h2></div>
      <button
        className={`like-btn ${liked ? "liked" : ""}`}
        onClick={onToggleLike}
      >
        {liked ? "💖 Liked" : "👍 Like"}
      </button>
      <span className="likes-count">
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </span>
    </div>
  );
};
