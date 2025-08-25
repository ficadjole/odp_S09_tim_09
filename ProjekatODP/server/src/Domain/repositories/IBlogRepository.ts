import { BlogPost } from "../models/BlogPost";

export interface IBlogRepository {
  dodajBlogPost(blogPost: BlogPost): Promise<BlogPost>;
  obrisiBlogPost(idBlogPost: number): Promise<boolean>;
  getByidBlogPost(idBlogPost: number): Promise<BlogPost>;
  getByNaslovB(naslovB: string): Promise<BlogPost>;
  getAllBlogPost(): Promise<BlogPost[]>;
}
