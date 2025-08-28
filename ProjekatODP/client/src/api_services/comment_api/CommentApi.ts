import type { CommentDto } from "../../models/comments/CommentDto";
import type { ICommentApi } from "./ICommentApi";
import axios from "axios";
//const API_URL: string = import.meta.env.VITE_API_URL + "recepti";
const API_URL = "http://localhost:4000/api/v1/komentari";
const emptyComment: CommentDto = {
  idKomentara: 0,
  tekst: "",
  datum: new Date(),
};

export const commentApi: ICommentApi = {
  async getAllCommentsForRecipe(
    token: string,
    idRecepta: number
  ): Promise<CommentDto[]> {
    try {
      const res = await axios.get<{ data: CommentDto[] }>(
        `${API_URL}/prikaziSveKomentare/${encodeURIComponent(idRecepta)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getAllCommentsForBlog(
    token: string,
    idBlogPost: number
  ): Promise<CommentDto[]> {
    try {
      const res = await axios.get<{ data: CommentDto[] }>(
        `${API_URL}/prikaziSveKomentare/${encodeURIComponent(idBlogPost)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async addComment(
    token: string,
    idRecepta: number,
    idKorisnika: number,
    tekst: string
  ): Promise<CommentDto> {
    try {
      const res = await axios.post<{ data: CommentDto }>(
        `${API_URL}/dodajKomentar`,
        {
          idRecepta,
          idKorisnika,
          tekst,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch {
      return emptyComment;
    }
  },
  async deleteComment(token: string, idKomentara: number): Promise<CommentDto> {
    try {
      const res = await axios.delete(`${API_URL}/obrisiKomentar`, {
        data: {
          idKomentara,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch {
      return emptyComment;
    }
  },
};
