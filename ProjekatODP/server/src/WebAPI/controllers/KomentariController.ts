import { Router, Response, Request } from "express";
import { IKomenatariService } from "../../Domain/services/IKomentariService";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";
import { Uloga } from "../../Domain/enums/Uloga";

export class KomentariController {
  private router: Router;
  private komentarService: IKomenatariService;

  constructor(komentarService: IKomenatariService) {
    this.router = Router();
    this.komentarService = komentarService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/komentari/dodajKomentar",
      authenticate,
      this.dodajKomentar.bind(this)
    );

    this.router.delete(
      "/komentari/obrisiKomentar",
      authenticate,
      authorize(Uloga.moderator),
      this.obrisiKomentar.bind(this)
    );

    this.router.get(
      "/komentari/prikaziSveKomentare/:id",
      authenticate,
      this.prikaziSveKomentare.bind(this)
    );
  }

  private async dodajKomentar(req: Request, res: Response): Promise<void> {
    try {
      const { idRecepta, idKorisnika, tekst } = req.body;

      const result = await this.komentarService.dodajKomentar(
        idRecepta,
        idKorisnika,
        tekst
      );

      if (result.idKomentara !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dodali komentar!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno dodavanje komentar",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async obrisiKomentar(req: Request, res: Response): Promise<void> {
    try {
      const { idKomentara } = req.body;

      const result = await this.komentarService.obrisiKomentar(idKomentara);

      if (result.idKomentara !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste obrisali komentar!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno brisanje komentar",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async prikaziSveKomentare(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const idRecepta = Number(req.params.id);
      const sviKomentari =
        await this.komentarService.prikaziSveKomentareZaRecept(idRecepta);

      if (sviKomentari.length > 0 && sviKomentari[0].idKomentara !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste ispisali sve komentare!",
          data: sviKomentari,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno izlistavanje komentara",
          data: sviKomentari,
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
