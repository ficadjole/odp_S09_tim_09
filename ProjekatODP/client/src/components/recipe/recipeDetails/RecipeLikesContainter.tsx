import React, { useEffect, useState } from "react";
import { RecipeLikes } from "./RecipeLikes";
import type { ILikeApiService } from "../../../api_services/like_api/ILikeApiService";

interface RecipeLikesContainerProps {
  token: string | null;
  recipeId: number;
  userId: number;
  likeApiService: ILikeApiService;
}

export const RecipeLikesContainer: React.FC<RecipeLikesContainerProps> = ({
  token,
  recipeId,
  userId,
  likeApiService,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    likeApiService
      .userLiked(token, recipeId, userId)
      .then((res) => setLiked(res.korisnikLajkova));

    likeApiService
      .numberOfLikes(token, recipeId)
      .then((res) => setLikeCount(res.brojLajkova));
  }, [token, recipeId, userId]);

  const handleToggleLike = async () => {
    if (!token) return;

    if (!liked) await likeApiService.addLike(token, recipeId, userId);
    else await likeApiService.removeLike(token, recipeId, userId);

    const likes = await likeApiService.numberOfLikes(token, recipeId);
    setLikeCount(likes.brojLajkova);
    setLiked(!liked);
  };

  return (
    <RecipeLikes
      liked={liked}
      likeCount={likeCount}
      onToggleLike={handleToggleLike}
    />
  );
};
