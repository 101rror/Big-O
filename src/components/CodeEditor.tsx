import React, { useRef } from 'react';
import { Play, Loader2 } from 'lucide-react';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const getPlaceholder = () => {
    switch (language) {
      case 'cpp':
        return `// Example: Binary Search
int binarySearch(const std::vector<int>& arr, int target) {
  int left = 0;
  int right = arr.size() - 1;

  while (left <= right) {
    int mid = left + (right - left) / 2; // avoids overflow
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`;

      case 'python':
        return `# Example: Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`;
      case 'java':
        return `// Example: Binary Search
public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`;
      default:
        return `// Paste your code here or try the example
// The analyzer will detect complexity patterns automatically`;
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="space-y-4">
      <div className="flex border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden font-mono text-sm h-80">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 text-xs select-none overflow-hidden text-right px-2 py-2"
          style={{ width: '50px', overflowY: 'hidden', lineHeight: '1.5rem' }}
        >
          {Array.from({ length: lineCount }).map((_, index) => (
            <div key={index} style={{ height: '1.5rem' }}>
              {index + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          placeholder={getPlaceholder()}
          className="flex-1 resize-none p-4 outline-none text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 leading-relaxed"
          style={{
            lineHeight: '1.5rem',
            overflowY: 'auto',
          }}
        />
      </div>

      {/* Stats + Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Lines: {lineCount} | Characters: {code.length}
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
