export class Komentar {
  public constructor(
    public idKomentara: number = 0,
    public idRecepta: number = 0,
    public idKorisnika: number = 0,
    public tekst: string = "",
    public datum: Date = new Date(1944, 6, 6, 0, 0, 0, 0)
  ) {}
}
