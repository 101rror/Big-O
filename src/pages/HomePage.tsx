import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { CodeEditor } from "../components/CodeEditor";
import { ComplexityAnalysis } from "../components/ComplexityAnalysis";
import { useCodeAnalysis } from "../hooks/useCodeAnalysis";
import { toast } from "react-hot-toast";
import { saveHistoryService } from "../services/historyService";

export const HomePage: React.FC = () => {
    const { user, isAuthenticated, openAuthModal } = useAuth();
    const { code, setCode, language, setLanguage, analysis, isAnalyzing, analyzeCode } =
        useCodeAnalysis();

    const handleAnalyze = async () => {
        if (!code.trim()) {
            toast.error("Please enter code before analyzing.");
            return;
        }

        if (!isAuthenticated) {
            toast.error("Please login or create an account to analyze code");
            openAuthModal();
            return;
        }

        const result = await analyzeCode();
        if (!result) {
            return;
        }

        if (user) {
            try {
                await saveHistoryService({
                    code,
                    language,
                    analysis: result,
                });
                toast.success("Analysis saved to your profile history.");
            } catch (error) {
                console.error(error);
                toast.error("Unable to save analysis history.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-200">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    <div className="space-y-6 h-full">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                                    Code Input
                                </h2>
                            </div>

                            <CodeEditor
                                code={code}
                                onChange={setCode}
                                language={language}
                                onLanguageChange={setLanguage}
                                onAnalyze={handleAnalyze}
                                isAnalyzing={isAnalyzing}
                            />
                        </div>
                    </div>

                    <div className="space-y-6 h-full">
                        <ComplexityAnalysis
                            analysis={analysis}
                            isAnalyzing={isAnalyzing}
                            hasCode={code.trim().length > 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
