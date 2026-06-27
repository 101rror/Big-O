import type { AnalysisResult } from "./analysis";

export interface SavedHistoryEntry {
    id: string;
    code: string;
    language: string;
    createdAt: string;
    analysis: AnalysisResult;
}

export interface CreateHistoryEntryPayload {
    code: string;
    language: string;
    analysis: AnalysisResult;
}
