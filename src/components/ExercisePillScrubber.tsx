import React, { useRef, useEffect } from 'react';
import { BookExerciseSection } from '../data/bookExercises';
import { Bookmark, Sparkles } from 'lucide-react';

interface ExercisePillScrubberProps {
  exercises: BookExerciseSection[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  bookmarkedExerciseIds: string[];
}

export const ExercisePillScrubber: React.FC<ExercisePillScrubberProps> = ({
  exercises,
  currentIndex,
  onSelectIndex,
  bookmarkedExerciseIds,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll active item into view
  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector<HTMLElement>(`[data-index="${currentIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 mb-3">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs">
        <div
          ref={containerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {exercises.map((ex, idx) => {
            const isActive = idx === currentIndex;
            const isBookmarked = bookmarkedExerciseIds.includes(ex.id);

            return (
              <button
                key={ex.id}
                data-index={idx}
                onClick={() => onSelectIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 focus:outline-hidden ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-indigo-600 shadow-md scale-102 ring-2 ring-indigo-500/30'
                    : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{ex.exerciseId}</span>
                <span className="text-[10px] opacity-70 font-mono">
                  U{ex.unitId}
                </span>
                {isBookmarked && (
                  <Bookmark className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
