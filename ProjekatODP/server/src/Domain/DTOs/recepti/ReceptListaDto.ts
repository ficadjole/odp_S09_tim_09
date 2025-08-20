export class ReceptiListaDto {
  public constructor(
    public idRecepta: number = 0,
    public nazivR: string = ""
  ) {}
}

//ovo ce nam sluziti kada ispisujemo sve recepte kao listu za moderatora da zna kog zeli da izbrise
