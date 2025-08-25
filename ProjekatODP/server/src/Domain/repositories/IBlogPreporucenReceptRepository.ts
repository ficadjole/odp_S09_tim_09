import { BlogPreporucenRecept } from "../models/BlogPreporucenRecept";

export interface IBlogPreporucenReceptRepository {
  dodajBlogPreporucenRecept(
    blogPreporucenRecept: BlogPreporucenRecept
  ): Promise<BlogPreporucenRecept>;
  obrisiBlogPreporucenRecept(
    idBlogPost: number,
    idRecepta: number
  ): Promise<boolean>;
  getById(idBlogPost: number, idRecepta: number): Promise<BlogPreporucenRecept>;
  getAllPreporuceneZaPost(idBlogPost: number): Promise<BlogPreporucenRecept[]>;
}
