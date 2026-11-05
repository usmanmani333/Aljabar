import React from 'react';
import { BookOpen, List, Bookmark, Shuffle, Calculator, CheckCircle2, Search, FileText } from 'lucide-react';

interface TopNavigationProps {
  activeView: 'book' | 'curriculum';
  onViewChange: (view: 'book' | 'curriculum') => void;
  onOpenTableOfContents: () => void;
  onOpenLogTables: () => void;
  onOpenSearch: () => void;
  onOpenTestMaker: () => void;
  onRandomExercise: () => void;
  bookmarkedCount: number;
  selectedTestCount: number;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeView,
  onViewChange,
  onOpenTableOfContents,
  onOpenLogTables,
  onOpenSearch,
  onOpenTestMaker,
  onRandomExercise,
  bookmarkedCount,
  selectedTestCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewChange('book')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-indigo-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:scale-105 transition-transform">
              📖
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                Punjab Curriculum & Textbook Board
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                Class 9 Mathematics · Exercises
              </h1>
            </div>
          </button>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-2 font-medium text-xs">
          <button
            onClick={() => onViewChange('book')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'book'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Exercise Book</span>
          </button>

          <button
            onClick={onOpenTableOfContents}
            className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <List className="w-3.5 h-3.5 text-slate-500" />
            <span>Table of Contents</span>
          </button>

          <button
            onClick={() => onViewChange('curriculum')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'curriculum'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <span>All 13 Units</span>
          </button>

          <button
            onClick={onOpenLogTables}
            className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-slate-500" />
            <span>Log Tables</span>
          </button>

          <button
            onClick={onOpenTestMaker}
            className="px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 group"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Test Maker (PDF)</span>
            {selectedTestCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold">
                {selectedTestCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 text-xs transition-colors shadow-2xs group"
            title="Search exercises or topics (Ctrl+K or /)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span className="font-medium">Search...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search exercises"
          >
            <Search className="w-4 h-4 text-indigo-500" />
          </button>

          <button
            onClick={onOpenTestMaker}
            className="px-2.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Create Custom Test Paper in A4 or Legal and Export to PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Make Test PDF</span>
            {selectedTestCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-indigo-700 text-[10px] font-mono font-bold">
                {selectedTestCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenTableOfContents}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            onClick={onRandomExercise}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Jump to Random Exercise for Practice"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden xl:inline">Random Exercise</span>
          </button>
        </div>
      </div>
    </header>
  );
};
