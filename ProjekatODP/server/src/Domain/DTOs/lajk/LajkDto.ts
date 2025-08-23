export class LajkDto {
  public constructor(
    public idRecepta: number = 0,
    public idKorisnika: number = 0,
    public brojLajkova: number = -1,
    public korisnikLajkova: boolean = false
  ) {}
}
