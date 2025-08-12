import React from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginButtonProps {
  onLoginClick: () => void;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onLoginClick }) => {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-xs">
              {user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="hidden sm:block">{user.email}</span>
        </div>
        <button
          onClick={logout}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onLoginClick}
      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </button>
  );
};