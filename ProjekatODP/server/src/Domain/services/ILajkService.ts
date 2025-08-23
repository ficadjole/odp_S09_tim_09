import { LajkDto } from "../DTOs/lajk/LajkDto";

export interface ILajkService {
  dodajLajk(idRecepta: number, idKorisnika: number): Promise<LajkDto>;
  obrisiLajk(idRecepta: number, idKorisnika: number): Promise<LajkDto>;
  //ovde dole sam stavljao LajkDto jer tamo imamo polja za status da li je lajkovan recept i broj lajkova za svaki recept
  brojLajkova(idRecepta: number): Promise<LajkDto>;
  korisnikLajkovao(idRecepta: number, idKorisnika: number): Promise<LajkDto>;
}
