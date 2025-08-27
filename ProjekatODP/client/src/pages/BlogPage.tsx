/* import React, { useState } from "react";
import { useParams } from "react-router-dom";
import type { Blog } from "../models/blog/Blog";
import blogData from "../models/blog/Blog";
import Navbar from "../design_components/NavBar";
import "../styles/Blog.css";

const BlogDetailsPage: React.FC = () => {
  const un = "Maja";
  const { id } = useParams<{ id: string }>();
  const blog = blogData.find((b: Blog) => b.id === id);

  const [comments, setComments] = useState<{ id: string; author: string; text: string }[]>([]);
  const [newComment, setNewComment] = useState("");

  if (!blog) return <p>Blog not found</p>;

  const handleAddComment = () => {
    if (!newComment) return;
    const comment = {
      id: Date.now().toString(),
      author: un,
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="blog-details-page">
      <Navbar username={un} />

      <div className="blog-header">
        <img
          src={`https://picsum.photos/800/400?random=${blog.id}`}
          alt={blog.title}
        />
        <h1>{blog.title}</h1>
      </div>

      <div className="blog-content">
        <p>{blog.content}</p>

        <div className="comments-section">
          <h2>Comments</h2>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment">
                <strong>{c.author}</strong>: {c.text}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <div className="add-comment">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
 */