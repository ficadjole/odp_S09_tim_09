import { Uloga } from "../../models/auth/UserRole";
import type { IAuthAPIService } from "./IAuthAPIService";
import type { AuthResponse } from "../../types/auth/AuthResponse";
import axios from "axios";

const API_URL1 = "http://localhost:4000/api/v1/auth/registracija";
const API_URL2 = "http://localhost:4000/api/v1/auth/prijava";

export const usersApi: IAuthAPIService = {
  async register(
  username: string,
  email: string,
  password: string,
  uloga: Uloga
): Promise<AuthResponse> {
  try {
    const res = await axios.post<AuthResponse>(API_URL1, {
      username,
      email,
      password,
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
      message,
      data: undefined,
    };
  }
},


  async login(username: string, password: string): Promise<AuthResponse> {
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
