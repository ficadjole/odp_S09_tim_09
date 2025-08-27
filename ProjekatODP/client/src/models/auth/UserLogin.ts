import { Uloga } from "./UserRole";

export interface UserLogin{
  id: number;
  username: string;
  email: string;
  password: string;
  uloga: Uloga;
}