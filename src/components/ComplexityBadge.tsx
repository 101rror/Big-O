import React from 'react';

interface ComplexityBadgeProps {
  complexity: string;
  type: 'time' | 'space';
}

const complexityColors = {
  'O(1)': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700',
  'O(log n)': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  'O(n)': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  'O(n log n)': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700',
  'O(n²)': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
  'O(n³)': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
  'O(n⋅2^n)': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700',
  'O(2^n)': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700',
  'O(n!)': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
};

const complexityRating = {
  'O(1)': { rating: 'Excellent', icon: '🚀' },
  'O(log n)': { rating: 'Very Good', icon: '⚡' },
  'O(n)': { rating: 'Good', icon: '✅' },
  'O(n log n)': { rating: 'Fair', icon: '⚠️' },
  'O(n²)': { rating: 'Poor', icon: '🐌' },
  'O(n³)': { rating: 'Very Poor', icon: '🐌' },
  'O(n⋅2^n)': { rating: 'Terrible', icon: '🔥' },
  'O(2^n)': { rating: 'Terrible', icon: '🔥' },
  'O(n!)': { rating: 'Terrible', icon: '🔥' }
};

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ complexity, type }) => {
  const colorClass = complexityColors[complexity as keyof typeof complexityColors] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  const rating = complexityRating[complexity as keyof typeof complexityRating] || { rating: 'Unknown', icon: '❓' };

  return (
    <div className="space-y-2">
      <div className={`inline-flex items-center px-4 py-2 rounded-lg border font-mono text-lg font-semibold transition-colors duration-200 ${colorClass}`}>
        {complexity}
      </div>
      <div className="flex items-center space-x-2 text-sm">
        <span>{rating.icon}</span>
        <span className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">{rating.rating}</span>
        <span className="text-slate-500 dark:text-slate-400 transition-colors duration-200">
          {type === 'time' ? 'execution efficiency' : 'memory usage'}
        </span>
      </div>
    </div>
  );
};