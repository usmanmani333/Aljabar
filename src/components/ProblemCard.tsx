import React from 'react';
import { CheckCircle2, Bookmark, ArrowRight, Play } from 'lucide-react';
import { Problem } from '../types/math';
import { MathView } from './MathView';

interface ProblemCardProps {
  problem: Problem;
  isSolved: boolean;
  isBookmarked: boolean;
  isSelected: boolean;
  onSelect: (problem: Problem) => void;
  onToggleBookmark: (problemId: string) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  isSolved,
  isBookmarked,
  isSelected,
  onSelect,
  onToggleBookmark,
}) => {
  return (
    <div
      onClick={() => onSelect(problem)}
      className={`group p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 shadow-xs ring-1 ring-indigo-500/20'
          : isSolved
          ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 hover:border-emerald-300'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xs'
      }`}
    >
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {problem.exerciseId} Q{problem.questionNumber} {problem.subPart || ''}
          </span>
          <span aria-hidden="true">·</span>
          <span>{problem.steps.length} steps</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{problem.difficulty}</span>
        </div>

        <div className="flex items-center gap-2">
          {isSolved && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Solved</span>
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(problem.id);
            }}
            className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="text-sm text-slate-800 dark:text-slate-100 line-clamp-2 font-serif mb-3">
        <MathView math={problem.statementLatex} block={false} />
      </div>

      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
          Unit {problem.unitId}: {problem.unitTitle}
        </span>
        <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>{isSelected ? 'Solving now' : 'Solve with Feedback'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
