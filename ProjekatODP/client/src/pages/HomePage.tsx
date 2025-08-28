import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/nav_bar/NavBar";
//import blogData from "../models/blog/Blog";
//import blogData from "../models/blog/Blog";
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

    blogsAPI.getAllBlogs(token).then((blogs) => {
      setBlogs(blogs);
    });
  }, [token]);

  useEffect(() => {
    if (recipes.length > 0) {
      const sortedRecipes = recipes.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const temp = sortedRecipes.slice(0, 6);
      setLatestRecipes(temp);
    }
  }, [recipes]);

  useEffect(() => {
    if (!token) return;

    const fetchLikes = async () => {
      const likesArray = await Promise.all(
        recipes.map((recipe) =>
          likeApiService.numberOfLikes(token, recipe.idRecepta)
        )
      );
      setLikes(likesArray); // likesArray = niz brojeva, po istom redosledu kao recipes
    };

    fetchLikes();
  }, [recipes, token]);

  useEffect(() => {
    const sortedByLikes = recipes.slice().sort((a, b) => {
      const likesA =
        likes.find((l) => l.idRecepta === a.idRecepta)?.brojLajkova || 0;
      const likesB =
        likes.find((l) => l.idRecepta === b.idRecepta)?.brojLajkova || 0;
      return likesB - likesA; // najveći broj lajkova prvi
    });

    setPopularRecipes(sortedByLikes.slice(0, 6));
  }, [recipes, likes]);

  const openRecipe = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  const openBlog = (blogId: number) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="homepage">
      <Navbar username={user?.username || ""} />

      <section className="recipes-section">
        <h2>New Recipes</h2>
        <div className="recipes-grid">
          {latestRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="recipe-card">
              <img
                src={`${recipe.slika_url}`}
                alt={`Recipe ${recipe.nazivR}`}
              />
              <div className="recipe-info">
                <h3>{recipe.nazivR}</h3>
                <h3>Created at: {new Date(recipe.date).toDateString()}</h3>
                <button
                  className="read-more"
                  onClick={() => openRecipe(recipe.idRecepta)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
        <h2>Popular recipes</h2>

        <div className="recipes-grid">
          {popularRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="recipe-card">
              <img
                src={`${recipe.slika_url}`}
                alt={`Recipe ${recipe.nazivR}`}
              />
              <div className="recipe-info">
                <h3>{recipe.nazivR}</h3>
                <h3>Created at: {new Date(recipe.date).toDateString()}</h3>
                <button
                  className="read-more"
                  onClick={() => openRecipe(recipe.idRecepta)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="blogs-section">
        <h2>Food Blogs</h2>
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div key={blog.idBlogPost} className="blog-card">
              <div className="blog-info">
                <h1>{blog.naslovB}</h1>
                <p>{blog.sadrzaj}</p>
                <p>Created at: {new Date(blog.datumBP).toDateString()}</p>
                <button
                  className="read-more"
                  onClick={() => openBlog(blog.idBlogPost)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
