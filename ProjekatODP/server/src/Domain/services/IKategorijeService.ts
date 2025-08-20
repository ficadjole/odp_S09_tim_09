import { KategorijaDto } from "../DTOs/kategorija/KategorijaDto";

export interface IKategorijeService {
  obrisiKategoriju(nazivK: string): Promise<KategorijaDto>;
  dodajKategoriju(nazivK: string): Promise<KategorijaDto>;
}
