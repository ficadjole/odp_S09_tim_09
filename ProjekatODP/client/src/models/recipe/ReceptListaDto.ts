import type { KategorijaDto } from "../kategorije/KategorijaDto";

export interface ReceptListaDto {
  idRecepta: number;
  nazivR: string;
  slika_url: string;
  kategorije: KategorijaDto[];
}
