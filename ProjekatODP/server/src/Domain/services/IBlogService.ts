import { BlogPostDto } from "../DTOs/blogPost/BlogPostDto";

export interface IBlogService {
  dodajBlogPost(
    idModeratora: number,
    naslovB: string,
    sadrzaj: string,
    idPreporucenRecept: number[]
  ): Promise<BlogPostDto>;
  obrisiBlogPost(idBlogPost: number, idRecepta: number[]): Promise<BlogPostDto>;
  prikaziSveBlogPost(): Promise<BlogPostDto[]>;
  getByIdBlogPost(idBlogPost: number): Promise<BlogPostDto>;
}
