import { Router, Response, Request } from "express";
import { IAuthService } from "../../Domain/services/IAuthService";
import { validacijaPodatakaAuth } from "../validators/RegisterValidator";
import jwt from "jsonwebtoken";

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
      const { username, password } = req.body;

      //const rezultat = validacijaPodatakaAuth(username, email, password, uloga);

      /*       if (!rezultat.uspesno) {
        res.status(400).json({ succes: false, message: rezultat.poruka });
        return;
      } */

      const result = await this.authService.prijava(username, password);

      if (result.idKorisnika !== 0) {
        //kreiranje tokena za autorizaciju korisnika
        const token = jwt.sign(
          {
            id: result.idKorisnika,
            username: result.username,
            email: result.email,
            uloga: result.uloga,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res
          .status(200)
          .json({ success: true, message: "Uspesna prijava", data: token });
        return;
      } else {
        res.status(401).json({
          success: false,
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
        const token = jwt.sign(
          {
            id: result.idKorisnika,
            username: result.username,
            email: result.email,
            uloga: result.uloga,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res.status(200).json({
          success: true,
          message: "Uspesna registracija",
          data: token,
        });
        return;
      } else {
        res.status(401).json({
          success: false,
          message: "Registracija nije uspela. Korisnicko ime vec postoji",
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
