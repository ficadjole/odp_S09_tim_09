import { Router, Request, Response } from "express";
import { IReceptService } from "../../Domain/services/IReceptService";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";
import { Uloga } from "../../Domain/enums/Uloga";
import { ReceptiListaDto } from "../../Domain/DTOs/recepti/ReceptListaDto";
import { Recept } from "../../Domain/models/Recept";
import { ReceptDetaljiDto } from "../../Domain/DTOs/recepti/ReceptDetaljiDto";

export class ReceptiController {
  private router: Router;
  private receptService: IReceptService;

  constructor(receptService: IReceptService) {
    this.router = Router();
    this.receptService = receptService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/recepti/dodajRecept",
      authenticate,
      this.dodajRecept.bind(this)
    );

    this.router.put(
      "/recepti/azurirajRecept",
      authenticate,
      this.azurirajRecept.bind(this)
    );

    this.router.delete(
      "/recepti/obrisiRecept",
      authenticate,
      authorize(Uloga.moderator),
      this.obrisiRecept.bind(this)
    );

    this.router.get(
      "/recepti/prikaziSveRecepte",
      authenticate,
      this.prikaziSveRecepte.bind(this)
    );
    this.router.get(
      "/recepti/korisnikovi/:id",
      authenticate,
      this.prikaziReceptKorisnik.bind(this)
    );

    this.router.get(
      "/recepti/:id",
      authenticate,
      this.prikaziReceptPoId.bind(this)
    );
  }

  private async dodajRecept(req: Request, res: Response): Promise<void> {
    try {
      const {
        idKorisnika,
        nazivR,
        sastojci,
        opis,
        saveti,
        slika_url,
        idKategorije,
      } = req.body;

      const result = await this.receptService.dodajRecept(
        idKorisnika,
        nazivR,
        sastojci,
        opis,
        saveti,
        slika_url,
        idKategorije
      );

      if (result.idRecepta !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dodali recept!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno dodavanje recepta!",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async azurirajRecept(req: Request, res: Response): Promise<void> {
    try {
      const {
        idKorisnika,
        idRecepta,
        nazivR,
        sastojci,
        opis,
        saveti,
        slika_url,
      } = req.body;

      const result = await this.receptService.azurirajRecept(
        new Recept(
          idRecepta,
          idKorisnika,
          nazivR,
          sastojci,
          opis,
          saveti,
          slika_url
        )
      );

      if (result.idRecepta !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste azurirali recept!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno azuriranje recepta",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async obrisiRecept(req: Request, res: Response): Promise<void> {
    try {
      const { idRecepta, idKategorije } = req.body;

      const result = await this.receptService.obrisiRecept(
        idRecepta,
        idKategorije
      );

      if (result.idRecepta !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste obrisali recept!",
          data: result,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno brisanje recepta",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async prikaziSveRecepte(req: Request, res: Response): Promise<void> {
    try {
      const resultList: ReceptiListaDto[] =
        await this.receptService.getAllRecepti();

      if (resultList.length > 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste izlistali sve recepte!",
          data: resultList,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Neuspesno izlistavanje recepata",
          data: resultList,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async prikaziReceptPoId(req: Request, res: Response): Promise<void> {
    try {
      //const { idRecepta } = req.body;
      const idRecepta = Number(req.params.id);
      const resultList: ReceptDetaljiDto =
        await this.receptService.getByIdRecepta(idRecepta);

      if (resultList.idRecepta !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste izlistali sve recepte!",
          data: resultList,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Neuspesno izlistavanje recepata",
          data: resultList,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async prikaziReceptKorisnik(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const idKorisnika = Number(req.params.id);

      const resultList: ReceptiListaDto[] =
        await this.receptService.getAllReceptiKorisnik(idKorisnika);

      if (resultList.length > 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste izlistali sve recepte!",
          data: resultList,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Neuspesno izlistavanje recepata",
          data: resultList,
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
