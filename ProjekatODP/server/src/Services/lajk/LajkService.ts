import { LajkDto } from "../../Domain/DTOs/lajk/LajkDto";
import { Lajk } from "../../Domain/models/Lajk";
import { ILajkRepository } from "../../Domain/repositories/ILajkRepository";
import { ILajkService } from "../../Domain/services/ILajkService";

export class LajkService implements ILajkService {
  public constructor(private lajkRepository: ILajkRepository) {}

  async dodajLajk(idRecepta: number, idKorisnika: number): Promise<LajkDto> {
    const noviLajk = await this.lajkRepository.dodajLajk(
      new Lajk(idRecepta, idKorisnika)
    );

    if (noviLajk.idKorisnika !== 0 && noviLajk.idRecepta !== 0) {
      return new LajkDto(noviLajk.idRecepta, noviLajk.idKorisnika);
    } else {
      return new LajkDto();
    }
  }

  async obrisiLajk(idRecepta: number, idKorisnika: number): Promise<LajkDto> {
    const postojeciLajk = await this.lajkRepository.korisnikLajkovao(
      idKorisnika,
      idRecepta
    );

    if (postojeciLajk === true) {
      const obrisiLajk = await this.lajkRepository.obrisiLajk(
        idRecepta,
        idKorisnika
      );

      if (obrisiLajk === true) {
        return new LajkDto(idRecepta, idKorisnika);
      } else {
        return new LajkDto();
      }
    } else {
      return new LajkDto();
    }
  }
  async brojLajkova(idRecepta: number): Promise<LajkDto> {
    const brLajkova = await this.lajkRepository.brojLajkovaRecept(idRecepta);

    if (brLajkova !== -1) {
      return new LajkDto(idRecepta, 0, brLajkova);
    } else {
      return new LajkDto();
    }
  }
  async korisnikLajkovao(
    idRecepta: number,
    idKorisnika: number
  ): Promise<LajkDto> {
    const postojeciLajk = await this.lajkRepository.korisnikLajkovao(
      idKorisnika,
      idRecepta
    );

    if (postojeciLajk === true) {
      return new LajkDto(idRecepta, idKorisnika, 0, postojeciLajk);
    } else {
      return new LajkDto();
    }
  }
}
