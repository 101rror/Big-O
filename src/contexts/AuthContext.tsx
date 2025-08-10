import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<{ success: boolean; needsVerification?: boolean; message?: string }>;
  logout: () => void;
  subscribe: (email: string) => Promise<{ success: boolean; message?: string }>;
  verify: (code: string) => Promise<{ success: boolean; message?: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock database - in real app, this would be a backend API
const mockUsers: { [email: string]: { id: string; email: string; isVerified: boolean; verificationCode?: string; createdAt: string } } = {};
const mockVerificationCodes: { [email: string]: string } = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const generateVerificationCode = (): string => {
    return Math.random().toString().slice(2, 8).padStart(6, '0');
  };

  const subscribe = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // Check if user already exists
      if (mockUsers[email]) {
        return { success: false, message: 'Email already registered. Please login instead.' };
      }

      // Create new user
      const verificationCode = generateVerificationCode();
      mockUsers[email] = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        isVerified: false,
        verificationCode,
        createdAt: new Date().toISOString()
      };
      
      mockVerificationCodes[email] = verificationCode;

      // Simulate sending email
      console.log(`Verification code for ${email}: ${verificationCode}`);
      
      return { success: true, message: 'Verification code sent to your email!' };
    } catch (error) {
      return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
  };

  const login = async (email: string): Promise<{ success: boolean; needsVerification?: boolean; message?: string }> => {
    try {
      const user = mockUsers[email];
      
      if (!user) {
        return { success: false, message: 'Email not found. Please subscribe first.' };
      }

      if (!user.isVerified) {
        // Resend verification code
        const verificationCode = generateVerificationCode();
        mockUsers[email].verificationCode = verificationCode;
        mockVerificationCodes[email] = verificationCode;
        console.log(`Verification code for ${email}: ${verificationCode}`);
        
        return { 
          success: false, 
          needsVerification: true, 
          message: 'Email not verified. Verification code sent to your email.' 
        };
      }

      // Login successful
      const userData: User = {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      };

      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false
      });

      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, message: 'Login successful!' };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const verify = async (code: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // Find user by verification code
      const email = Object.keys(mockVerificationCodes).find(
        email => mockVerificationCodes[email] === code
      );

      if (!email || !mockUsers[email]) {
        return { success: false, message: 'Invalid verification code.' };
      }

      // Verify user
      mockUsers[email].isVerified = true;
      delete mockUsers[email].verificationCode;
      delete mockVerificationCodes[email];

      // Auto login after verification
      const userData: User = {
        id: mockUsers[email].id,
        email: mockUsers[email].email,
        isVerified: true,
        createdAt: mockUsers[email].createdAt
      };

      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false
      });

      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, message: 'Email verified successfully!' };
    } catch (error) {
      return { success: false, message: 'Verification failed. Please try again.' };
    }
  };

  const resendVerification = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const user = mockUsers[email];
      if (!user) {
        return { success: false, message: 'Email not found.' };
      }

      const verificationCode = generateVerificationCode();
      mockUsers[email].verificationCode = verificationCode;
      mockVerificationCodes[email] = verificationCode;
      
      console.log(`New verification code for ${email}: ${verificationCode}`);
      
      return { success: true, message: 'Verification code resent to your email!' };
    } catch (error) {
      return { success: false, message: 'Failed to resend code. Please try again.' };
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      subscribe,
      verify,
      resendVerification
    }}>
      {children}
    </AuthContext.Provider>
  );
};