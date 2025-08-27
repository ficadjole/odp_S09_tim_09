import type { Uloga } from "../../models/auth/UserRole";

export type JwtTokenClaims = {
  id: number;
  username: string;
  email: string;
  uloga: Uloga;
}