import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen, Bookmark, ChevronRight, Hash } from 'lucide-react';
import { BOOK_EXERCISES, BookExerciseSection } from '../data/bookExercises';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectExerciseIndex: (index: number) => void;
  bookmarkedExerciseIds: string[];
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onSelectExerciseIndex,
  bookmarkedExerciseIds,
}) => {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');

  // Group exercises by unit
  const unitsMap = useMemo(() => {
    const map = new Map<number, { unitTitle: string; urduTitle: string; exercises: { section: BookExerciseSection; index: number }[] }>();

    BOOK_EXERCISES.forEach((ex, idx) => {
      if (!map.has(ex.unitId)) {
        map.set(ex.unitId, {
          unitTitle: ex.unitTitle,
          urduTitle: ex.urduTitle,
          exercises: [],
        });
      }
      map.get(ex.unitId)!.exercises.push({ section: ex, index: idx });
    });

    return map;
  }, []);

  const filteredExercises = useMemo(() => {
    return BOOK_EXERCISES.map((ex, idx) => ({ section: ex, index: idx })).filter(({ section }) => {
      if (selectedUnit !== 'all' && section.unitId !== selectedUnit) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesEx = section.exerciseId.toLowerCase().includes(q);
        const matchesUnit = section.unitTitle.toLowerCase().includes(q);
        const matchesHead = section.headline.toLowerCase().includes(q);
        const matchesQuestions = section.questions.some(
          (qu) =>
            qu.mainInstruction.toLowerCase().includes(q) ||
            qu.subParts?.some((p) => p.statementLatex.toLowerCase().includes(q))
        );
        return matchesEx || matchesUnit || matchesHead || matchesQuestions;
      }
      return true;
    });
  }, [search, selectedUnit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300">
                Textbook Table of Contents
              </div>
              <h3 className="text-base font-bold text-white">
                Mathematics 9 (National Curriculum)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Unit Filter */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises, surds, logarithms, trigonometry..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <select
            value={selectedUnit}
            onChange={(e) =>
              setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))
            }
            className="px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          >
            <option value="all">All 13 Units</option>
            {Array.from(unitsMap.entries()).map(([id, data]) => (
              <option key={id} value={id}>
                Unit {id}: {data.unitTitle} ({data.urduTitle})
              </option>
            ))}
          </select>
        </div>

        {/* Exercises List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredExercises.length > 0 ? (
            filteredExercises.map(({ section, index }) => {
              const isActive = index === currentIndex;
              const isBookmarked = bookmarkedExerciseIds.includes(section.id);

              return (
                <div
                  key={section.id}
                  onClick={() => {
                    onSelectExerciseIndex(index);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span>U{section.unitId}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                          {section.exerciseId}
                        </span>
                        {isBookmarked && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold flex items-center gap-0.5">
                            <Bookmark className="w-2.5 h-2.5 fill-current" />
                            Bookmarked
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm font-medium">
                        {section.headline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      p. {section.pageNumber}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              No exercises match your search query.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 font-mono">
          Showing {filteredExercises.length} textbook exercises
        </div>
      </div>
    </div>
  );
};
