import React, { useEffect, useState } from "react";
import type { CommentDto } from "../../../models/comments/CommentDto";
import { RecipeComments } from "./RecipeComments";
import type { ICommentApi } from "../../../api_services/comment_api/ICommentApi";

interface RecipeCommentsContainerProps {
  token: string | null;
  recipeId: number;
  userId: number;
  commentApi: ICommentApi;
}

export const RecipeCommentsContainer: React.FC<
  RecipeCommentsContainerProps
> = ({ token, recipeId, userId, commentApi }) => {
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    if (!token) return;

    commentApi.getAllCommentsForRecipe(token, recipeId).then(setComments);
  }, [token, recipeId]);

  const handleAddComment = async (text: string) => {
    if (!token) return;

    const newComment = await commentApi.addComment(
      token,
      recipeId,
      userId,
      text
    );
    setComments([...comments, newComment]);
  };

  return <RecipeComments comments={comments} onAddComment={handleAddComment} />;
};
