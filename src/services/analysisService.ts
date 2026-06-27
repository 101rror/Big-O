import type {
    AnalysisRequestPayload,
    AnalysisResponse,
} from "../types/analysis";
import { analyzeCode as analyzeCodeApi } from "../api/analysisApi";

export const analyzeCodeService = async (
    payload: AnalysisRequestPayload,
): Promise<AnalysisResponse> => {
    return analyzeCodeApi(payload);
};
