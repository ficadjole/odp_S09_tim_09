import { ReceptKategorija } from "../models/ReceptKategorija";

export interface IReceptKategorijaRepository {
  dodajReceptKategorija(
    receptKategorija: ReceptKategorija
  ): Promise<ReceptKategorija>;
  obrisiReceptKategorija(
    idRecepta: number,
    idKategorije: number
  ): Promise<boolean>;
  azurirajReceptKategorija(
    receptKategorija: ReceptKategorija,
    idNoveKategorije: number
  ): Promise<ReceptKategorija>;
  getById(idRecepta: number, idKategorije: number): Promise<ReceptKategorija>;
}
