import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/AddBlog.css";
import { useAuth } from "../hooks/auth/authHook";
import type { Blog } from "../models/blog/Blog";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";

import { BlogForm } from "../components/blog/BlogForm";
import { RecipeSelector } from "../components/blog/RecipeSelector";
import type { IBlogAPIService } from "../api_services/blog_api/IBlogAPIService";
import type { IReceptApiService } from "../api_services/recept_api/IReceptApiService";

interface AddBlogPageProps {
  blogsAPI: IBlogAPIService;
  recipesApi: IReceptApiService;
}

const AddBlogPage: React.FC<AddBlogPageProps> = ({ blogsAPI, recipesApi }) => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allRecipes, setAllRecipes] = useState<ReceptListaDto[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<ReceptListaDto[]>([]);

  return (
    <div className="add-recipe-container">
      <h2>Add New Blog</h2>

      <BlogForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />

      <RecipeSelector
        token={token}
        recipesApi={recipesApi}
        allRecipes={allRecipes}
        setAllRecipes={setAllRecipes}
        selectedRecipes={selectedRecipes}
        setSelectedRecipes={setSelectedRecipes}
      />

      <div className="form-buttons">
        <button
          className="cancel-btn"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          onClick={async () => {
            if (!title || !content) {
              alert("Fill in title and content of the blog");
              return;
            }
            if (!token || !user) {
              alert("You must be logged in");
              return;
            }

            try {
              const selectedRecipeIds = selectedRecipes.map(
                (r) => r.idRecepta
              );

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
          }}
        >
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default AddBlogPage;
