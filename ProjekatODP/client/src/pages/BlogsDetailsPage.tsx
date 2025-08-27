import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import type { Blog } from "../models/blog/Blog";
import Navbar from "../design_components/NavBar";
import "../styles/Blog.css";
import { blogsAPI } from "../api_services/blog_api/BlogAPIService";
import { useAuth } from "../hooks/auth/authHook";


const BlogDetailsPage: React.FC = () => {
  const { user, token } = useAuth();
  console.log(user?.username);
  const { id } = useParams<{ id: string }>();
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
    
  return (
    <div className="blog-details-page">
      <Navbar username={user?.username || ""} />

    <div className="blog-header">
    <img
      src={`https://picsum.photos/800/400?random=${blog.idBlogPost}`}
      alt={blog.naslovB}
    />
    <h1>{blog.naslovB}</h1>
    <p>By {blog.author?.idKorisnika} </p>
    </div>

    <div className="blog-content">
      <p>{blog.sadrzaj}</p>
    </div> 
    </div>
  );
};

export default BlogDetailsPage;
