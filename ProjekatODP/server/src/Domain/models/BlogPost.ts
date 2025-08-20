export class BlogPost {
  public constructor(
    public idBlogPost: number = 0,
    public idModerator: number = 0,
    public naslovB: string = "",
    public sadrzaj: string = "",
    public datum: Date = new Date(1944, 6, 6, 0, 0, 0, 0)
  ) {}
}
