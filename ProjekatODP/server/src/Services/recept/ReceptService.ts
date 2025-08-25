import { KategorijaDto } from "../../Domain/DTOs/kategorija/KategorijaDto";
import { ReceptDetaljiDto } from "../../Domain/DTOs/recepti/ReceptDetaljiDto";
import { ReceptiListaDto } from "../../Domain/DTOs/recepti/ReceptListaDto";
import { Recept } from "../../Domain/models/Recept";
import { ReceptKategorija } from "../../Domain/models/ReceptKategorija";
import { IKategorijaRepository } from "../../Domain/repositories/IKategorijaRepository";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import { IReceptKategorijaRepository } from "../../Domain/repositories/IReceptKategorijaRepository";
import { IReceptRepository } from "../../Domain/repositories/IReceptRepository";
import { IReceptService } from "../../Domain/services/IReceptService";

export class ReceptService implements IReceptService {
  public constructor(
    private receptRepository: IReceptRepository,
    private receptKategorijaRepository: IReceptKategorijaRepository,
    private kategorijaRepository: IKategorijaRepository,
    private korisnikRepository: IKorisnikRepository
  ) {}

  async dodajRecept(
    idKorisnika: number,
    nazivR: string,
    sastojci: string,
    opis: string,
    saveti: string,
    slika_url: string,
    idKategorije: number[] //ovde ide lista idKategorija
  ): Promise<ReceptDetaljiDto> {
    //dodavanje samog recepta
    const postojeciRecept = await this.receptRepository.getByNazivR(nazivR);

    if (postojeciRecept.idRecepta !== 0) return new ReceptDetaljiDto();

    const noviRecept = await this.receptRepository.dodajRecept(
      new Recept(0, idKorisnika, nazivR, sastojci, opis, saveti, slika_url)
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
      return this.mapToDTO(noviRecept);
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
      return this.mapToDTO(azurirajRecept);
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
      return this.mapToDTO(postojeciRecept);
    } else {
      return new ReceptDetaljiDto();
    }
  }
  async getAllRecepti(): Promise<ReceptiListaDto[]> {
    const recepti: Recept[] = await this.receptRepository.getAllRecepti();

    const receptiListaDto: ReceptiListaDto[] = [];
    for (var i = 0; i < recepti.length; i++) {
      const kategorije = await this.kategorijeLista(recepti[i]);

      receptiListaDto.push(
        new ReceptiListaDto(
          recepti[i].idRecepta,
          recepti[i].nazivR,
          recepti[i].slika_url,
          kategorije
        )
      );
    }

    return receptiListaDto;
  }

  async getByIdRecepta(idRecepta: number): Promise<ReceptDetaljiDto> {
    const recept = await this.receptRepository.getByIdRecepta(idRecepta);

    if (recept.idRecepta === 0) return new ReceptDetaljiDto();

    return this.mapToDTO(recept);
  }

  private async mapToDTO(recept: Recept): Promise<ReceptDetaljiDto> {
    const kategorije = await this.kategorijeLista(recept);

    const autor = await this.korisnikRepository.getById(recept.idKorisnika);

    return new ReceptDetaljiDto(
      recept.idKorisnika,
      recept.idRecepta,
      recept.nazivR,
      recept.sastojci,
      recept.opis,
      recept.saveti,
      recept.slika_url,
      recept.datum,
      kategorije,
      { idKorisnika: autor.idKorisnika, username: autor.username }
    );
  }

  private async kategorijeLista(recept: Recept): Promise<KategorijaDto[]> {
    const receptKategorija =
      await this.receptKategorijaRepository.sveKategorijeRecepta(
        recept.idRecepta
      );
    const kategorije: KategorijaDto[] = [];
    for (var i = 0; i < receptKategorija.length; i++) {
      if (receptKategorija[i].idKategorije) {
        const kategorija = await this.kategorijaRepository.getByIdKategorije(
          receptKategorija[i].idKategorije
        );

        if (kategorija.idKategorije !== 0) {
          kategorije.push(
            new KategorijaDto(kategorija.idKategorije, kategorija.nazivK)
          );
        }
      }
    }
    return kategorije;
  }
}
