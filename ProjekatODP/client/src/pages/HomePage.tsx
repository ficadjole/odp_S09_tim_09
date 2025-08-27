import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Navbar from "../design_components/NavBar";
//import blogData from "../models/blog/Blog";
//import blogData from "../models/blog/Blog";
import { useNavigate } from "react-router-dom";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import { blogsAPI } from "../api_services/blog_api/BlogAPIService";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import type { BlogPostDto } from "../models/blog/BlogListaDto";
import { useAuth } from "../hooks/auth/authHook";

const HomePage: React.FC = () => {
  const { user, token } = useAuth();
  const un = "Maja";
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<ReceptListaDto[]>([]);
  const [latestRecipes, setLatestRecipes] = useState<ReceptListaDto[]>([]);
  const [blogs, setBlogs] = useState<BlogPostDto[]>([]);
  useEffect(() => {
    if (!token) return; // proveri da li postoji token

    recipesApi.getAllRecipes(token).then((recipes) => {
      setRecipes(recipes);
    });
  }, [token]);

  useEffect(() => {
    if (!token) return; // proveri da li postoji token

    blogsAPI.getAllBlogs(token).then((blogs) => {
      setBlogs(blogs);
    });
  }, [token]);

  useEffect(() => {
    if (recipes.length > 0) {
      const sortedRecipes = recipes.sort((a, b) => a.idRecepta - b.idRecepta);
      const temp = sortedRecipes.slice(0, 6);
      setLatestRecipes(temp);
    }
  }, [recipes]);

  const openRecipe = (recipeId: number) => {
  const openRecipe = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  const openBlog = (blogId: number) => {
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
          {latestRecipes.map((recipe) => (
            <div key={recipe.idRecepta} className="recipe-card">
              <img
                src={`https://picsum.photos/600/400?random=${recipe.idRecepta}`}
                alt={`Recipe ${recipe.nazivR}`}
                src={`https://picsum.photos/600/400?random=${recipe.idRecepta}`}
                alt={`Recipe ${recipe.nazivR}`}
              />
              <div className="recipe-info">
                <h3>{recipe.nazivR}</h3>
                <button
                  className="read-more"
                  onClick={() => openRecipe(recipe.idRecepta)}
                >
                <h3>{recipe.nazivR}</h3>
                <button
                  className="read-more"
                  onClick={() => openRecipe(recipe.idRecepta)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </section>

      {/*       <section className="blogs-section">
      {/*       <section className="blogs-section">
        <h2>Food Blogs</h2>
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div key={blog.idBlogPost} className="blog-card">
              <div className="blog-info">
                <h1>{blog.naslovB}</h1>
                <p>{blog.sadrzaj}</p>
                <p>Created: {new Date(blog.datum).toDateString()}</p>
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
        <button className="view-blogs">View All Blogs</button>
      </section> */}
      </section> */}
    </div>
  );
};

export default HomePage;
