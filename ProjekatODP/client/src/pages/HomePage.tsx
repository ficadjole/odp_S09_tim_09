import React from "react";
import "../styles/Home.css";
import Navbar from "../design_components/NavBar";
import type { Recipe } from "../models/recipe/Recipe";
import recipesData from "../models/recipe/Recipe";
import type { Blog } from "../models/blog/Blog"
import blogData from "../models/blog/Blog";

const HomePage: React.FC = () => {
  const un = "Maja";

  const sortedRecipes = [...recipesData].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const latestRecipes = sortedRecipes.slice(0, 3);
  const popularRecipes = recipesData.slice(0,6);

  const sortedBlog = [...blogData].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const latestBlog = sortedBlog.slice(0, 4);

  const openRecipeInNewWindow = (recipeId: string) => {
    const width = window.screen.width;
    const height = window.screen.height;
    window.open(
      `/recipes/${recipeId}`, "_blank", `width=${width},height=${height},top=0,left=0,resizable=yes,scrollbars=yes`
  );
  };

  const openBlogInNewWindow = (blogId: string) => {
    const width = window.screen.width;
    const height = window.screen.height;
    window.open(
      `/blog/${blogId}`, "_blank", `width=${width},height=${height},top=0,left=0,resizable=yes,scrollbars=yes`
  );
};


  return (
    <div className="homepage">

      <Navbar username={un}/>

      <section className="recipes-section">
        <h2>New Recipes</h2>
        <div className="recipes-grid">
          {latestRecipes.map((recipe:Recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={`https://picsum.photos/600/400?random=${recipe.id}`} alt={`Recipe ${recipe.title}`} />
              <div className="recipe-info">
                <h3>Recipe {recipe.title}</h3>
                <p>By User{recipe.authorId} • ⭐ 4.4</p>
                <button className="read-more"  onClick={() => openRecipeInNewWindow(recipe.id)}> Read More</button>
              </div>
            </div>
          ))}
        </div>

        <h2>Most Popular Recipes</h2>
        <div className="recipes-grid">
          {popularRecipes.map((recipe:Recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={`https://picsum.photos/600/400?random=${recipe.id}`} alt={`Recipe ${recipe.title}`} />
              <div className="recipe-info">
                <h3>Recipe {recipe.title}</h3>
                <p>By User{recipe.authorId} • ⭐ 4.4</p>
                <button className="read-more"  onClick={() => openRecipeInNewWindow(recipe.id)}> Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="blogs-section">
        <h2>Food Blogs</h2>
        <div className="blogs-grid">
          {latestBlog.map((blog:Blog) => (
            <div key={blog.id} className="blog-card">
              <img src={`https://picsum.photos/400/200?random=${blog.id }`} alt={`Blog ${blog.title}`} />
              <div className="blog-info">
                <h4>Blog Title {blog.title}</h4>
                <p>{blog.shortDescription}</p>
                <button className="read-more"  onClick={() => openBlogInNewWindow(blog.id)}> Read More</button>
              </div>
            </div>
          ))}
        </div>
        <button className="view-blogs">View All Blogs</button>
      </section>

    </div>
  );
};

export default HomePage;
