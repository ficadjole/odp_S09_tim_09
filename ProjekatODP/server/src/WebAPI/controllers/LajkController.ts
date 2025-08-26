import { Router, Request, Response } from "express";
import { ILajkService } from "../../Domain/services/ILajkService";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";

export class LajkController {
  private router: Router;
  private lajkService: ILajkService;

  constructor(lajkService: ILajkService) {
    this.router = Router();
    this.lajkService = lajkService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/lajkovi/dodajLajk",
      //authenticate,
      this.dodajLajk.bind(this)
    );

    this.router.delete(
      "/lajkovi/obrisiLajk",
      //authenticate,
      this.obrisiLajk.bind(this)
    );

    this.router.get(
      "/lajkovi/brojLajkova/:idRecepta",
      //authenticate,
      this.getBrojLajkova.bind(this)
    );

    this.router.get(
      "/lajkovi/lajkovano/:idRecepta/:idKorisnika",
      //authenticate,
      this.getKorisnikLajkovao.bind(this)
    );
  }

  private async dodajLajk(req: Request, res: Response): Promise<void> {
    try {
      const { idRecepta, idKorisnika } = req.body;

      const result = await this.lajkService.dodajLajk(idRecepta, idKorisnika);

      if (result.idRecepta !== 0 && result.idKorisnika !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste lajkovali!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno ste lajkovali",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async obrisiLajk(req: Request, res: Response): Promise<void> {
    try {
      const { idRecepta, idKorisnika } = req.body;

      const result = await this.lajkService.obrisiLajk(idRecepta, idKorisnika);

      if (result.idRecepta !== 0 && result.idKorisnika !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste uklonili lajk!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno ste uklonili lajk",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async getKorisnikLajkovao(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const idRecepta = Number(req.params.idRecepta);
      const idKorisnika = Number(req.params.idKorisnika);

      const result = await this.lajkService.korisnikLajkovao(
        idRecepta,
        idKorisnika
      );

      if (result.idRecepta !== 0 && result.idKorisnika !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dobili status lajkova!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno ste dobili status lajkova",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async getBrojLajkova(req: Request, res: Response): Promise<void> {
    try {
      const idRecepta = Number(req.params.idRecepta);

      const result = await this.lajkService.brojLajkova(idRecepta);

      if (result.idRecepta !== 0 && result.brojLajkova !== -1) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dobili broj lajkova!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno ste dobili broj lajkova",
          data: result,
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
