import React, { useEffect, useState } from "react";
import type { CommentDto } from "../../../models/comments/CommentDto";
import { RecipeComments } from "./RecipeComments";
import type { ICommentApi } from "../../../api_services/comment_api/ICommentApi";

interface RecipeCommentsContainerProps {
  token: string;
  idRecepta: number;
  userId: number;
  commentApi: ICommentApi;
}

export const RecipeCommentsContainer: React.FC<
  RecipeCommentsContainerProps
> = ({ token, idRecepta, userId, commentApi }) => {
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    if (!idRecepta) return;
    console.log(token);
    commentApi
      .getAllCommentsForRecipe(token || "", Number(idRecepta))
      .then((foundComments) => {
        if (foundComments.length > 0) {
          setComments(foundComments);
        }
      });
  }, [idRecepta, token]);

  const handleAddComment = async (text: string) => {
    if (!token) return;

    const newComment = await commentApi.addComment(
      token,
      idRecepta,
      userId,
      text
    );
    setComments([...comments, newComment]);
  };

  return <RecipeComments comments={comments} onAddComment={handleAddComment} />;
};
