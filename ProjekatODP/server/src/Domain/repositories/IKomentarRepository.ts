import { Komentar } from "../models/Komentar";

export interface IKomentarRepository {
  dodajKomentar(komentar: Komentar): Promise<Komentar>;
  obrisiKomentar(idKomentara: number): Promise<boolean>;
  prikaziSveKomentareZaRecept(idRecepta:number): Promise<Komentar[]>;
  getByIdKomentara(idKomentara: number): Promise<Komentar>;
}
