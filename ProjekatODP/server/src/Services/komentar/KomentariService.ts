import { KomentarDto } from "../../Domain/DTOs/komentar/KomentarDto";
import { Komentar } from "../../Domain/models/Komentar";
import { IKomentarRepository } from "../../Domain/repositories/IKomentarRepository";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import { IKomenatariService } from "../../Domain/services/IKomentariService";

export class KomentariService implements IKomenatariService {
  public constructor(
    private komentarRepository: IKomentarRepository,
    private korisnikRepository: IKorisnikRepository
  ) {}

  async dodajKomentar(
    idRecepta: number,
    idKorisnika: number,
    tekst: string
  ): Promise<KomentarDto> {
    const noviKomentar = await this.komentarRepository.dodajKomentar(
      new Komentar(0, idRecepta, idKorisnika, tekst)
    );

    //ovo mi treba da bih vratio unutar dto i ime autora
    const autorKomentara = await this.korisnikRepository.getById(idKorisnika);
    if (noviKomentar.idKomentara !== 0) {
      return new KomentarDto(
        noviKomentar.idKomentara,
        noviKomentar.tekst,
        noviKomentar.datum,
        {
          idKorisnika: autorKomentara.idKorisnika,
          username: autorKomentara.username,
        }
      );
    } else {
      return new KomentarDto();
    }
  }
  async obrisiKomentar(idKomentara: number): Promise<KomentarDto> {
    const postojeciKomentar = await this.komentarRepository.getByIdKomentara(
      idKomentara
    );

    if (postojeciKomentar.idKomentara === 0) return new KomentarDto();

    const obrisanKomentar = await this.komentarRepository.obrisiKomentar(
      idKomentara
    );

    if (obrisanKomentar == true) {
      return new KomentarDto(
        postojeciKomentar.idKomentara,
        postojeciKomentar.tekst,
        postojeciKomentar.datum
      );
    } else {
      return new KomentarDto();
    }
  }
  async prikaziSveKomentareZaRecept(idRecepta: number): Promise<KomentarDto[]> {
    const komentari: Komentar[] =
      await this.komentarRepository.prikaziSveKomentareZaRecept(idRecepta);

    if (komentari.length === 0) return [new KomentarDto()];
    const komentarDtoLista: KomentarDto[] = [];

    for (var i = 0; i < komentari.length; i++) {
      const komentar = komentari[i];

      const autor = await this.korisnikRepository.getById(komentar.idKorisnika);

      //ovde vracam prazan komentar da bih znao da je greska
      if (autor.idKorisnika === 0) return [new KomentarDto()];

      komentarDtoLista.push(
        new KomentarDto(komentar.idKomentara, komentar.tekst, komentar.datum, {
          idKorisnika: autor.idKorisnika,
          username: autor.username,
        })
      );
    }

    return komentarDtoLista;
  }
}
