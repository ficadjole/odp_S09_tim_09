import { Router, Request, Response } from "express";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";
import { IBlogService } from "../../Domain/services/IBlogService";
import { Uloga } from "../../Domain/enums/Uloga";
import { BlogPostDto } from "../../Domain/DTOs/blogPost/BlogPostDto";

export class BlogController {
  private router: Router;
  private blogService: IBlogService;

  constructor(blogService: IBlogService) {
    this.router = Router();
    this.blogService = blogService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/blogPost/dodaj",
      authenticate,
      authorize(Uloga.moderator),
      this.dodajBlogPost.bind(this)
    );

    this.router.delete(
      "/blogPost/obrisi",
      authenticate,
      authorize(Uloga.moderator),
      this.obrisiBlogPost.bind(this)
    );

    this.router.get(
      "/blogPost/prikaziSveBlogove",
      authenticate,
      this.prikaziSveBlogove.bind(this)
    );

    this.router.get(
      "/blogPost/:id",
      authenticate,
      authorize(Uloga.moderator),
      this.prikaziOdredjeniBlog.bind(this)
    );
  }

  private async dodajBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const { idKorisnika, naslovB, sadrzaj, idPreporucenRecept } = req.body;

      const result = await this.blogService.dodajBlogPost(
        idKorisnika,
        naslovB,
        sadrzaj,
        idPreporucenRecept
      );

      if (result.idBlogPost !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dodali post!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno dodavanje posta!",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async obrisiBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const { idBlogPost, idRecepta } = req.body;

      const result = await this.blogService.obrisiBlogPost(
        idBlogPost,
        idRecepta
      );

      if (result.idBlogPost !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste obrisali post!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno brisanje posta",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async prikaziSveBlogove(req: Request, res: Response): Promise<void> {
    try {
      const resultList: BlogPostDto[] =
        await this.blogService.prikaziSveBlogPost();

      if (resultList.length > 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste izlistali sve postove!",
          data: resultList,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno izlistavanje postova",
          data: resultList,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async prikaziOdredjeniBlog(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      //const { idBlogPost } = req.body;
      const idBlogPost = Number(req.params.id);
      const trazeniPost: BlogPostDto = await this.blogService.getByIdBlogPost(
        idBlogPost
      );
      console.log(trazeniPost);
      if (trazeniPost.idBlogPost !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste izlistali sve postove!",
          data: trazeniPost,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno izlistavanje postova",
          data: trazeniPost,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
