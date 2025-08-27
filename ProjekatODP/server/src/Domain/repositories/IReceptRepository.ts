import { Recept } from "../models/Recept";

export interface IReceptRepository {
  dodajRecept(recept: Recept): Promise<Recept>;
  azurirajRecept(recept: Recept): Promise<Recept>;
  obrisisRecept(idRecepta: number): Promise<boolean>;
  getByNazivR(nazivR: string): Promise<Recept>;
  getByIdRecepta(idRecepta: number): Promise<Recept>;
  getAllRecepti(): Promise<Recept[]>;
  getAllReceptiKorisnik(idKorisnika: number): Promise<Recept[]>;
}
