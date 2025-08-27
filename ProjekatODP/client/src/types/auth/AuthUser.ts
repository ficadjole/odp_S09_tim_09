import type {Uloga} from "../../models/auth/UserRole"

export type AuthUser = {
  id: number;
  username: string;
  email: string;   
  uloga: Uloga;
};
