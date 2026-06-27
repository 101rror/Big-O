import type {
    SavedHistoryEntry,
    CreateHistoryEntryPayload,
} from "../types/history";
import {
    fetchHistory as getHistoryApi,
    saveHistory as saveHistoryApi,
    deleteHistoryEntry as deleteHistoryEntryApi,
} from "../api/historyApi";

export const getHistoryService = async (): Promise<SavedHistoryEntry[]> => {
    return getHistoryApi();
};

export const saveHistoryService = async (
    payload: CreateHistoryEntryPayload,
): Promise<SavedHistoryEntry> => {
    return saveHistoryApi(payload);
};

export const deleteHistoryService = async (entryId: string): Promise<void> => {
    return deleteHistoryEntryApi(entryId);
};
