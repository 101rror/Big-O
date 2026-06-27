export interface StoredCodeAnalysis {
    timeComplexity: string;
    spaceComplexity: string;
    explanation: {
        time: string;
        space: string;
    };
    suggestions: string[];
    confidence: number;
}

export interface SavedCodeEntry {
    id: string;
    code: string;
    language: string;
    createdAt: string;
    analysis: StoredCodeAnalysis;
}

const STORAGE_PREFIX = "big_o_code_history_";

const mapKey = (username: string) => `${STORAGE_PREFIX}${username}`;

const generateId = (): string => {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const getSavedCodeEntries = (username: string): SavedCodeEntry[] => {
    try {
        const raw = localStorage.getItem(mapKey(username));
        return raw ? (JSON.parse(raw) as SavedCodeEntry[]) : [];
    } catch {
        return [];
    }
};

export const saveCodeEntry = (
    username: string,
    entry: Omit<SavedCodeEntry, "id" | "createdAt">,
): SavedCodeEntry => {
    const saved = getSavedCodeEntries(username);
    const newEntry: SavedCodeEntry = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...entry,
    };
    const next = [newEntry, ...saved];
    localStorage.setItem(mapKey(username), JSON.stringify(next));
    return newEntry;
};

export const deleteCodeEntry = (username: string, id: string): void => {
    const saved = getSavedCodeEntries(username);
    const next = saved.filter((entry) => entry.id !== id);
    localStorage.setItem(mapKey(username), JSON.stringify(next));
};
