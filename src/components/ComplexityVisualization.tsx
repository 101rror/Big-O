import React from 'react';

interface ComplexityVisualizationProps {
  timeComplexity: string;
  spaceComplexity: string;
}

const complexityOrder = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2^n)', 'O(n⋅2^n)', 'O(n!)'];

const getComplexityScore = (complexity: string): number => {
  const index = complexityOrder.indexOf(complexity);
  return index === -1 ? 4 : index;
};

const getProgressColor = (score: number): string => {
  if (score <= 1) return 'bg-green-500';
  if (score <= 2) return 'bg-yellow-500';
  if (score <= 4) return 'bg-orange-500';
  return 'bg-red-500';
};

export const ComplexityVisualization: React.FC<ComplexityVisualizationProps> = ({
  timeComplexity,
  spaceComplexity
}) => {
  const timeScore = getComplexityScore(timeComplexity);
  const spaceScore = getComplexityScore(spaceComplexity);
  
  const timeWidth = Math.min(((timeScore + 1) / 8) * 100, 100);
  const spaceWidth = Math.min(((spaceScore + 1) / 8) * 100, 100);

  return (
    <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-colors duration-200">
      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3 transition-colors duration-200">Complexity Comparison</h4>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400 transition-colors duration-200">Time Complexity</span>
            <span className="font-mono font-medium text-slate-800 dark:text-slate-200 transition-colors duration-200">{timeComplexity}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 transition-colors duration-200">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(timeScore)}`}
              style={{ width: `${timeWidth}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400 transition-colors duration-200">Space Complexity</span>
            <span className="font-mono font-medium text-slate-800 dark:text-slate-200 transition-colors duration-200">{spaceComplexity}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 transition-colors duration-200">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(spaceScore)}`}
              style={{ width: `${spaceWidth}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-slate-500 dark:text-slate-400 flex justify-between transition-colors duration-200">
        <span>Better ←</span>
        <span>→ Worse</span>
      </div>
    </div>
  );
};