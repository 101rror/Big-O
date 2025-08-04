import React from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <h1 className="text-xl font-bold">Learn about Big O</h1>
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

          {/* Common Complexities */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-pink-400">
              Common Time Complexities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-green-400">O(1) - Constant</h4>
                </div>
                <p className="text-slate-300">
                  The algorithm takes the same amount of time regardless of input size.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-blue-400">O(log n) - Logarithmic</h4>
                </div>
                <p className="text-slate-300">
                  Time increases logarithmically with input size. Very efficient.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-yellow-400">O(n) - Linear</h4>
                </div>
                <p className="text-slate-300">
                  Time increases linearly with input size. Generally acceptable.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-orange-400">O(n log n) - Linearithmic</h4>
                </div>
                <p className="text-slate-300">
                  Common in efficient sorting algorithms like merge sort.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-red-400">O(n²) - Quadratic</h4>
                </div>
                <p className="text-slate-300">
                  Time increases quadratically. Can be slow for large inputs.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-purple-400">O(2ⁿ) - Exponential</h4>
                </div>
                <p className="text-slate-300">
                  Time doubles with each additional input. Very inefficient.
                </p>
              </div>
            </div>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};