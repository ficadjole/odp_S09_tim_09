import { Lajk } from "../models/Lajk";

export interface ILajkRepository {
  dodajLajk(lajk: Lajk): Promise<Lajk>;
  obrisiLajk(idRecepta: number, idKorisnika: number): Promise<boolean>;
  brojLajkovaRecept(idRecepta: number): Promise<number>;
  korisnikLajkovao(idKorisnika: number, idRecepta: number): Promise<boolean>;
}
