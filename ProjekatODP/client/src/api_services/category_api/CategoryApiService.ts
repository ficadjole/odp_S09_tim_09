import axios from "axios";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import type { ICategoryApiService } from "./ICategoryApiService";

//const API_URL: string = import.meta.env.VITE_API_URL + "recepti";
const API_URL = "http://localhost:4000/api/v1/kategorije";
const emptyCategory: KategorijaDto = {
  idKategorije: 0,
  nazivK: "",
};

export const categoryApiService: ICategoryApiService = {
  async addCategory(token: string, nazivK: string): Promise<KategorijaDto> {
    try {
      const res = await axios.post<KategorijaDto>(
        `${API_URL}/dodaj`,
        { nazivK },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch {
      return emptyCategory;
    }
  },
  async removeCategory(token: string, nazivK: string): Promise<KategorijaDto> {
    try {
      const res = await axios.delete<KategorijaDto>(`${API_URL}/obrisi`, {
        data: {
          nazivK,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch {
      return emptyCategory;
    }
  },
  async updateCategory(
    token: string,
    nazivKNovi: string,
    nazivKStari: string
  ): Promise<KategorijaDto> {
    try {
      const res = await axios.put<KategorijaDto>(
        `${API_URL}/azuriraj`,
        {
          nazivKNovi,
          nazivKStari,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch {
      return emptyCategory;
    }
  },
  async getAllCategories(token: string): Promise<KategorijaDto[]> {
    try {
      const res = await axios.get<KategorijaDto[]>(`${API_URL}/ispisiSve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch {
      return [];
    }
  },
};
