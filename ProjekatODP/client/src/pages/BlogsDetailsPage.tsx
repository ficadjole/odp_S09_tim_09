import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Blog } from "../models/blog/Blog";
import Navbar from "../components/nav_bar/NavBar";
import "../styles/Blog.css";
import { blogsAPI } from "../api_services/blog_api/BlogAPIService";
import { useAuth } from "../hooks/auth/authHook";

const BlogDetailsPage: React.FC = () => {
  const { user, token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id || !token) return;

    blogsAPI.getBlogById(token, Number(id)).then((foundBlog) => {
      if (foundBlog && foundBlog.idBlogPost !== 0) {
        setBlog(foundBlog);
      }
    });
  }, [id, token]);

  if (!blog) return <p>Blog not found</p>;

  const handleDelete = async () => {
    if (!token || !blog) return;

    const confirmed = window.confirm("Da li si siguran da želiš da obrišeš ovaj blog?");
    if (!confirmed) return;

    await blogsAPI.deleteBlog(
      token,
      blog.idBlogPost,
      blog.preporuceniRecepti.map((r) => r.idRecepta)
    );
    navigate("/blogs");
  };

  return (
    <div className="blog-details-page">
      <Navbar username={user?.username || ""} />

      <div className="blog-header">
        <img
          src={`https://picsum.photos/800/400?random=${blog.idBlogPost}`}
          alt={blog.naslovB}
        />
        <h1>{blog.naslovB}</h1>
        <p>By {blog.author?.username} </p>
      </div>

      <div className="blog-content">
        <p>{blog.sadrzaj}</p>
      </div>

      {user?.id === blog.author?.idKorisnika && (
        <button className="delete-button" onClick={handleDelete}>
          Delete Blog
        </button>
      )}
    </div>
  );
};

export default BlogDetailsPage;
