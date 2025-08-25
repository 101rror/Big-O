import React, { useState } from 'react';
import { LogIn, X } from 'lucide-react';

interface LoginButtonProps {
  onLoginClick?: () => void;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onLoginClick }) => {
  const [step, setStep] = useState<'button' | 'welcome'>('button');

  const handleGoogleAuth = () => {
    alert('Google login flow here');
  };

  // Show Modal
  if (step === 'welcome') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-[90%] max-w-sm shadow-xl relative">
          {/* Close Button */}
          <button
            onClick={() => setStep('button')}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-2">
            Welcome back
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Sign in to free analyze your code
          </p>

          {/* Google Login */}
          <button
            onClick={handleGoogleAuth}
            className="w-full py-2 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Log in with Google
          </button>

          {/* Sign Up */}
          <button
            onClick={() => alert('Sign up flow here')}
            className="w-full py-2 mb-3 bg-gradient-to-r from-blue-300 to-purple-300 text-black rounded-full font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 transform hover:scale-105"
          >
            Sign up with Google
          </button>

          {/* Stay Logged Out */}
          <button
            onClick={() => setStep('button')}
            className="w-full py-2 text-gray-500 hover:underline"
          >
            Stay logged out
          </button>
        </div>
      </div>
    );
  }

  // Show Login Button
  return (
    <button
      onClick={() => {
        setStep('welcome');
        if (onLoginClick) onLoginClick();
      }}
      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </button>
  );
};
