import React from "react";
import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import "../../styles/blog/BlogCard.css";

interface BlogCardProps {
  blog: BlogPostDto;
  openBlog: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, openBlog }) => {
  return (
    <div className="blog-card">
      <div className="blog-info">
        <h1>{blog.naslovB}</h1>
        <p>{blog.sadrzaj}</p>
        <p>Created at: {new Date(blog.datumBP).toDateString()}</p>
        <button className="read-more" onClick={() => openBlog(blog.idBlogPost)}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
