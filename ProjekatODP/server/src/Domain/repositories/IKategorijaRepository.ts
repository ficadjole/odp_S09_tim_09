import { Kategorija } from "../models/Kategorija";

export interface IKategorijaRepository {
  dodajKategoriju(kategorija: Kategorija): Promise<Kategorija>;
  obrisiKategoriju(idKategorije: number): Promise<boolean>;
  getByNazivK(nazivK: string): Promise<Kategorija>;
}
