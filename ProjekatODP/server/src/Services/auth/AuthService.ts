import { KorisnikLoginDto } from "../../Domain/DTOs/KorisnikLoginDto";
import { Uloga } from "../../Domain/enums/Uloga";
import { Korisnik } from "../../Domain/models/Korisnik";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import { IAuthService } from "../../Domain/services/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(
    process.env.SALT_ROUNDS || "10",
    10
  );
  public constructor(private korisnikRepository: IKorisnikRepository) {}

  async prijava(
    username: string,
    email: string,
    passwordHash: string
  ): Promise<KorisnikLoginDto> {
    const user = await this.korisnikRepository.getByUsername(username);

    if (
      user.idKorisnika !== 0 &&
      (await bcrypt.compare(passwordHash, user.passwordHash)) &&
      user.email === email
    ) {
      return new KorisnikLoginDto(
        user.idKorisnika,
        user.username,
        user.email,
        user.uloga
      );
    } else {
      return new KorisnikLoginDto();
    }
  }
  async registracija(
    username: string,
    email: string,
    password: string,
    uloga: Uloga
  ): Promise<KorisnikLoginDto> {
    const postojeciKorisnik = await this.korisnikRepository.getByUsername(
      username
    );

    if (postojeciKorisnik.idKorisnika !== 0) return new KorisnikLoginDto();

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const noviKorisnik = await this.korisnikRepository.create(
      new Korisnik(0, username, email, hashedPassword, uloga)
    );

    if (noviKorisnik.idKorisnika !== 0) {
      return new KorisnikLoginDto(
        noviKorisnik.idKorisnika,
        noviKorisnik.username,
        noviKorisnik.email,
        noviKorisnik.uloga
      );
    } else {
      return new KorisnikLoginDto();
    }
  }
}
