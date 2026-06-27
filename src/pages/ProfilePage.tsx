import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    getHistoryService,
    deleteHistoryService,
} from "../services/historyService";
import type { SavedHistoryEntry } from "../types/history";
import toast from "react-hot-toast";
import { ArrowLeft, FileCode2, Trash2, Clock3 } from "lucide-react";

export const ProfilePage: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [entries, setEntries] = useState<SavedHistoryEntry[]>([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            if (!user) {
                setEntries([]);
                return;
            }
            try {
                const data = await getHistoryService();
                if (mounted) setEntries(data);
            } catch (error) {
                console.error(error);
                toast.error("Unable to load history.");
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, [user]);

    const handleDelete = async (id: string) => {
        try {
            await deleteHistoryService(id);
            setEntries((prev) => prev.filter((e) => e.id !== id));
            toast.success("Deleted code entry");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete entry.");
        }
    };

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Profile</h1>
                    <p className="text-slate-400 mb-8">
                        To view your saved code history, please log in first.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-semibold">My Profile</h1>
                        <p className="text-slate-400 mt-2">
                            Saved code history for {user.username}
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-slate-800 border border-slate-700 rounded-full text-slate-100 hover:bg-slate-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Workspace
                    </Link>
                </div>

                {entries.length === 0 ? (
                    <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-10 text-center">
                        <FileCode2 className="mx-auto mb-4 w-10 h-10 text-blue-400" />
                        <h2 className="text-2xl font-semibold mb-2">No saved code yet</h2>
                        <p className="text-slate-500">
                            Analyze some code from the main page and your entries will appear
                            here automatically.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {entries.map((entry) => (
                            <article
                                key={entry.id}
                                className="rounded-3xl border border-slate-700 bg-slate-950/70 p-6 shadow-sm"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-300 mb-2">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
                                                <FileCode2 className="w-3.5 h-3.5" />
                                                {entry.language.toUpperCase()}
                                            </span>
                                            <span className="rounded-full bg-blue-600/15 px-3 py-1 text-xs text-blue-200">
                                                {new Date(entry.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-semibold text-white">
                                            Saved Code Snippet
                                        </h2>
                                        <p className="mt-2 text-slate-400 text-sm max-w-2xl">
                                            Time: {entry.analysis.timeComplexity} · Space:{" "}
                                            {entry.analysis.spaceComplexity}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(entry.id)}
                                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>

                                <div className="mb-5 rounded-3xl border border-slate-700 bg-slate-900 p-4 overflow-x-auto text-sm leading-6 text-slate-200">
                                    <pre className="whitespace-pre-wrap break-words">
                                        {entry.code}
                                    </pre>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-3xl bg-slate-800 p-4 border border-slate-700">
                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                            Time Complexity
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-white">
                                            {entry.analysis.timeComplexity}
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-800 p-4 border border-slate-700">
                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                            Space Complexity
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-white">
                                            {entry.analysis.spaceComplexity}
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-800 p-4 border border-slate-700">
                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                            Confidence
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-white">
                                            {Math.round(entry.analysis.confidence * 100)}%
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
