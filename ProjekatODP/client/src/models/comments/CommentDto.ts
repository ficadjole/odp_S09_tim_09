export interface CommentDto {
  idKomentara: number;
  tekst: string;
  datum: Date;
  autor?: {
    idKorisnika: number;
    username: string;
  };
}
