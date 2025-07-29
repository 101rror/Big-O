import React, { useState } from 'react';
import { Lightbulb, Copy, Check } from 'lucide-react';
import type { AnalysisResult } from '../types/analysis';

interface CodeSuggestionsProps {
  analysis: AnalysisResult | null;
  language: string;
  hasCode: boolean;
}

export const CodeSuggestions: React.FC<CodeSuggestionsProps> = ({
  analysis,
  language,
  hasCode
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getOptimizedSuggestions = () => {
    if (!analysis) return [];

    const suggestions = [];

    if (language) {
      suggestions.push({
        title: 'Working on it',
        complexity: 'Hard work',
        code: `// Optimized with Salman`
      });

      /*

    // Hash Map Optimization
    if (language === 'javascript') {
      suggestions.push({
        title: 'Hash Map Optimization',
        complexity: 'O(n)',
        code: `// Optimized with Hash Map
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`
      });

      suggestions.push({
        title: 'Memoization Pattern',
        complexity: 'O(n)',
        code: `// Dynamic Programming with Memoization
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`
      });
    } else if (language === 'python') {
      suggestions.push({
        title: 'Hash Map Optimization',
        complexity: 'O(n)',
        code: `# Optimized with Hash Map
def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []`
      });

      suggestions.push({
        title: 'Memoization with LRU Cache',
        complexity: 'O(n)',
        code: `# Dynamic Programming with Memoization
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 2:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)`
      });
    } else if (language === 'java') {
      suggestions.push({
        title: 'HashMap Optimization',
        complexity: 'O(n)',
        code: `// Optimized with HashMap
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    
    return new int[]{};
}`
      });

      suggestions.push({
        title: 'Memoization Pattern',
        complexity: 'O(n)',
        code: `// Dynamic Programming with Memoization
private Map<Integer, Integer> memo = new HashMap<>();

public int fibonacci(int n) {
    if (memo.containsKey(n)) return memo.get(n);
    if (n <= 2) return 1;
    
    int result = fibonacci(n - 1) + fibonacci(n - 2);
    memo.put(n, result);
    return result;
}`
      });*/
    }

    return suggestions;
  };

  if (!hasCode) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 transition-colors duration-200">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center transition-colors duration-200">
            <Lightbulb className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-200">
              Code Suggestions
            </h3>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-200">
              Get optimized code examples after analyzing your algorithm
            </p>
          </div>
        </div>
      </div>
    );
  }

  const suggestions = getOptimizedSuggestions();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-200">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-200">Optimized Code Examples</h3>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">{suggestion.title}</h4>
                  <span className="text-sm text-green-600 dark:text-green-400 font-mono transition-colors duration-200">{suggestion.complexity}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(suggestion.code, index)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors duration-200"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 dark:text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-50 dark:bg-slate-900/50 rounded-md p-3 text-sm font-mono overflow-x-auto transition-colors duration-200">
                <code className="text-slate-800 dark:text-slate-200">{suggestion.code}</code>
              </pre>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400 transition-colors duration-200">
            Analyze your code to see optimized suggestions
          </p>
        </div>
      )}
    </div>
  );
};