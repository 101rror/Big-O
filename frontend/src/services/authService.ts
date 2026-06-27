import { LOCAL_STORAGE_KEYS } from "../utils/constants";
import {
    login as loginApi,
    register as registerApi,
    fetchCurrentUser,
    logout as logoutApi,
    refreshToken as refreshTokenApi,
} from "../api/authApi";
import type { LoginFormData, SignupFormData, User } from "../types/auth";

const saveAuthState = (user: User, access: string, refresh: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, access);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refresh);
};

export const clearAuthState = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

export const getStoredUser = (): User | null => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as User) : null;
};

export const loginService = async (payload: LoginFormData) => {
    const tokens = await loginApi(payload);
    const user = { username: payload.username };
    saveAuthState(user, tokens.access, tokens.refresh);
    return user;
};

export const registerService = async (payload: SignupFormData) => {
    return registerApi(payload);
};

export const refreshTokenService = async () => {
    const refresh = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refresh) {
        throw new Error("Missing refresh token");
    }
    const data = await refreshTokenApi(refresh);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.access);
    return data.access;
};

export const logoutService = async () => {
    const refresh = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (refresh) {
        await logoutApi(refresh);
    }
    clearAuthState();
};

export const fetchUserService = async () => {
    return fetchCurrentUser();
};
