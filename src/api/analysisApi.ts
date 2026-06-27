import api from "./axios";
import type {
    AnalysisRequestPayload,
    AnalysisResponse,
} from "../types/analysis";

export const analyzeCode = async (payload: AnalysisRequestPayload) => {
    const response = await api.post<AnalysisResponse>(
        "/analysis/analyze/",
        payload,
    );
    return response.data;
};
