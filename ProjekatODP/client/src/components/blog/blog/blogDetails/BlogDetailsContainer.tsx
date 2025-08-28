import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/auth/authHook";
import type { Blog } from "../../../../models/blog/Blog";
import type { IBlogAPIService } from "../../../../api_services/blog_api/IBlogAPIService";
import { BlogDetailsView } from "./BlogDetailsView";

interface BlogDetailsContainerProps {
  blogsApi: IBlogAPIService;
}

export const BlogDetailsContainer: React.FC<BlogDetailsContainerProps> = ({
  blogsApi,
}) => {
  const { token, user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !token) return;

    const fetchBlog = async () => {
      try {
        const foundBlog = await blogsApi.getBlogById(token, Number(id));
        if (foundBlog && foundBlog.idBlogPost !== 0) {
          setBlog(foundBlog);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, token, blogsApi]);

  const handleDelete = async () => {
    if (!token || !blog) return;

    const confirmed = window.confirm(
      "Da li si siguran da želiš da obrišeš ovaj blog?"
    );
    if (!confirmed) return;

    await blogsApi.deleteBlog(
      token,
      blog.idBlogPost,
      blog.preporuceniRecepti.map((r) => r.idRecepta)
    );
    navigate("/home");
  };

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <BlogDetailsView
      blog={blog}
      user={user}
      recipes={blog.preporuceniRecepti}
      onDelete={handleDelete}
    />
  );
};
