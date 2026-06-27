import api from "./axios";
import type { LoginFormData, SignupFormData } from "../types/auth";

export interface AuthTokens {
    access: string;
    refresh: string;
}

export const login = async (payload: LoginFormData) => {
    const response = await api.post("/auth/token/", payload);
    return response.data as AuthTokens;
};

export const register = async (payload: SignupFormData) => {
    const response = await api.post("/auth/register/", payload);
    return response.data as Record<string, unknown>;
};

export const refreshToken = async (refresh: string) => {
    const response = await api.post("/auth/token/refresh/", { refresh });
    return response.data as { access: string };
};

export const fetchCurrentUser = async () => {
    const response = await api.get("/auth/me/");
    return response.data;
};

export const logout = async (refresh: string) => {
    const response = await api.post("/auth/logout/", { refresh });
    return response.data;
};
