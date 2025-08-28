import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/nav_bar/NavBar";
import HomeForm from "../components/home/HomeForm";
import { useNavigate } from "react-router-dom";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import { blogsAPI } from "../api_services/blog_api/BlogAPIService";
import { likeApiService } from "../api_services/like_api/LikeApiService";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import type { BlogPostDto } from "../models/blog/BlogListaDto";
import { useAuth } from "../hooks/auth/authHook";
import type { LikeDto } from "../models/like/LikeDto";

const HomePage: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  const [latestRecipes, setLatestRecipes] = useState<ReceptListaDto[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<ReceptListaDto[]>([]);
  const [blogs, setBlogs] = useState<BlogPostDto[]>([]);
  const [likes, setLikes] = useState<LikeDto[]>([]);

  useEffect(() => {
    if (!token) return;
    recipesApi.getAllRecipes(token).then((recipes) => {
      setRecipes(recipes);
      setPopularRecipes(recipes);
    });
  }, [token]);

  useEffect(() => {
    if (!token) return;
    blogsAPI.getAllBlogs(token).then((blogs) => setBlogs(blogs));
  }, [token]);

  useEffect(() => {
    if (recipes.length > 0) {
      const sortedRecipes = recipes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setLatestRecipes(sortedRecipes.slice(0, 6));
    }
  }, [recipes]);

  useEffect(() => {
    if (!token) return;
    const fetchLikes = async () => {
      const likesArray = await Promise.all(
        recipes.map((recipe) => likeApiService.numberOfLikes(token, recipe.idRecepta))
      );
      setLikes(likesArray);
    };
    fetchLikes();
  }, [recipes, token]);

  useEffect(() => {
    const sortedByLikes = recipes.slice().sort((a, b) => {
      const likesA = likes.find((l) => l.idRecepta === a.idRecepta)?.brojLajkova || 0;
      const likesB = likes.find((l) => l.idRecepta === b.idRecepta)?.brojLajkova || 0;
      return likesB - likesA;
    });
    setPopularRecipes(sortedByLikes.slice(0, 6));
  }, [recipes, likes]);

  const openRecipe = (recipeId: number) => navigate(`/recipes/${recipeId}`);
  const openBlog = (blogId: number) => navigate(`/blog/${blogId}`);

  return (
    <>
      <Navbar username={user?.username || ""} />
      <HomeForm
        latestRecipes={latestRecipes}
        popularRecipes={popularRecipes}
        blogs={blogs}
        openRecipe={openRecipe}
        openBlog={openBlog}
      />
    </>
  );
};

export default HomePage;
