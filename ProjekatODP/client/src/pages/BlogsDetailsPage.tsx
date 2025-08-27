import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import type { Blog } from "../models/blog/Blog";
import Navbar from "../design_components/NavBar";
import "../styles/Blog.css";
import type { CommentDto } from "../models/comments/CommentDto";
import { blogsAPI } from "../api_services/blog_api/BlogAPIService";
import { commentApi } from "../api_services/comment_api/CommentApi";


const BlogDetailsPage: React.FC = () => {
  const un = "Maja"; // trenutno ulogovani korisnik
  const token = "";
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newComment, setNewComment] = useState("");

/*  const handleAddComment = () => {
    if (!newComment) return;
    const comment = {
      id: Date.now().toString(),
      author: un,
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };
  */

  useEffect(() => {
      if (!id) return;
  
      blogsAPI.getBlogById(token, Number(id)).then((foundBlog) => {
        if (foundBlog && foundBlog.idBlogPost !== 0) {
          setBlog(foundBlog);
        }
      });
    }, [id]);
  
    useEffect(() => {
      if (!id) return;
      console.log(id);
      commentApi
        .getAllCommentsForBlog(token, Number(id))
        .then((foundComments) => {
          if (foundComments.length > 0) {
            setComments(foundComments);
          }
        });
    }, [id]);
  
    if (!blog) return <p>Blog not found</p>;
    const handleAddComment = async () => {
      if (!newComment) return;
      const newCommentV = await commentApi.addComment(
        token,
        blog.idBlogPost,
        1, 
        newComment
      );
      setComments([...comments, newCommentV]);
      setNewComment("");
    };
    
  return (
    <div className="blog-details-page">
      <Navbar username={un} />

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

      <div className="blog-section comments-section">
        <h2>Comments</h2>
        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.idKomentara} className="comment">
                <strong>{c.autor?.idKorisnika}</strong>: {c.tekst}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

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
  );
};

export default BlogDetailsPage;
