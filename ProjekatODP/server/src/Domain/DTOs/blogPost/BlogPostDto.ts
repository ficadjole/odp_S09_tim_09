import { ReceptiListaDto } from "../recepti/ReceptListaDto";

export class BlogPostDto {
  public constructor(
    public idBlogPost: number = 0,
    public naslovB: string = "",
    public sadrzaj: string = "",
    public datum: Date = new Date(),
    public preporuceniRecepti: ReceptiListaDto[] = [],
    public author?: {
      idKorisnika: number;
      username: string;
    }
  ) {}
}
