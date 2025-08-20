import { Uloga } from "../enums/Uloga";

export class KorisnikLoginDto {
  public constructor(
    public idKorisnika: number = 0,
    public username: string = "",
    public email: string = "",
    public uloga: Uloga = Uloga.korisnik
  ) {}
}
