import React, { useState } from "react";
import type { CommentDto } from "../../../models/comments/CommentDto";


interface RecipeCommentsProps {
  comments: CommentDto[];
  onAddComment: (text: string) => void;
}

export const RecipeComments: React.FC<RecipeCommentsProps> = ({
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleAdd = () => {
    if (newComment.trim() === "") return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="recipe-section comments-section">
      <div className="recipe-details"><h2 >Comments</h2></div>
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
        <button onClick={handleAdd}>Add Comment</button>
      </div>
    </div>
  );
};
