import React from "react";
import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import BlogCard from "../blog/BlogCard";

interface Props {
  blogs: BlogPostDto[];
  openBlog: (id: number) => void;
}

const BlogSection: React.FC<Props> = ({ blogs, openBlog }) => {
  return (
    <section className="blogs-section">
      <h2>Food Blogs</h2>
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.idBlogPost} blog={blog} openBlog={openBlog} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
