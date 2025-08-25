import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../models/blog/Blog";
import "../styles/AddBlog.css";

const AddBlogPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    const newBlog: Blog = {
      id: Date.now().toString(),
      title,
      shortDescription,
      content,
      authorId: "currentUser",
      createdAt: new Date().toISOString(),
    };
    console.log("Saved blog:", newBlog);
    navigate("/blog");
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
        <label>Short Description</label>
        <input
          type="text"
          placeholder="Enter short description..."
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
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
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" className="preview-image" />}
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
