import axios from "axios";
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from "../utils/constants";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

const getAccessToken = () =>
    localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
const getRefreshToken = () =>
    localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

const clearAuthStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
};

api.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest?._retry &&
            getRefreshToken()
        ) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/auth/token/refresh/`,
                    { refresh: refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );

                const newAccessToken = response.data.access;
                localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return api(originalRequest);
            } catch {
                clearAuthStorage();
                window.dispatchEvent(new Event("authExpired"));
            }
        }

        return Promise.reject(error);
    },
);

export default api;
