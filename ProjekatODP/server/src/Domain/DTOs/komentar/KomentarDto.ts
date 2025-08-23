export class KomentarDto {
  public constructor(
    public idKomentara: number = 0,
    public tekst: string = "",
    public datum: Date = new Date(),
    public autor?: {
      idKorisnika: number;
      username: string;
    }
  ) {}
}
