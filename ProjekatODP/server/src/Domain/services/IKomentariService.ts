import { KomentarDto } from "../DTOs/komentar/KomentarDto";

export interface IKomenatariService {
  dodajKomentar(
    idRecepta: number,
    idKorisnika: number,
    tekst: string
  ): Promise<KomentarDto>;
  obrisiKomentar(idKomentara: number): Promise<KomentarDto>;
  prikaziSveKomentareZaRecept(idRecepta: number): Promise<KomentarDto[]>;
}
