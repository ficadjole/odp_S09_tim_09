import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import type { Blog } from "../../models/blog/Blog";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";

export interface IBlogAPIService {
    getAllBlogs(token: string): Promise<BlogPostDto[]>;
    getBlogById(token: string, idBlogPost: number): Promise<Blog>;
    addBlog(
        token: string,
        naslovB: string,
        sadrzaj: string,
        idPreporucenRecepti: ReceptListaDto,
    ): Promise<Blog>;
    deleteBlog(
        token: string,
        idBlogPost: number,
        idPreporucenRecept: ReceptListaDto,
    ): Promise<Blog>;
}

