import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import type { Blog } from "../../models/blog/Blog";
import type { IBlogAPIService } from "./IBlogAPIService";
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/blogPost";
const emptyBlog: Blog = {
  idBlogPost: 0,
  naslovB: "",
  sadrzaj: "",
  datumBP: new Date(),
  preporuceniRecepti: [],
  author: {
    idKorisnika: 0,
    username: "",
  },
};

export const blogsAPI: IBlogAPIService = {
  async getAllBlogs(token: string): Promise<BlogPostDto[]> {
    try {
      const res = await axios.get<{ data: BlogPostDto[] }>(
        `${API_URL}/prikaziSveBlogove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch (error) {
      console.log("Greska front: ", error);
      return [];
    }
  },

  async getBlogById(token: string, idRecepta: number): Promise<Blog> {
    try {
      const res = await axios.get<{ data: Blog }>(
        `${API_URL}/${encodeURIComponent(idRecepta)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch {
      return emptyBlog;
    }
  },

  async addBlog(
    token: string,
    idKorisnika: number,
    naslovB: string,
    sadrzaj: string,
    idPreporucenRecept: number[]
  ): Promise<Blog> {
    try {
      const res = await axios.post<{ data: Blog }>(
        `${API_URL}/dodaj`,
        { idKorisnika, naslovB, sadrzaj, idPreporucenRecept },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch {
      return emptyBlog;
    }
  },

  async deleteBlog(
    token: string,
    idBlogPost: number,
    idPreporucenRecept: number[]
  ): Promise<Blog> {
    try {
      const res = await axios.delete(`${API_URL}/obrisi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          idBlogPost,
          idPreporucenRecept,
        },
      });
      return res.data;
    } catch {
      return emptyBlog;
    }
  },
};
