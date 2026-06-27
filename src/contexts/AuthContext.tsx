import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthState } from "../types/auth";
import {
  getStoredUser,
  loginService,
  logoutService,
  registerService,
  refreshTokenService,
  fetchUserService,
} from "../services/authService";

interface AuthContextType extends AuthState {
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    username: string,
    password: string,
    password2: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const initializeAuth = async () => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const user = await fetchUserService();
      setAuthState({ user, isAuthenticated: true, isLoading: false });
    } catch {
      await refreshTokenService().catch(() => {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      });
      setAuthState({
        user: storedUser,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    initializeAuth();

    const handleAuthExpired = () => {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    };

    window.addEventListener("authExpired", handleAuthExpired);
    return () => window.removeEventListener("authExpired", handleAuthExpired);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const user = await loginService({ username, password });
      setAuthState({ user, isAuthenticated: true, isLoading: false });
      return { success: true, message: "Login successful" };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.",
      };
    }
  };

  const register = async (
    username: string,
    password: string,
    password2: string,
  ) => {
    try {
      await registerService({ username, password, password2 });
      return { success: true, message: "Signup successful. Please log in." };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Signup failed. Please check your details.",
      };
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } finally {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
