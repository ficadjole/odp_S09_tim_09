import { Kategorija } from "../models/Kategorija";

export interface IKategorijaRepository {
  dodajKategoriju(kategorija: Kategorija): Promise<Kategorija>;
  obrisiKategoriju(idKategorije: number): Promise<boolean>;
  azurirajKategoriju(nazivKStari: string, nazivKNovi: string): Promise<boolean>;
  getByNazivK(nazivK: string): Promise<Kategorija>;
  getByIdKategorije(idKategorije: number): Promise<Kategorija>;
  getAllKategorije(): Promise<Kategorija[]>;
}
