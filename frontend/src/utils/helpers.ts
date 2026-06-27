export const parseJwt = <T = Record<string, unknown>>(
    token: string,
): T | null => {
    try {
        const base64Payload = token.split(".")[1];
        if (!base64Payload) {
            return null;
        }

        const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decodeURIComponent(escape(payload))) as T;
    } catch {
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const payload = parseJwt<{ exp?: number }>(token);
    if (!payload?.exp) {
        return true;
    }

    return Date.now() >= payload.exp * 1000;
};

export const formatDateTime = (isoDate: string): string => {
    try {
        return new Date(isoDate).toLocaleString();
    } catch {
        return isoDate;
    }
};
