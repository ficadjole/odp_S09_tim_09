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
import { IReceptRepository } from "./Domain/repositories/IReceptRepository";
import { ReceptRepository } from "./Database/repositories/ReceptRepository";
import { IReceptService } from "./Domain/services/IReceptService";
import { ReceptService } from "./Services/recept/ReceptService";
import { ReceptiController } from "./WebAPI/controllers/ReceptiController";
import { IReceptKategorijaRepository } from "./Domain/repositories/IReceptKategorijaRepository";
import { ReceptKategorijaRepoistory } from "./Database/repositories/ReceptKategorijaRepository";

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

const receptRepository: IReceptRepository = new ReceptRepository();
const receptKategorijaRepository: IReceptKategorijaRepository =
  new ReceptKategorijaRepoistory();

const authService: IAuthService = new AuthService(korisnikRepository);

const kategorijaService: IKategorijeService = new KategorijeService(
  kategorijeRepository
);

const receptService: IReceptService = new ReceptService(
  receptRepository,
  receptKategorijaRepository,
  kategorijeRepository
);

const authController = new AuthController(authService);
const kategorijaController = new KategorijeController(kategorijaService);
const receptController = new ReceptiController(receptService);

app.use("/api/v1", authController.getRouter());
app.use("/api/v1", kategorijaController.getRouter());
app.use("/api/v1", receptController.getRouter());
export default app;
