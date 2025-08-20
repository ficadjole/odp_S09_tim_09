import { Router, Response, Request } from "express";
import { IAuthService } from "../../Domain/services/IAuthService";
import { validacijaPodatakaAuth } from "../../Services/validators/RegisterValidator";

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    this.router.post("/auth/prijava", this.prijava.bind(this));
    this.router.post("/auth/registracija", this.registracija.bind(this));
  }

  private async prijava(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, uloga } = req.body;

      const rezultat = validacijaPodatakaAuth(username, email, password, uloga);

      if (!rezultat.uspesno) {
        res.status(400).json({ succes: false, message: rezultat.poruka });
        return;
      }

      const result = await this.authService.prijava(username, email, password);

      if (result.idKorisnika !== 0) {
        res
          .status(200)
          .json({ succes: true, message: "Uspesna prijava", data: result });
        return;
      } else {
        res.status(401).json({
          succes: false,
          message: "Neispravno unoseni podaci",
          data: result,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async registracija(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, uloga } = req.body;

      const rezultat = validacijaPodatakaAuth(username, email, password, uloga);

      if (!rezultat.uspesno) {
        res.status(400).json({ succes: false, message: rezultat.poruka });
        return;
      }

      const result = await this.authService.registracija(
        username,
        email,
        password,
        uloga
      );

      if (result.idKorisnika !== 0) {
        res.status(200).json({
          succes: true,
          message: "Uspesna registracija",
          data: result,
        });
        return;
      } else {
        res.status(401).json({
          succes: false,
          message: "Registracija nije uspela. Korisnicko ime vec postoji",
          data: result,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
