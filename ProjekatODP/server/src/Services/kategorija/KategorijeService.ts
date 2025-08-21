import { KategorijaDto } from "../../Domain/DTOs/kategorija/KategorijaDto";
import { IKategorijeService } from "../../Domain/services/IKategorijeService";
import { IKategorijaRepository } from "../../Domain/repositories/IKategorijaRepository";
import { Kategorija } from "../../Domain/models/Kategorija";
export class KategorijeService implements IKategorijeService {
  public constructor(private kategorijeRepository: IKategorijaRepository) {}
  async azurirajKategoriju(
    nazivKNovi: string,
    nazivKStari: string
  ): Promise<KategorijaDto> {
    const postojecaKategorija = await this.kategorijeRepository.getByNazivK(
      nazivKStari
    );

    if (postojecaKategorija.idKategorije === 0) return new KategorijaDto();

    const azuriranaKategorija =
      await this.kategorijeRepository.azurirajKategoriju(
        nazivKStari,
        nazivKNovi
      );

    if (azuriranaKategorija == true) {
      return new KategorijaDto(postojecaKategorija.idKategorije, nazivKNovi);
    } else {
      return new KategorijaDto();
    }
  }

  async obrisiKategoriju(nazivK: string): Promise<KategorijaDto> {
    const postojecaKategorija = await this.kategorijeRepository.getByNazivK(
      nazivK
    );

    if (postojecaKategorija.idKategorije === 0) return new KategorijaDto();

    const obrisanaKategorija = await this.kategorijeRepository.obrisiKategoriju(
      postojecaKategorija.idKategorije
    );

    if (obrisanaKategorija == true) {
      return new KategorijaDto(
        postojecaKategorija.idKategorije,
        postojecaKategorija.nazivK
      );
    } else {
      return new KategorijaDto();
    }
  }

  async dodajKategoriju(nazivK: string): Promise<KategorijaDto> {
    const postojecaKategorija = await this.kategorijeRepository.getByNazivK(
      nazivK
    );

    if (postojecaKategorija.idKategorije !== 0) return new KategorijaDto();

    const novaKategorija = await this.kategorijeRepository.dodajKategoriju(
      new Kategorija(0, nazivK)
    );

    if (novaKategorija.idKategorije !== 0) {
      return new KategorijaDto(
        novaKategorija.idKategorije,
        novaKategorija.nazivK
      );
    } else {
      return new KategorijaDto();
    }
  }
}
