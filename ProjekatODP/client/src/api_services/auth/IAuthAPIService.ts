//import type { UserLogin } from "../../models/auth/UserLogin";
//import type { KorisnikLoginDto } from "../../models/auth/UserLoginDto";
import type { Uloga } from "../../models/auth/UserRole";
import type { AuthResponse } from "../../types/auth/AuthResponse";

export interface IAuthAPIService {
    register(
        id: number,
        username: string,
        email: string,
        password: string,
        uloga: Uloga,

    ): Promise<AuthResponse>;
    login(username: string, password: string): Promise<AuthResponse>;
    //getUserById(id: string): Promise<UserLogin>;
}