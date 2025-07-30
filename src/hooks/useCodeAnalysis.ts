import { useState } from 'react';
import type { AnalysisResult } from '../types/analysis';
import { analyzeComplexity } from '../utils/complexityAnalyzer';

export const useCodeAnalysis = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c++');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // Clear analysis when code changes to prevent auto-analysis
    if (analysis) {
      setAnalysis(null);
    }
  };

  const analyzeCode = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeComplexity(code, language);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis({
        timeComplexity: 'Error',
        spaceComplexity: 'Error',
        explanation: {
          time: error instanceof Error ? error.message : 'Analysis failed. Please check your OpenAI API key and try again.',
          space: 'Unable to analyze space complexity due to API error.'
        },
        suggestions: [
          'Verify your OpenAI API key is correctly set in environment variables',
          'Check your internet connection',
          'Ensure your code is syntactically correct'
        ],
        confidence: 0
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    code,
    setCode: handleCodeChange,
    language,
    setLanguage,
    analysis,
    isAnalyzing,
    analyzeCode
  };
};