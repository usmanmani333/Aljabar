import React from 'react';
import { X, BookOpen, Sparkles, Check } from 'lucide-react';
import { MathView } from './MathView';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: number;
  unitTitle: string;
  urduTitle: string;
  formulas: { label: string; formulaLatex: string }[];
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({
  isOpen,
  onClose,
  unitId,
  unitTitle,
  urduTitle,
  formulas,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-semibold">
                Math Teacher's Key Concepts & Formulas
              </div>
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span>Unit {unitId}: {unitTitle}</span>
                <span className="font-urdu text-sm font-normal text-indigo-300">({urduTitle})</span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formula Cards */}
        <div className="p-5 overflow-y-auto space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800">
          {formulas && formulas.length > 0 ? (
            formulas.map((item, idx) => (
              <div key={idx} className="pt-3.5 first:pt-0 space-y-1.5">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />
                  {item.label}
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3 text-center text-slate-950 dark:text-white font-medium">
                  <MathView math={item.formulaLatex} block />
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
              Key formulas are integrated into the exercise questions.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          >
            Got it, return to exercise
          </button>
        </div>
      </div>
    </div>
  );
};
