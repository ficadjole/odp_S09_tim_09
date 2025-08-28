import { KategorijaDto } from "../kategorija/KategorijaDto";

export class ReceptiListaDto {
  public constructor(
    public idRecepta: number = 0,
    public nazivR: string = "",
    public slika_url: string = "",
    public kategorije: KategorijaDto[] = [],
    public date: Date = new Date()
  ) {}
}

//ovo ce nam sluziti kada ispisujemo sve recepte kao listu za moderatora da zna kog zeli da izbrise
