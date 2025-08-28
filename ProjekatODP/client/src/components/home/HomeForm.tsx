import React from "react";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import RecipeCard from "../recipe/RecipeCard";
import BlogCard from "../blog/BlogCard";

interface HomeFormProps {
  latestRecipes: ReceptListaDto[];
  popularRecipes: ReceptListaDto[];
  blogs: BlogPostDto[];
  openRecipe: (id: number) => void;
  openBlog: (id: number) => void;
}

const HomeForm: React.FC<HomeFormProps> = ({ latestRecipes, popularRecipes, blogs, openRecipe, openBlog }) => {
  return (
    <div className="homepage">
      <section className="recipes-section">
        <h2>New Recipes</h2>
        <div className="recipes-grid">
          {latestRecipes.map((recipe) => (
            <RecipeCard key={recipe.idRecepta} recipe={recipe} openRecipe={openRecipe} />
          ))}
        </div>

        <h2>Popular Recipes</h2>
        <div className="recipes-grid">
          {popularRecipes.map((recipe) => (
            <RecipeCard key={recipe.idRecepta} recipe={recipe} openRecipe={openRecipe} />
          ))}
        </div>
      </section>

      <section className="blogs-section">
        <h2>Food Blogs</h2>
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog.idBlogPost} blog={blog} openBlog={openBlog} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeForm;
