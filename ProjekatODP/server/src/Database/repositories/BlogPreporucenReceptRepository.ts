import { BlogPreporucenRecept } from "../../Domain/models/BlogPreporucenRecept";
import { IBlogPreporucenReceptRepository } from "../../Domain/repositories/IBlogPreporucenReceptRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../connection/db_connection_pool";

export class BlogPreporucenReceptRepository
  implements IBlogPreporucenReceptRepository
{
  async dodajBlogPreporucenRecept(
    blogPreporucenRecept: BlogPreporucenRecept
  ): Promise<BlogPreporucenRecept> {
    try {
      const query =
        "INSERT INTO blog_preporuceni_recepti (idBlogPost,idRecepta) VALUES (?,?)";
      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPreporucenRecept.idBlogPost,
        blogPreporucenRecept.idRecepta,
      ]);

      if (result.affectedRows > 0) {
        return new BlogPreporucenRecept(
          blogPreporucenRecept.idBlogPost,
          blogPreporucenRecept.idRecepta
        );
      } else {
        return new BlogPreporucenRecept();
      }
    } catch (error) {
      console.log(error);
      return new BlogPreporucenRecept();
    }
  }
  async obrisiBlogPreporucenRecept(
    idBlogPost: number,
    idRecepta: number
  ): Promise<boolean> {
    try {
      const query =
        "DELETE FROM blog_preporuceni_recepti WHERE idBlogPost = ? AND idRecepta = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        idBlogPost,
        idRecepta,
      ]);
      
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async getById(
    idBlogPost: number,
    idRecepta: number
  ): Promise<BlogPreporucenRecept> {
    try {
      const query =
        "SELECT * FROM blog_preporuceni_recepti WHERE idBlogPost = ? AND idRecepta = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [
        idBlogPost,
        idRecepta,
      ]);

      if (rows.length > 0) {
        const row = rows[0];
        return new BlogPreporucenRecept(row.idBlogPost, row.idRecepta);
      } else {
        return new BlogPreporucenRecept();
      }
    } catch {
      return new BlogPreporucenRecept();
    }
  }
  async getAllPreporuceneZaPost(
    idBlogPost: number
  ): Promise<BlogPreporucenRecept[]> {
    try {
      const query =
        "SELECT * FROM blog_preporuceni_recepti WHERE idBlogPost = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [idBlogPost]);
      if (rows.length > 0) {
        return rows.map(
          (row) => new BlogPreporucenRecept(row.idBlogPost, row.idRecepta)
        );
      }

      return [];
    } catch {
      return [];
    }
  }
}
