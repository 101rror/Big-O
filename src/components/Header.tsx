import React from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LoginButton } from './LoginButton';

export const Header: React.FC = () => {
  const location = useLocation();
  const isLearnPage = location.pathname === '/learn';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-200 relative z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <img
                src="/red-circle.png"
                alt="Big-O Logo"
                className="w-10 h-10 object-contain logo-animation"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-200">
                Big-O
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                Analyzer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLearnPage && (
              <Link
                to="/learn"
                className="flex items-center space-x-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4" />
                <span>Learn Big O</span>
              </Link>
            )}
            <ThemeToggle />
            <LoginButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-4 space-y-4 relative z-[50]">
            {!isLearnPage && (
              <Link
                to="/learn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-between items-center px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
              >
                <span>Learn Big O</span>
                <BookOpen className="w-5 h-5" />
              </Link>
            )}

            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-slate-700 dark:text-slate-300 text-sm">Theme</span>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-slate-700 dark:text-slate-300 text-sm">Account?</span>
              <LoginButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
