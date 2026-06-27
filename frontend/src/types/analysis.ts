export type SupportedLanguage =
  | "c"
  | "cpp"
  | "python"
  | "java"
  | "javascript";

export interface AnalysisResult {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: {
    time: string;
    space: string;
  };
  suggestions: string[];
  confidence: number;
}

export interface AnalysisRequestPayload {
  code: string;
  language: SupportedLanguage;
}

export type AnalysisResponse = AnalysisResult;
