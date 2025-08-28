import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../models/blog/Blog";
import "../styles/pages/AddBlog.css";
import { blogsAPI } from "../api_services/blog_api/BlogAPIService";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import { useAuth } from "../hooks/auth/authHook";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";

const AddBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [allRecipes, setAllRecipes] = useState<ReceptListaDto[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<ReceptListaDto[]>([]);

  useEffect(() => {
    if (!token) return;
    recipesApi.getAllRecipes(token).then((recipes) => {
      setAllRecipes(recipes);
    });
  }, [token]);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Fill in title and content of the blog");
      return;
    }

    if (!token || !user) {
      alert("You must be logged in");
      return;
    }

    try {
      const selectedRecipeIds = selectedRecipes.map((r) => r.idRecepta);

      const newBlog: Blog = await blogsAPI.addBlog(
        token,
        user.id,
        title,
        content,
        selectedRecipeIds
      );
      if (newBlog && newBlog.idBlogPost !== 0) {
        alert("Blog added successfully");
        navigate("/profile");
      } else {
        alert("Error while adding blog");
      }
    } catch (error) {
      console.error("Add blog error: ", error);
      alert("Error while adding blog");
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Blog</h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          placeholder="Write full blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />
      </div>

      <div className="form-group">
        <label>Select Recommended Recipes</label>
        <select
          multiple
          value={selectedRecipes.map((r) => r.idRecepta.toString())}
          onChange={(e) => {
            const selectedIds = Array.from(e.target.selectedOptions).map((o) =>
              Number(o.value)
            );
            const newSelected = allRecipes.filter((r) =>
              selectedIds.includes(r.idRecepta)
            );
            setSelectedRecipes(newSelected);
          }}
        >
          {allRecipes.map((recipe) => (
            <option key={recipe.idRecepta} value={recipe.idRecepta.toString()}>
              {recipe.nazivR}
            </option>
          ))}
        </select>
      </div>

      <div className="form-buttons">
        <button className="cancel-btn" onClick={() => navigate("/profile")}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default AddBlogPage;
