export interface User {
  id: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginFormData {
  email: string;
}

export interface VerificationFormData {
  code: string;
}

export interface SubscriptionFormData {
  email: string;
}