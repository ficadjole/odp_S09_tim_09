import { ReceptDetaljiDto } from "../../Domain/DTOs/recepti/ReceptDetaljiDto";
import { ReceptiListaDto } from "../../Domain/DTOs/recepti/ReceptListaDto";
import { Recept } from "../../Domain/models/Recept";
import { ReceptKategorija } from "../../Domain/models/ReceptKategorija";
import { IKategorijaRepository } from "../../Domain/repositories/IKategorijaRepository";
import { IReceptKategorijaRepository } from "../../Domain/repositories/IReceptKategorijaRepository";
import { IReceptRepository } from "../../Domain/repositories/IReceptRepository";
import { IReceptService } from "../../Domain/services/IReceptService";

export class ReceptService implements IReceptService {
  public constructor(
    private receptRepository: IReceptRepository,
    private receptKategorijaRepository: IReceptKategorijaRepository,
    private kategorijaRepository: IKategorijaRepository
  ) {}

  async dodajRecept(
    idKorisnika: number,
    nazivR: string,
    sastojci: string,
    opis: string,
    slika_url: string,
    idKategorije: number[] //ovde ide lista idKategorija
  ): Promise<ReceptDetaljiDto> {
    //dodavanje samog recepta
    const postojeciRecept = await this.receptRepository.getByNazivR(nazivR);

    if (postojeciRecept.idRecepta !== 0) return new ReceptDetaljiDto();

    const noviRecept = await this.receptRepository.dodajRecept(
      new Recept(0, idKorisnika, nazivR, sastojci, opis, slika_url)
    );
    //dodavanje recepta u recept_kategorija
    //prvo proveramao da li postoji uopste primljena kategorija
    for (var i = 0; i < idKategorije.length; i++) {
      const postojecaKategorija =
        await this.kategorijaRepository.getByIdKategorije(idKategorije[i]);
      if (postojecaKategorija.idKategorije !== 0) {
        continue;
      } else {
        return new ReceptDetaljiDto();
      }
    }

    //zatim dodajemo recept za date kategorije
    for (var i = 0; i < idKategorije.length; i++) {
      const novaReceptKategorija =
        await this.receptKategorijaRepository.dodajReceptKategorija(
          new ReceptKategorija(noviRecept.idRecepta, idKategorije[i])
        );

      if (novaReceptKategorija.idKategorije === 0) {
        return new ReceptDetaljiDto();
      }
    }

    if (noviRecept.idRecepta !== 0) {
      return new ReceptDetaljiDto(
        noviRecept.idKorisnika,
        noviRecept.idRecepta,
        noviRecept.nazivR,
        noviRecept.sastojci,
        noviRecept.opis,
        noviRecept.slika_url,
        noviRecept.datum
      );
    } else {
      return new ReceptDetaljiDto();
    }
  }
  async azurirajRecept(recept: Recept): Promise<ReceptDetaljiDto> {
    //azuriranje recepta
    const postojeciRecept = await this.receptRepository.getByIdRecepta(
      recept.idRecepta
    );

    if (postojeciRecept.idRecepta === 0) return new ReceptDetaljiDto();

    const azurirajRecept = await this.receptRepository.azurirajRecept(recept);

    if (azurirajRecept.idRecepta !== 0) {
      return new ReceptDetaljiDto(
        azurirajRecept.idKorisnika,
        azurirajRecept.idRecepta,
        azurirajRecept.nazivR,
        azurirajRecept.sastojci,
        azurirajRecept.opis,
        azurirajRecept.slika_url,
        azurirajRecept.datum
      );
    } else {
      return new ReceptDetaljiDto();
    }
  }
  async obrisiRecept(
    idRecepta: number,
    idKategorije: number[]
  ): Promise<ReceptDetaljiDto> {
    //birsemo recept
    const postojeciRecept = await this.receptRepository.getByIdRecepta(
      idRecepta
    );

    if (postojeciRecept.idRecepta === 0) return new ReceptDetaljiDto();

    const obrisanRecept = await this.receptRepository.obrisisRecept(
      postojeciRecept.idRecepta
    );

    //brisemo podatke iz recept_kategorija

    for (var i = 0; i < idKategorije.length; i++) {
      const postojeciReceptKategorija =
        await this.receptKategorijaRepository.getById(
          idRecepta,
          idKategorije[i]
        );
      if (postojeciReceptKategorija.idKategorije !== 0) {
        const obrisanReceptKategorija =
          await this.receptKategorijaRepository.obrisiReceptKategorija(
            idRecepta,
            idKategorije[i]
          );
        if (obrisanReceptKategorija == true) {
          continue;
        } else {
          return new ReceptDetaljiDto();
        }
      } else {
        return new ReceptDetaljiDto();
      }
    }

    if (obrisanRecept == true) {
      return new ReceptDetaljiDto(
        postojeciRecept.idKorisnika,
        postojeciRecept.idRecepta,
        postojeciRecept.nazivR,
        postojeciRecept.sastojci,
        postojeciRecept.opis,
        postojeciRecept.slika_url,
        postojeciRecept.datum
      );
    } else {
      return new ReceptDetaljiDto();
    }
  }
  async getAllRecepti(): Promise<ReceptiListaDto[]> {
    const recepti: Recept[] = await this.receptRepository.getAllRecepti();

    const receptiListaDto: ReceptiListaDto[] = recepti.map(
      (recept) => new ReceptiListaDto(recept.idRecepta, recept.nazivR)
    );

    return receptiListaDto;
  }
}
