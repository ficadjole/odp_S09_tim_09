import type { BlogPostDto } from "../../models/blog/BlogListaDto";
import type { Blog } from "../../models/blog/Blog";
import type { IBlogAPIService } from "./IBlogAPIService";
import axios from "axios";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";

const API_URL = "http://localhost:4000/api/v1/blogPost";
const emptyBlog: Blog = {
  idBlogPost: 0,
  naslovB: "",
  sadrzaj: "",
  datum: new Date(),
  preporuceniRecepti: [],
  author: {
    idKorisnika: 0,
    username: "",
  },
};

export const blogsAPI: IBlogAPIService = {
  async getAllBlogs(token: string): Promise<BlogPostDto[]> {
    try {
      const res = await axios.get<BlogPostDto[]>(`${API_URL}/prikaziSveBlogove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      console.log("Greska front: ", error);
      return [];
    }
  },

  async getBlogById(token: string, idRecepta: number): Promise<Blog> {
    try {
      const res = await axios.get<Blog>(`${API_URL}/${encodeURIComponent(idRecepta)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch {
      return emptyBlog;
    }
  },

  async addBlog(
    token: string,
    naslovB: string,
    sadrzaj: string,
    idPreporucenRecepti: ReceptListaDto[]
  ): Promise<Blog> {
    try {
      const res = await axios.post<Blog>(
        `${API_URL}/dodaj`,
        { naslovB, sadrzaj, idPreporucenRecepti },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch {
      return emptyBlog;
    }
  },

  async deleteBlog(
    token: string,
    idBlogPost: number,
    idPreporucenRecept: ReceptListaDto[]
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
