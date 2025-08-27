import type { ReceptListaDto } from "../recipe/ReceptListaDto";

export class BlogPostDto {
  public constructor(
    public idBlogPost: number = 0,
    public naslovB: string = "",
    public sadrzaj: string = "",
    public datum: Date = new Date(),
    public preporuceniRecepti: ReceptListaDto[] = [],
    public author?: {
      idKorisnika: number;
      username: string;
    }
  ) {}
}
