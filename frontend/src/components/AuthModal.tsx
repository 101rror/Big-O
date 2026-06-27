import React, { useState } from "react";
import { X, User, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormMode = "login" | "signup";

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<FormMode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const resetForm = () => {
    setMode("login");
    setUsername("");
    setPassword("");
    setPassword2("");
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    const result = await login(username.trim(), password);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || "Login successful!");
      handleClose();
    } else {
      toast.error(result.message || "Login failed.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !password2.trim()) {
      toast.error("Please complete all fields.");
      return;
    }

    if (password !== password2) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const result = await register(username.trim(), password, password2);
    setIsLoading(false);

    if (result.success) {
      toast.success(
        result.message || "Account created successfully! Please login.",
      );
      setMode("login");
      setPassword("");
      setPassword2("");
    } else {
      toast.error(result.message || "Signup failed.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-3xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close auth modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4 mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            {mode === "login" ? "Login to Big-O" : "Create your account"}
          </h2>
          <p className="text-slate-400">
            {mode === "login"
              ? "Use your Django account credentials to sign in."
              : "Create a new account and sign in with JWT authentication."}
          </p>
        </div>

        <form
          onSubmit={mode === "login" ? handleLogin : handleSignup}
          className="space-y-4"
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {mode === "signup" && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm password"
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isLoading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center justify-between mt-6 text-sm text-slate-400">
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
