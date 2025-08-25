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
import { IKomentarRepository } from "./Domain/repositories/IKomentarRepository";
import { KomentarRepository } from "./Database/repositories/KomentarRepository";
import { IKomenatariService } from "./Domain/services/IKomentariService";
import { KomentariService } from "./Services/komentar/KomentariService";
import { KomentariController } from "./WebAPI/controllers/KomentariController";
import { ILajkRepository } from "./Domain/repositories/ILajkRepository";
import { LajkRepository } from "./Database/repositories/LajkRepository";
import { ILajkService } from "./Domain/services/ILajkService";
import { LajkService } from "./Services/lajk/LajkService";
import { LajkController } from "./WebAPI/controllers/LajkController";
import { IBlogRepository } from "./Domain/repositories/IBlogRepository";
import { BlogRepository } from "./Database/repositories/BlogRepository";
import { IBlogPreporucenReceptRepository } from "./Domain/repositories/IBlogPreporucenReceptRepository";
import { BlogPreporucenReceptRepository } from "./Database/repositories/BlogPreporucenReceptRepository";
import { IBlogService } from "./Domain/services/IBlogService";
import { BlogService } from "./Services/blogPost/BlogService";
import { BlogController } from "./WebAPI/controllers/BlogController";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get<{}, { data: string }>("/", (req, res) => {
  res.json({
    data: "response",
  });
});

//Korisnik
const korisnikRepository: IKorisnikRepository = new KorisnikRepository();
const authService: IAuthService = new AuthService(korisnikRepository);
const authController = new AuthController(authService);

//Kategorije
const kategorijeRepository: IKategorijaRepository = new KateogrijaRepository();
const kategorijaService: IKategorijeService = new KategorijeService(
  kategorijeRepository
);
const kategorijaController = new KategorijeController(kategorijaService);

//Recept
const receptRepository: IReceptRepository = new ReceptRepository();

const receptKategorijaRepository: IReceptKategorijaRepository =
  new ReceptKategorijaRepoistory();

const receptService: IReceptService = new ReceptService(
  receptRepository,
  receptKategorijaRepository,
  kategorijeRepository
);
const receptController = new ReceptiController(receptService);

//Komentar
const komentarRepository: IKomentarRepository = new KomentarRepository();
const komentarService: IKomenatariService = new KomentariService(
  komentarRepository,
  korisnikRepository
);
const komentarController = new KomentariController(komentarService);

//Lajk
const lajkRepository: ILajkRepository = new LajkRepository();
const lajkService: ILajkService = new LajkService(lajkRepository);
const lajkController = new LajkController(lajkService);

//BlogPost
const blogPostRepository: IBlogRepository = new BlogRepository();
const preporuceniReceptRepository: IBlogPreporucenReceptRepository =
  new BlogPreporucenReceptRepository();
const blogService: IBlogService = new BlogService(
  blogPostRepository,
  korisnikRepository,
  preporuceniReceptRepository,
  receptRepository
);
const blogController = new BlogController(blogService);

app.use("/api/v1", authController.getRouter());
app.use("/api/v1", kategorijaController.getRouter());
app.use("/api/v1", receptController.getRouter());
app.use("/api/v1", komentarController.getRouter());
app.use("/api/v1", lajkController.getRouter());
app.use("/api/v1", blogController.getRouter());
export default app;
