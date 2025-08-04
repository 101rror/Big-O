import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight } from '@uiw/codemirror-theme-github';
import { Play, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { placeholder } from '@codemirror/view';


interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  onAnalyze,
  isAnalyzing,
}) => {
  const { theme } = useTheme();

  const getLanguageExtension = () => {
    switch (language) {
      case 'cpp':
        return cpp();
      case 'python':
        return python();
      case 'java':
        return java();
      case 'javascript':
      default:
        return javascript();
    }
  };

  return (
    <div className="space-y-4">
      <CodeMirror
        value={code}
        height="320px"
        theme={theme === 'dark' ? oneDark : githubLight}
        extensions={[
          getLanguageExtension(),
          placeholder('// write or paste your code here'),
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
          <div>Lines: {code.split('\n').length}</div>
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
