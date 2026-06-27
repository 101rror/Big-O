import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { githubLight } from "@uiw/codemirror-theme-github";
import { Play, Loader2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { placeholder } from "@codemirror/view";
import type { SupportedLanguage } from "../types/analysis";

const LANGUAGE_OPTIONS: Array<{ value: SupportedLanguage; label: string }> = [
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
];

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  onLanguageChange,
  onAnalyze,
  isAnalyzing,
}) => {
  const { theme } = useTheme();

  const getLanguageExtension = () => {
    switch (language) {
      case "c":
        return cpp();
      case "cpp":
        return cpp();
      case "python":
        return python();
      case "java":
        return java();
      case "javascript":
      default:
        return javascript();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="language-select"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(event) =>
              onLanguageChange(event.target.value as SupportedLanguage)
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CodeMirror
        value={code}
        height="328px"
        theme={theme === "dark" ? oneDark : githubLight}
        extensions={[
          getLanguageExtension(),
          placeholder("// write or paste your code here"),
        ]}
        onChange={(value) => onChange(value)}
        className="rounded-lg overflow-hidden border border-gray-300 dark:border-slate-700"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
        }}
      />

      {/* Stats + Analyze Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <div>Lines: {code.split("\n").length}</div>
          <div>Characters: {code.length}</div>
        </div>

        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !code.trim()}
          className="flex items-center space-x-2 px-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Analyze Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
