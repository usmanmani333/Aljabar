import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, ArrowRight, CornerDownLeft } from 'lucide-react';
import { BOOK_EXERCISES } from '../data/bookExercises';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = BOOK_EXERCISES.map((ex, originalIndex) => ({
    ...ex,
    originalIndex,
  })).filter((ex) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      ex.exerciseId.toLowerCase().includes(q) ||
      `exercise ${ex.exerciseId}`.toLowerCase().includes(q) ||
      ex.unitTitle.toLowerCase().includes(q) ||
      ex.urduTitle.includes(q) ||
      `unit ${ex.unitId}`.toLowerCase().includes(q) ||
      `page ${ex.pageNumber}`.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          onSelectIndex(filtered[selectedIndex].originalIndex);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onSelectIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/50">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exercises (e.g. 4.2, Logarithm, Cramer, Matrices)..."
            className="w-full bg-transparent border-none text-sm font-medium focus:outline-hidden text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No exercises found matching "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const totalParts = item.questions.reduce(
                (sum, q) => sum + (q.subParts ? q.subParts.length : 1),
                0
              );

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectIndex(item.originalIndex);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {item.exerciseId}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate flex items-center gap-2">
                        <span>Unit {item.unitId}: {item.unitTitle}</span>
                        <span
                          className={`font-urdu text-xs opacity-80 ${
                            isSelected ? 'text-indigo-100' : 'text-indigo-600 dark:text-indigo-400'
                          }`}
                        >
                          {item.urduTitle}
                        </span>
                      </div>
                      <div
                        className={`text-[11px] font-mono opacity-70 ${
                          isSelected ? 'text-indigo-100' : 'text-slate-400'
                        }`}
                      >
                        {item.questions.length} Questions • {totalParts} Subparts • Page {item.pageNumber}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 opacity-80">
                    {isSelected && (
                      <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <span>Select</span>
                        <CornerDownLeft className="w-2.5 h-2.5" />
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer Keyboard Guide */}
        <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between text-[11px] text-slate-400 font-mono px-4">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <div className="text-indigo-600 dark:text-indigo-400 font-semibold">
            {filtered.length} Exercises Available
          </div>
        </div>
      </div>
    </div>
  );
};
