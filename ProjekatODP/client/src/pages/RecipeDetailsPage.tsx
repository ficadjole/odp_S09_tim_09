import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/nav_bar/NavBar";
import { useAuth } from "../hooks/auth/authHook";
import { RecipeCommentsContainer } from "../components/recipe/recipeDetails/RecipeCommentsContainer";
import { RecipeHeaderContainer } from "../components/recipe/recipeDetails/RecipeHeaderContainer";
import { RecipeContentContainer } from "../components/recipe/recipeDetails/RecipeContentContainer";
import { RecipeLikesContainer } from "../components/recipe/recipeDetails/RecipeLikesContainter";
import { RecipeDeleteContainer } from "../components/recipe/recipeDetails/RecipeDeleteContainer";
import type { IReceptApiService } from "../api_services/recept_api/IReceptApiService";
import type { ILikeApiService } from "../api_services/like_api/ILikeApiService";
import type { ICommentApi } from "../api_services/comment_api/ICommentApi";

interface RecipeDetailsPageProps {
  recipesApi: IReceptApiService;
  likeApiService: ILikeApiService;
  commentApi: ICommentApi;
}

const RecipeDetailsPage: React.FC<RecipeDetailsPageProps> = ({
  recipesApi,
  likeApiService,
  commentApi,
}) => {
  const { user, token } = useAuth();
  const { id } = useParams();
  const idRecepta = Number(id);
  if (!token || !user || !id) return <p>Loading...</p>;

  return (
    <div className="recipe-details-page">
      <Navbar username={user.username} />

      <RecipeHeaderContainer
        token={token}
        idRecepta={idRecepta}
        recipesApi={recipesApi}
      />
      <RecipeContentContainer
        token={token}
        idRecepta={idRecepta}
        recipesApi={recipesApi}
      />
      <RecipeLikesContainer
        token={token}
        idRecepta={idRecepta}
        userId={user.id}
        likeApiService={likeApiService}
      />
      <RecipeCommentsContainer
        token={token}
        idRecepta={idRecepta}
        userId={user.id}
        commentApi={commentApi}
      />
      <RecipeDeleteContainer
        token={token}
        idRecepta={idRecepta}
        userRole={user.uloga}
        firstCategoryId={0}
        recipesApi={recipesApi}
      />
    </div>
  );
};

export default RecipeDetailsPage;
