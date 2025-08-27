import React, { createContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContexType } from "../../types/auth/AuthContexType";
import type { AuthUser } from "../../types/auth/AuthUser";
import { SaveValueByKey, ReadValueByKey, DeleteValueByKey } from "../../helpers/local_storage";
import type { JwtTokenClaims } from "../../types/auth/JwtTokenClaims";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext<AuthContexType | undefined>(undefined);

const decodeJWT = (token: string): JwtTokenClaims | null => {
  try {
    const decoded = jwtDecode<JwtTokenClaims>(token);
    if (decoded.id && decoded.username && decoded.email && decoded.uloga) {
      return {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        uloga: decoded.uloga,
      };
    }
    return null;
  } catch (error) {
    console.error("Greška pri dekodiranju JWT tokena:", error);
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp < currentTime : false;
  } catch {
    return true;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = ReadValueByKey("authToken");

    if (savedToken) {
      if (isTokenExpired(savedToken)) {
        DeleteValueByKey("authToken");
        setIsLoading(false);
        return;
      }

      const claims = decodeJWT(savedToken);
      if (claims) {
        setToken(savedToken);
        setUser({
          id: claims.id,
          username: claims.username,
          email: claims.email,
          uloga: claims.uloga,
        });
      } else {
        DeleteValueByKey("authToken");
      }
    }

    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    const claims = decodeJWT(newToken);
    if (claims && !isTokenExpired(newToken)) {
      setToken(newToken);
      setUser({
        id: claims.id,
        username: claims.username,
        email: claims.email,
        uloga: claims.uloga,
      });
      SaveValueByKey("authToken", newToken);
    } else {
      console.error("Nevažeći ili istekao token");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    DeleteValueByKey("authToken");
  };

  const value: AuthContexType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isLoading,
  };

  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

export default AuthContext;
