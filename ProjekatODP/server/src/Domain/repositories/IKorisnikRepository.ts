import { Korisnik } from "../models/Korisnik";

export interface IKorisnikRepository {
  create(korisnik: Korisnik): Promise<Korisnik>;
  getById(idKorisnika: number): Promise<Korisnik>;
  getByUsername(username: string): Promise<Korisnik>;
  getAll(): Promise<Korisnik[]>;
  update(korisnik: Korisnik): Promise<Korisnik>;
  delete(idKorisnika: number): Promise<boolean>;
  exists(idKorisnika: number): Promise<boolean>;
}
