import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import type { Blog } from "../../models/blog/Blog";

export interface IBlogAPIService {
  getAllBlogs(token: string): Promise<BlogPostDto[]>;
  getBlogById(token: string, idBlogPost: number): Promise<Blog>;
  addBlog(
    token: string,
    idKorisnika: number,
    naslovB: string,
    sadrzaj: string,
    idPreporucenRecepti: number[]
  ): Promise<Blog>;
  deleteBlog(
    token: string,
    idBlogPost: number,
    idPreporucenRecept: number[]
  ): Promise<Blog>;
}
