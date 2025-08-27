import { Uloga } from "./UserRole";

export class KorisnikLoginDto {
  public constructor(
    public idKorisnika: number = 0,
    public username: string = "",
    public password: string = "",
    public email: string = "",
    public uloga: Uloga = Uloga.korisnik
  ) {}
}
