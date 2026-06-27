import api from "./axios";
import type {
    SavedHistoryEntry,
    CreateHistoryEntryPayload,
} from "../types/history";

export const fetchHistory = async () => {
    const response = await api.get<SavedHistoryEntry[]>("/history/");
    return response.data;
};

export const saveHistory = async (payload: CreateHistoryEntryPayload) => {
    const response = await api.post<SavedHistoryEntry>("/history/", payload);
    return response.data;
};

export const deleteHistoryEntry = async (entryId: string) => {
    await api.delete(`/history/${entryId}/`);
};
