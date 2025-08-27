import type { ReceptListaDto } from "../recipe/ReceptListaDto";

export interface Blog {
  idBlogPost: number;
  naslovB: string;
  sadrzaj: string;
  datum: Date;
  preporuceniRecepti: ReceptListaDto[];
  author?: {
    idKorisnika: number;
    username: string;
  };
}
