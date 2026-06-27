import { useState } from "react";
import type { AnalysisResult, SupportedLanguage } from "../types/analysis";
import { analyzeComplexity } from "../utils/complexityAnalyzer";

export const useCodeAnalysis = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>("cpp");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // Clear analysis when code changes to prevent auto-analysis
    if (analysis) {
      setAnalysis(null);
    }
  };

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    if (analysis) {
      setAnalysis(null);
    }
  };

  const analyzeCode = async () => {
    if (!code.trim()) return null;

    setIsAnalyzing(true);

    try {
      const result = await analyzeComplexity(code, language);
      setAnalysis(result);
      return result;
    } catch (error) {
      console.error("Analysis failed:", error);
      const failResult = {
        timeComplexity: "Error",
        spaceComplexity: "Error",
        explanation: {
          time:
            error instanceof Error
              ? error.message
              : "Analysis failed. Please try again later.",
          space: "Unable to analyze space complexity due to API error.",
        },
        suggestions: [
          "Check your internet connection",
          "Ensure your code is syntactically correct",
        ],
        confidence: 0,
      };
      setAnalysis(failResult);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    code,
    setCode: handleCodeChange,
    language,
    setLanguage: handleLanguageChange,
    analysis,
    isAnalyzing,
    analyzeCode,
  };
};
