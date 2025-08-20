import express from "express";
import cors from "cors";
import { IKorisnikRepository } from "./Domain/repositories/IKorisnikRepository";
import { KorisnikRepository } from "./Database/repositories/KorisnikRepository";
import { IAuthService } from "./Domain/services/IAuthService";
import { AuthService } from "./Services/auth/AuthService";
import { AuthController } from "./WebAPI/controllers/AuthController";
import { IKategorijaRepository } from "./Domain/repositories/IKategorijaRepository";
import { KateogrijaRepository } from "./Database/repositories/KategorijaRepository";
import { IKategorijeService } from "./Domain/services/IKategorijeService";
import { KategorijeService } from "./Services/kategorija/KategorijeService";
import { KategorijeController } from "./WebAPI/controllers/KategorijeController";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get<{}, { data: string }>("/", (req, res) => {
  res.json({
    data: "response",
  });
});

const korisnikRepository: IKorisnikRepository = new KorisnikRepository();

const kategorijeRepository: IKategorijaRepository = new KateogrijaRepository();

const authService: IAuthService = new AuthService(korisnikRepository);

const kategorijaService: IKategorijeService = new KategorijeService(
  kategorijeRepository
);

const authController = new AuthController(authService);
const kategorijaController = new KategorijeController(kategorijaService);

app.use("/api/v1", authController.getRouter());
app.use("/api/v1", kategorijaController.getRouter());
export default app;
