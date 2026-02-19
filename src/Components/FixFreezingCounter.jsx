import { useState, useEffect, useRef } from "react";

export default function FixFreezingCounter() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const incrementRef = useRef(increment);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Keep the ref updated with the latest increment value
  useEffect(() => {
    incrementRef.current = increment;
  }, [increment]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + incrementRef.current);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []); // Empty dependency array - interval never recreates

  return (
    <div className="min-h-[calc(100vh-40px)] max-h-fit py-5 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header with Dark Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Freezing Counter Fix
          </h2>

          {/* Dark Mode Toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Dark theme
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isDark}
                onChange={(e) => setIsDark(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>
        </div>

        {/* Main Counter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* Counter Display */}
          <div className="text-center">
            <div className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-2">
              Current Count
            </div>
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-4">
              {count}
            </div>
            <button
              onClick={() => setCount(0)}
              className="px-6 py-2 text-sm sm:text-base bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 font-medium focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
              Reset Counter
            </button>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Increment Controls */}
          <div className="space-y-4">
            <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Every second, increment by:
            </p>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <button
                disabled={increment === 0}
                onClick={() => {
                  setIncrement((i) => i - 1);
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl font-bold bg-red-500 hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center focus:ring-2 focus:ring-red-400 focus:outline-none"
                aria-label="Decrease increment"
              >
                –
              </button>

              <div className="min-w-[60px] text-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400">
                  {increment}
                </span>
              </div>

              <button
                onClick={() => {
                  setIncrement((i) => i + 1);
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center focus:ring-2 focus:ring-green-400 focus:outline-none"
                aria-label="Increase increment"
              >
                +
              </button>
            </div>
          </div>

          {/* Info Message */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
              ⏰ The counter increments every second. Try clicking the
              plus/minus buttons rapidly to see that the timer never freezes!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                Time until next increment
              </div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                1 second
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                Increment value
              </div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {increment} {increment === 1 ? "unit" : "units"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          The counter never freezes because the interval doesn't recreate on
          increment changes
        </p>
      </div>
    </div>
  );
}
