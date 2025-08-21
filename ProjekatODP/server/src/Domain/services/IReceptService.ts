import { ReceptDetaljiDto } from "../DTOs/recepti/ReceptDetaljiDto";
import { ReceptiListaDto } from "../DTOs/recepti/ReceptListaDto";
import { Recept } from "../models/Recept";

export interface IReceptService {
  dodajRecept(
    idKorisnika: number,
    nazivR: string,
    sastojci: string,
    opis: string,
    slika_url: string,
    idKategorije: number[]
  ): Promise<ReceptDetaljiDto>;
  azurirajRecept(recept: Recept): Promise<ReceptDetaljiDto>;
  obrisiRecept(
    idRecepta: number,
    idKategorije: number[]
  ): Promise<ReceptDetaljiDto>;
  getAllRecepti(): Promise<ReceptiListaDto[]>;
}
