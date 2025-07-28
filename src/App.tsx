import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { LanguageSelector } from './components/LanguageSelector';
import { useCodeAnalysis } from './hooks/useCodeAnalysis';

function App() {
  const {
    code,
    setCode,
    language,
    setLanguage,
    isAnalyzing,
    analyzeCode
  } = useCodeAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Code Input Section */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Code Input</h2>
                <LanguageSelector value={language} onChange={setLanguage} />
              </div>
              
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                onAnalyze={analyzeCode}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;