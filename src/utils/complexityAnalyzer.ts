import type { AnalysisResult } from '../types/analysis';
import { analyzeCodeWithOpenAI } from './openaiService';

export const analyzeComplexity = async (code: string, language: string): Promise<AnalysisResult> => {
  try {
    const result = await analyzeCodeWithOpenAI(code, language);
    
    return {
      timeComplexity: result.timeComplexity,
      spaceComplexity: result.spaceComplexity,
      explanation: result.explanation,
      suggestions: result.suggestions,
      optimizedCode: result.optimizedCode,
      confidence: result.confidence
    };
  } catch (error) {
    console.error('Complexity analysis failed:', error);
    throw error;
  }
};