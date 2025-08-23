export class Recept {
  public constructor(
    public idRecepta: number = 0,
    public idKorisnika: number = 0,
    public nazivR: string = "",
    public sastojci: string = "",
    public opis: string = "",
    public saveti: string = "",
    public slika_url: string = "",
    public datum: Date = new Date(1944, 6, 6, 0, 0, 0, 0)
  ) {}
}
