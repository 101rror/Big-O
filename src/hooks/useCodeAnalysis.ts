import { useState } from 'react';

export function useCodeAnalysis() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c++');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    setIsAnalyzing(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy analysis result
    const result = `Time Complexity: O(n)\nSpace Complexity: O(1)\nLanguage: ${language}`;
    setAnalysis(result);

    setIsAnalyzing(false);
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
}
