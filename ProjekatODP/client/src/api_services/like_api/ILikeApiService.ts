import type { LikeDto } from "../../models/like/LikeDto";

export interface ILikeApiService {
  addLike(
    token: string,
    idRecepta: number,
    idKorisnika: number
  ): Promise<LikeDto>;
  removeLike(
    token: string,
    idRecepta: number,
    idKorisnika: number
  ): Promise<LikeDto>;
  numberOfLikes(token: string, idRecepta: number): Promise<LikeDto>;
  userLiked(
    token: string,
    idRecepta: number,
    idKorisnika: number
  ): Promise<LikeDto>;
}
