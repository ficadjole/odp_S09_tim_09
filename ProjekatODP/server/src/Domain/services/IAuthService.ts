import { KorisnikLoginDto } from "../DTOs/auth/KorisnikLoginDto";
import { Uloga } from "../enums/Uloga";

export interface IAuthService {
  prijava(
    username: string,
    email: string,
    passwordHash: string
  ): Promise<KorisnikLoginDto>;
  registracija(
    username: string,
    email: string,
    password: string,
    uloga: Uloga
  ): Promise<KorisnikLoginDto>;
}
