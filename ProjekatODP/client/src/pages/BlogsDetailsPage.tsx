import React from "react";
import type { IBlogAPIService } from "../api_services/blog_api/IBlogAPIService";
import { BlogDetailsContainer } from "../components/blog/blog/blogDetails/BlogDetailsContainer";

interface BlogDetailsPageProps {
  blogsApi: IBlogAPIService;
}

const BlogDetailsPage: React.FC<BlogDetailsPageProps> = ({ blogsApi }) => {
  return (
    <div className="recipe-details-page">
      <BlogDetailsContainer blogsApi={blogsApi} />
    </div>
  );
};

export default BlogDetailsPage;
