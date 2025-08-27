//import type { UserLogin } from "../../models/auth/UserLogin";
import { Uloga } from "../../models/auth/UserRole";
import type { IAuthAPIService } from "./IAuthAPIService";
import type { AuthResponse } from "../../types/auth/AuthResponse";
import axios from "axios";

const API_URL1 = "http://localhost:4000/api/v1/registracija";
const API_URL2 = "http://localhost:4000/api/v1/prijava";

export const usersApi: IAuthAPIService = {

    async register(
        id: number,
        username: string,
        password: string,
        email: string,
        uloga: Uloga.korisnik
    ): Promise<AuthResponse> {
        try {
            const res = await axios.post<AuthResponse>(`${API_URL1}`, {
                id,
                username, 
                password, 
                email, 
                uloga,
            });
                return res.data;
            } catch (error) {
                let message = "Registration error.";
                if (axios.isAxiosError(error)) {
                    message = error.response?.data?.message || message;
                }
                return {
                    success: false,
                    message: "",
                    data: undefined,
                };
            }
        },
        
        async login(username: string, password: string): Promise<AuthResponse>{
             try {
                const res = await axios.post<AuthResponse>(`${API_URL2}`, {
                    username,
                    password,
                });
                return res.data;
                } catch (error) {
                let message = "Login error.";
                if (axios.isAxiosError(error)) {
                    message = error.response?.data?.message || message;
                }
                return {
                    success: false,
                    message,
                    data: undefined,
                };
        }
    },
};
