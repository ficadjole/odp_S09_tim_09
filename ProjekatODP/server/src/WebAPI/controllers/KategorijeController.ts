import { Router, Request, Response } from "express";
import { IKategorijeService } from "../../Domain/services/IKategorijeService";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";
import { Uloga } from "../../Domain/enums/Uloga";

export class KategorijeController {
  private router: Router;
  private kateogrijeService: IKategorijeService;

  constructor(kategorijeService: IKategorijeService) {
    this.router = Router();
    this.kateogrijeService = kategorijeService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/kategorije/dodaj",
      //authenticate,
      //authorize(Uloga.moderator),
      this.dodajKategoriju.bind(this)
    );
    this.router.delete(
      "/kategorije/obrisi",
      //authenticate,
      //authorize(Uloga.moderator),
      this.obrisiKategoriju.bind(this)
    );
    this.router.put(
      "/kategorije/azuriraj",
      //authenticate,
      //authorize(Uloga.moderator),
      this.azurirajKategoriju.bind(this)
    );
    this.router.get(
      "/kategorije/ispisiSve",
      //authenticate,
      this.ispisiSve.bind(this)
    );
  }

  private async dodajKategoriju(req: Request, res: Response): Promise<void> {
    try {
      const { nazivK } = req.body;

      const result = await this.kateogrijeService.dodajKategoriju(nazivK);

      if (result.idKategorije !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dodali kategoriju!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno dodavanje kategorije",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async obrisiKategoriju(req: Request, res: Response): Promise<void> {
    try {
      const { nazivK } = req.body;

      const result = await this.kateogrijeService.obrisiKategoriju(nazivK);

      if (result.idKategorije !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dodali kategoriju!",
          data: result,
      });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspelo ste dodali kategoriju!",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async azurirajKategoriju(req: Request, res: Response): Promise<void> {
    try {
      const { nazivKNovi, nazivKStari } = req.body;

      const result = await this.kateogrijeService.azurirajKategoriju(
        nazivKNovi,
        nazivKStari
      );

      if (result.idKategorije !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste azurirali kategoriju!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno azuriranje kategorije",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async ispisiSve(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.kateogrijeService.ispisiSveKategorije();

      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste izlistali kategorije!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno ste izlisatli kategorije",
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
