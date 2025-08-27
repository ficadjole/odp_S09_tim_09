import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";

export interface ICategoryApiService {
  addCategory(token: string, nazivK: string): Promise<KategorijaDto>;
  removeCategory(token: string, nazivK: string): Promise<KategorijaDto>;
  updateCategory(
    token: string,
    nazivKNovi: string,
    nazivKStari: string
  ): Promise<KategorijaDto>;
  getAllCategories(token: string): Promise<KategorijaDto[]>;
}
