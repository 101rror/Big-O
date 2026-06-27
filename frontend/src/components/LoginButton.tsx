import React from "react";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./AuthModal";

export const LoginButton: React.FC = () => {
  const {
    isAuthenticated,
    user,
    logout,
    openAuthModal,
    isAuthModalOpen,
    closeAuthModal,
  } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => (window.location.href = "/profile")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
          >
            <UserIcon className="w-4 h-4" />
            <span>{user?.username}</span>
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => openAuthModal()}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
        >
          <LogIn className="w-4 h-4" />
          <span>Login / Sign Up</span>
        </button>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};
