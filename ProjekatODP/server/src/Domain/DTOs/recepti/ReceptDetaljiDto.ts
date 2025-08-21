import { KategorijaDto } from "../kategorija/KategorijaDto";

export class ReceptDetaljiDto {
  public constructor(
    public idKorisnika: number = 0,
    public idRecepta: number = 0,
    public nazivR: string = "",
    public sastojic: string = "",
    public opis: string = "",
    public slika_url: string = "",
    public date: Date = new Date(),
  ) {}
}
