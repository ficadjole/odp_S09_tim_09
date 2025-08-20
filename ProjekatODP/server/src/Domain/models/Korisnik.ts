import { Uloga } from "../enums/Uloga";

export class Korisnik {
  public constructor(
    public idKorisnika: number = 0,
    public username: string = "",
    public email: string = "",
    public passwordHash: string = "",
    public uloga: Uloga = Uloga.korisnik,
    public date: Date = new Date(1944, 6, 6, 0, 0, 0, 0)
  ) {}
}
