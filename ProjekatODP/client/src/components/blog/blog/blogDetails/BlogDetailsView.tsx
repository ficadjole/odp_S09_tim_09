import React from "react";
import Navbar from "../../../nav_bar/NavBar";
import type { Blog } from "../../../../models/blog/Blog";
import type { AuthUser } from "../../../../types/auth/AuthUser";

interface BlogDetailsViewProps {
  blog: Blog;
  user: AuthUser | null;
  onDelete: () => void;
}

export const BlogDetailsView: React.FC<BlogDetailsViewProps> = ({
  blog,
  user,
  onDelete,
}) => {
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

      {user?.id === blog.author?.idKorisnika && (
        <button className="delete-button" onClick={onDelete}>
          Delete Blog
        </button>
      )}
    </div>
  );
};
