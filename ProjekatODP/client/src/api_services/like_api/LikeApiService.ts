import axios from "axios";
import type { LikeDto } from "../../models/like/LikeDto";
import type { ILikeApiService } from "./ILikeApiService";
const API_URL = "http://localhost:4000/api/v1/lajkovi";
const emptyLike: LikeDto = {
  idRecepta: 0,
  idKorisnika: 0,
  brojLajkova: 0,
  korisnikLajkova: false,
};

export const likeApiService: ILikeApiService = {
  async addLike(
    token: string,
    idRecepta: number,
    idKorisnika: number
  ): Promise<LikeDto> {
    try {
      const res = await axios.post<LikeDto>(
        `${API_URL}/dodajLajk`,
        {
          idRecepta,
          idKorisnika,
        }
        /*         {
          headers: { Authorization: `Bearer ${token}` },
        } */
      );

      return res.data.data;
    } catch {
      return emptyLike;
    }
  },
  async removeLike(
    token: string,
    idRecepta: number,
    idKorisnika: number
  ): Promise<LikeDto> {
    try {
      const res = await axios.delete(`${API_URL}/obrisiLajk`, {
        data: {
          idRecepta,
          idKorisnika,
        },
        /*         headers: {
          Authorization: `Bearer ${token}`,
        }, */
      });

      return res.data.data;
    } catch {
      return emptyLike;
    }
  },
  async numberOfLikes(token: string, idRecepta: number): Promise<number> {
    try {
      const res = await axios.get<number>(
        `${API_URL}/brojLajkova/${encodeURIComponent(idRecepta)}`
      );
    } catch {
      return -1;
    }
  },
  async userLiked(token: string, idKorisnika: number): Promise<boolean> {
    throw new Error("Function not implemented.");
  },
};
