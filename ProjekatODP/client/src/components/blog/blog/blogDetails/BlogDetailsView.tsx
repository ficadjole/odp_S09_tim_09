import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../nav_bar/NavBar";
import type { Blog } from "../../../../models/blog/Blog";
import type { AuthUser } from "../../../../types/auth/AuthUser";
import type { ReceptListaDto } from "../../../../models/recipe/ReceptListaDto";
import RecipeCard from "../../../recipe/RecipeCard";
import "../../../../styles/blog/BlogView.css";

interface BlogDetailsViewProps {
  blog: Blog;
  user: AuthUser | null;
  recipes?: ReceptListaDto[];
  onDelete: () => void;
}

export const BlogDetailsView: React.FC<BlogDetailsViewProps> = ({
  blog,
  user,
  recipes,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className="blog-details-page">
      <Navbar username={user?.username || ""} />

      <div className="blog-header">
        <h1>{blog.naslovB}</h1>
        <p>By {blog.author?.username} </p>
      </div>

      <div className="blog-content">
        <p>{blog.sadrzaj}</p>
      </div>

      {recipes && recipes.length > 0 && (
        <div className="blog-recipe-container">
          {recipes.map((r) => (
            <RecipeCard 
             key={r.idRecepta} 
             recipe={r} 
             openRecipe={() => navigate(`/recipes/${r.idRecepta}`)}
            />
          ))}
        </div>
      )}
      {user?.id === blog.author?.idKorisnika && (
        <button className="delete-button" onClick={onDelete}>
          Delete Blog
        </button>
      )}
    </div>
  );
};
