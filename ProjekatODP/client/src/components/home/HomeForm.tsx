import React, { useEffect, useState } from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import type { LikeDto } from "../../models/like/LikeDto";
import { useAuth } from "../../hooks/auth/authHook";
import { useNavigate } from "react-router-dom";
import LatestRecipesSection from "../home/LatestRecipes";
import PopularRecipesSection from "../home/PopularRecipes";
import BlogSection from "../home/BlogSection";

interface HomeFormProps {
  recipesApi: {
    getAllRecipes: (token: string) => Promise<ReceptListaDto[]>;
  };
  blogsAPI: {
    getAllBlogs: (token: string) => Promise<BlogPostDto[]>;
  };
  likeApiService: {
    numberOfLikes: (token: string, recipeId: number) => Promise<LikeDto>;
  };
}

const HomeForm: React.FC<HomeFormProps> = ({ recipesApi, blogsAPI, likeApiService }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  const [blogs, setBlogs] = useState<BlogPostDto[]>([]);
  const [likes, setLikes] = useState<LikeDto[]>([]);

  useEffect(() => {
    if (!token) return;
    recipesApi.getAllRecipes(token).then(setRecipes);
  }, [token, recipesApi]);

  useEffect(() => {
    if (!token) return;
    blogsAPI.getAllBlogs(token).then(setBlogs);
  }, [token, blogsAPI]);

  useEffect(() => {
    if (!token || recipes.length === 0) return;
    const fetchLikes = async () => {
      const likesArray = await Promise.all(
        recipes.map((recipe) => likeApiService.numberOfLikes(token, recipe.idRecepta))
      );
      setLikes(likesArray);
    };
    fetchLikes();
  }, [recipes, token, likeApiService]);

  const openRecipe = (recipeId: number) => navigate(`/recipes/${recipeId}`);
  const openBlog = (blogId: number) => navigate(`/blog/${blogId}`);

  return (
    <div className="homepage">
      <LatestRecipesSection recipes={recipes} openRecipe={openRecipe} />
      <PopularRecipesSection recipes={recipes} likes={likes} openRecipe={openRecipe} />
      <BlogSection blogs={blogs} openBlog={openBlog} />
    </div>
  );
};

export default HomeForm;
