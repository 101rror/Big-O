import type { AnalysisResult } from "../types/analysis";
import { analyzeCode } from "../api/analysisApi";

export const analyzeComplexity = async (
  code: string,
  language: string,
): Promise<AnalysisResult> => {
  try {
    const result = await analyzeCode({ code, language });
    return result as AnalysisResult;
  } catch (error) {
    console.error("Complexity analysis failed:", error);
    throw error;
  }
};
