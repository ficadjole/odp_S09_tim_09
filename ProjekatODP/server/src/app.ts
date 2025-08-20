import express from "express";
import cors from "cors";
import { IKorisnikRepository } from "./Domain/repositories/IKorisnikRepository";
import { KorisnikRepository } from "./Database/repositories/KorisnikRepository";
import { IAuthService } from "./Domain/services/IAuthService";
import { AuthService } from "./Services/auth/AuthService";
import { AuthController } from "./WebAPI/controllers/AuthController";

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

const authService: IAuthService = new AuthService(korisnikRepository);

const authController = new AuthController(authService);

app.use("/api/v1", authController.getRouter());

export default app;
