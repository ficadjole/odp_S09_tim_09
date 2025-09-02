import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../../models/blog/Blog";
import type { IBlogAPIService } from "../../api_services/blog_api/IBlogAPIService";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import { validationBlog } from "../../api_services/validators/BlogValidation";

interface BlogSubmitButtonProps {
  title: string;
  content: string;
  selectedRecipes: ReceptListaDto[];
  token: string | null;
  user: { id: number } | null;
  blogsAPI: IBlogAPIService;
}

export const BlogSubmitButtons: React.FC<BlogSubmitButtonProps> = ({
  title,
  content,
  selectedRecipes,
  token,
  user,
  blogsAPI,
}) => {
  const navigate = useNavigate();
  const [greska, setGreska] = useState("");

  const handleSave = async () => {
    const validacija = validationBlog(title, content);
    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Invalid input");
      return;
    }
    if (!token || !user) {
      setGreska("You must be logged in");
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
        setGreska("Error while adding blog");
      }
    } catch (error) {
      console.error("Add blog error: ", error);
      setGreska("Error while adding blog");
    }
  };

  return (
    <div className="form-buttons">
      <button className="cancel-btn" onClick={() => navigate("/profile")}>
        Cancel
      </button>
      <button className="save-btn" onClick={handleSave}>
        Save Blog
      </button>
      {greska && <p className="text-red-600">{greska}</p>}
    </div>
  );
};
