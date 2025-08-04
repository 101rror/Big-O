import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const isLearnPage = location.pathname === '/learn';

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <img src="/red-circle.png" alt="Big-O Logo" className="w-10 h-10 object-contain logo-animation" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-200">
                Big-O
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                Analyze algorithm efficiency
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </div>
    </header>
  );
};
