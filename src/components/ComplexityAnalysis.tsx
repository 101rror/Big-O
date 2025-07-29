import React from 'react';
import { Clock, Database, TrendingUp, Lightbulb, Loader2, AlertCircle } from 'lucide-react';
import { ComplexityBadge } from './ComplexityBadge';
import { ComplexityVisualization } from './ComplexityVisualization';
import type { AnalysisResult } from '../types/analysis';

interface ComplexityAnalysisProps {
  analysis: AnalysisResult | null;
  isAnalyzing: boolean;
  hasCode: boolean;
}

export const ComplexityAnalysis: React.FC<ComplexityAnalysisProps> = ({
  analysis,
  isAnalyzing,
  hasCode
}) => {
  if (isAnalyzing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 transition-colors duration-200">
        <div className="flex items-center justify-center space-x-3 text-slate-600 dark:text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Analyzing complexity...</span>
        </div>
        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
          Processing your code and detecting complexity patterns
        </div>
      </div>
    );
  }

  if (!hasCode) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 transition-colors duration-200">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center transition-colors duration-200">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-200">
              Ready to Analyze
            </h3>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-200">
              Paste your code and click "Analyze Code" to get instant complexity insights
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 transition-colors duration-200">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500" />
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-200">
              No Analysis Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-200">
              Click "Analyze Code" to see the complexity analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Complexity Results */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6 transition-colors duration-200">Complexity Analysis</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">Time</span>
            </div>
            <ComplexityBadge complexity={analysis.timeComplexity} type="time" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">Space</span>
            </div>
            <ComplexityBadge complexity={analysis.spaceComplexity} type="space" />
          </div>
        </div>

        <ComplexityVisualization 
          timeComplexity={analysis.timeComplexity}
          spaceComplexity={analysis.spaceComplexity}
        />
      </div>

      {/* Detailed Explanation */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-200">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-200">Analysis Explanation</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-200">Time Complexity Breakdown</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-200">
              {analysis.explanation.time}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-200">Space Complexity Breakdown</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-200">
              {analysis.explanation.space}
            </p>
          </div>

          {analysis.suggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-200">Optimization Suggestions</h4>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-slate-600 dark:text-slate-400 transition-colors duration-200">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300 transition-colors duration-200">
                Confidence: {Math.round(analysis.confidence * 100)}%
              </span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 transition-colors duration-200">
              Analysis powered by AI complexity detection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};