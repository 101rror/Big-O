import { useState } from 'react';
import type { AnalysisResult } from '../types/analysis';
import { analyzeComplexity } from '../utils/complexityAnalyzer';

export const useCodeAnalysis = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c++');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeComplexity(code, language);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    code,
    setCode,
    language,
    setLanguage,
    analysis,
    isAnalyzing,
    analyzeCode
  };
};