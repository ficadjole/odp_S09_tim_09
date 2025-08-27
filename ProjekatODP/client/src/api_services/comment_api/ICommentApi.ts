import type { CommentDto } from "../../models/comments/CommentDto";

export interface ICommentApi {
  getAllCommentsForRecipe(
    token: string,
    idRecepta: number
  ): Promise<CommentDto[]>;
  getAllCommentsForBlog(
    token: string,
    idBlogPost: number
  ): Promise<CommentDto[]>;
  addComment(
    token: string,
    idRecepta: number,
    idKorisnika: number,
    tekst: string
  ): Promise<CommentDto>;
  deleteComment(token: string, idKomentara: number): Promise<CommentDto>;
}
