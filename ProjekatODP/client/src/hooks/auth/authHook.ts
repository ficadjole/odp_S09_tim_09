import { useContext } from "react";
import type { AuthContexType } from "../../types/auth/AuthContexType";
import AuthContext from "../../contexts/auth/AuthContext";

export const useAuth = (): AuthContexType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth mora biti korišćen unutar AuthProvider-a');
    }
    return context;
};