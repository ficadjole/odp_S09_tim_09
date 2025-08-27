import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../models/blog/Blog";
import "../styles/AddBlog.css";
import { blogsAPI } from "../api_services/blog_api/BlogAPIService";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";


const AddBlogPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preporuceniRecept, setPreporuceniRecept] = useState<ReceptListaDto | null>(null);

  const token = localStorage.getItem("token") || "";


  const handleSave = async () => {
    if(!title || !content){
      alert("Fill in title and content of the blog");
      return;
    }

    try{
      const newBlog: Blog = await blogsAPI.addBlog(
        token,
        title,
        content,
        preporuceniRecept as ReceptListaDto
      );

      if(newBlog && newBlog.idBlogPost !== 0){
        alert("Blog is not added successfully");
        navigate("/profile");
      } else{
        alert("Error while adding blog");
      }
    } catch (error){
      console.error("Add blog error: ", error);
      alert("Error while blog adding");
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

    

      <div className="form-buttons">
        <button className="cancel-btn" onClick={() => navigate("/blog")}>
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
