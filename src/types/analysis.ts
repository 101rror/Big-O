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