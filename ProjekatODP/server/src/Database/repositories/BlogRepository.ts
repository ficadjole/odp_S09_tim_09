import { BlogPost } from "../../Domain/models/BlogPost";
import { IBlogRepository } from "../../Domain/repositories/IBlogRepository";
import db from "../connection/db_connection_pool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class BlogRepository implements IBlogRepository {
  async dodajBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    try {
      const query =
        "INSERT INTO blog_post (idModerator,naslovB,sadrzaj) VALUES (?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPost.idModerator,
        blogPost.naslovB,
        blogPost.sadrzaj,
      ]);

      if (result.insertId) {
        return new BlogPost(
          result.insertId,
          blogPost.idModerator,
          blogPost.naslovB,
          blogPost.sadrzaj,
          new Date()
        );
      } else {
        return new BlogPost();
      }
    } catch (error) {
      console.log(error);
      return new BlogPost();
    }
  }

  async obrisiBlogPost(idBlogPost: number): Promise<boolean> {
    try {
      const query = "DELETE FROM blog_post WHERE idBlogPost = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [idBlogPost]);

      return result.affectedRows > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getByidBlogPost(idBlogPost: number): Promise<BlogPost> {
    try {
      const query = "SELECT * FROM blog_post WHERE idBlogPost = ?";
      const [rows] = await db.execute<RowDataPacket[]>(query, [idBlogPost]);

      if (rows.length > 0) {
        const row = rows[0];

        return new BlogPost(
          row.idBlogPost,
          row.idModerator,
          row.naslovB,
          row.sadrzaj,
          row.datum
        );
      } else {
        return new BlogPost();
      }
    } catch (error) {
      console.log(error);
      return new BlogPost();
    }
  }

  async getByNaslovB(naslovB: string): Promise<BlogPost> {
    try {
      const query = "SELECT * FROM blog_post WHERE naslovB = ?";
      const [rows] = await db.execute<RowDataPacket[]>(query, [naslovB]);

      if (rows.length > 0) {
        const row = rows[0];

        return new BlogPost(
          row.idBlogPost,
          row.idModerator,
          row.naslovB,
          row.sadrzaj,
          row.datum
        );
      } else {
        return new BlogPost();
      }
    } catch (error) {
      console.log(error);
      return new BlogPost();
    }
  }
  async getAllBlogPost(): Promise<BlogPost[]> {
    try {
      const query = "SELECT * FROM blog_post ORDER BY idBlogPost ASC";

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new BlogPost(
            row.idBlogPost,
            row.idModerator,
            row.naslovB,
            row.sadrzaj,
            row.datum
          )
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
