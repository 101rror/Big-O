import React from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { codeExamples } from '../utilities/codeExamples';


const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-6 h-6 hover:text-purple-400 transition-colors"
  >
    <path d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.418c.6.112.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.774.42-1.305.763-1.606-2.665-.303-5.466-1.334-5.466-5.933 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.874.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.803 5.625-5.475 5.92.43.372.815 1.106.815 2.23 0 1.61-.015 2.91-.015 3.31 0 .322.217.694.825.576A12.004 12.004 0 0024 12c0-6.627-5.373-12-12-12z" />
  </svg>
);


const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-6 h-6 hover:text-pink-400 transition-colors"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.76 0 5-2.239 5-5v-14c0-2.761-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.763 0-.974.784-1.764 1.75-1.764s1.75.79 1.75 1.764c0 .973-.784 1.763-1.75 1.763zm13.5 11.27h-3v-5.5c0-1.32-1.06-2.39-2.36-2.39-1.29 0-2.33.87-2.33 2.1v5.79h-3v-10h3v1.4c.45-.65 1.25-1.4 2.88-1.4 2.6 0 4.62 1.7 4.62 5.33v4.67z" />
  </svg>
);

export const LearnPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Calculator</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
              Big O Notation
            </h1>
          </div>

          {/* Introduction */}
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              Big O notation is a tool used to evaluate the performance and efficiency of an algorithm. It allows us 
              to estimate how the algorithm's running time or memory usage will change as the size of the input 
              grows.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              In simpler terms, Big O notation informs us about the speed of an algorithm as the amount of data it 
              needs to process increases. This knowledge helps us understand how the algorithm's performance will 
              degrade as the problem size grows.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              Big O notation is typically represented by a function that describes the algorithm's worst-case time 
              complexity. The function is expressed in terms of the input size, denoted by "n". By analyzing this 
              function, we can determine the algorithm's scalability and how it will perform on larger inputs.
            </p>

            <div className="flex justify-center mt-8">
              <Link 
                to="/"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Big O</span>
              </Link>
            </div>
          </div>

          {/* Common Complexities */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-pink-400">
              Common Time Complexities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* O(1) Constant */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-green-400">O(1) - Constant</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  The algorithm takes the same amount of time regardless of input size.
                </p>
                <CodeMirror
                  value={codeExamples.constant}
                  height="160px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  editable={false}
                  basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
                />
              </div>

              {/* O(log n) Logarithmic */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-blue-400">O(log n) - Logarithmic</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  Time increases logarithmically with input size. Very efficient.
                </p>
                <CodeMirror
                  value={codeExamples.logarithmic}
                  height="160px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  editable={false}
                  basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
                />
              </div>

              {/* O(n) Linear */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-yellow-400">O(n) - Linear</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  Time increases linearly with input size. Generally acceptable.
                </p>
                <CodeMirror
                  value={codeExamples.linear}
                  height="160px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  editable={false}
                  basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
                />
              </div>

              {/* O(n log n) Linearithmic */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-orange-400">O(n log n) - Linearithmic</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  Common in efficient sorting algorithms like merge sort.
                </p>
                <CodeMirror
                  value={codeExamples.logLinear}
                  height="160px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  editable={false}
                  basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
                />
              </div>

              {/* O(n²) Quadratic */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-red-400">O(n²) - Quadratic</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  Time increases quadratically. Can be slow for large inputs.
                </p>
                <CodeMirror
                  value={codeExamples.quadratic}
                  height="160px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  editable={false}
                  basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
                />
              </div>

              {/* O(2^n) Exponential */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-purple-400">O(2ⁿ) - Exponential</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  Time doubles with each additional input. Very inefficient.
                </p>
                <CodeMirror
                  value={codeExamples.exponential}
                  height="160px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  editable={false}
                  basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
                />
              </div>
            </div>
          </div>

          {/* Why do we need it? */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-pink-400">
              Why do we need it?
            </h2>
            
            <p className="text-lg text-slate-300">
              We need Big O notation for several reasons:
            </p>

            <ul className="space-y-4 text-lg text-slate-300">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></span>
                <span>
                  Big O notation provides a standardized way to describe the performance of an algorithm in terms 
                  of the input size.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></span>
                <span>
                  We can compare the performance of different algorithms and choose the one that is most 
                  appropriate for a given problem.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></span>
                <span>
                  Identify areas where we can optimize an algorithm and improve its performance.
                </span>
              </li>
            </ul>
          </div>

          {/* Complexity */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-pink-400">
              Complexity
            </h2>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              Understanding time and space complexity is critical for designing and analyzing algorithms. In most 
              cases, we want to design algorithms that are both time and space-efficient. However, there is often a 
              trade-off between time and space complexity. An algorithm that is fast may require more memory, 
              while an algorithm that uses less memory may be slower.
            </p>
          </div>

          {/* Time Complexity */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-pink-400">
              Time Complexity
            </h3>
            
            <p className="text-lg text-slate-300">
              Time complexity refers to the amount of time it takes for an algorithm to run.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              For example, if an algorithm has a time complexity of O(n), it means that the algorithm's running time 
              will grow linearly with the input size. If the input size doubles, the algorithm's running time will also 
              double.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to analyze your code?
              </h3>
              <p className="text-slate-300 mb-6">
                Use our AI-powered Big O calculator to analyze your algorithms and get optimization suggestions.
              </p>
              <Link 
                to="/"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Big O</span>
              </Link>

              {/* GitHub & LinkedIn icons */}
              <div className="mt-6 flex justify-center space-x-8 text-white">
                <a
                  href="https://github.com/101rror"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-purple-400 transition-colors"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/101rror/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-pink-400 transition-colors"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
