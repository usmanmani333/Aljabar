import React, { useState } from 'react';
import { X, Check, Copy, BookOpen, Lightbulb } from 'lucide-react';
import { MathView } from './MathView';
import { MathDiagram, MathDiagramConfig } from './MathDiagram';

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  partLabel?: string;
  statementLatex: string;
  hint?: string;
  solutionSteps?: string[];
  finalAnswer?: string;
  diagram?: MathDiagramConfig;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({
  isOpen,
  onClose,
  title,
  partLabel,
  statementLatex,
  hint,
  solutionSteps,
  finalAnswer,
  diagram,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = (solutionSteps || []).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
              <BookOpen className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                Official Mathematical Solution
              </div>
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <span>{title}</span>
                {partLabel && (
                  <span className="font-mono text-cyan-400">{partLabel}</span>
                )}
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Statement */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">
              Problem
            </div>
            <div className="font-serif text-base font-semibold text-slate-950 dark:text-white leading-relaxed overflow-x-auto">
              <MathView math={statementLatex} block={false} />
            </div>
          </div>

          {/* Hint if present */}
          {hint && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Key Hint: </span>
                <span>{hint}</span>
              </div>
            </div>
          )}

          {/* Diagram / Graph if available */}
          {diagram && (
            <div className="p-3 bg-indigo-50/50 dark:bg-slate-800/60 rounded-xl border border-indigo-200/60 dark:border-indigo-900/40">
              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-bold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>Official Solution Graph / Geometric Illustration:</span>
              </div>
              <MathDiagram diagram={diagram} />
            </div>
          )}

          {/* Step-by-Step Mathematical Working */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wide text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between">
              <span>Step-by-Step Mathematical Working:</span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy LaTeX</span>
                  </>
                )}
              </button>
            </div>

            {solutionSteps && solutionSteps.length > 0 ? (
              <div className="space-y-2">
                {solutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700"
                  >
                    <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800 shrink-0 mt-0.5 select-none">
                      Step {idx + 1}
                    </span>
                    <div className="font-serif text-base font-semibold text-slate-950 dark:text-white overflow-x-auto w-full">
                      <MathView math={step} block={false} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic py-2">
                Solution steps recorded in notebook practice.
              </div>
            )}
          </div>

          {/* Final Answer Highlight */}
          {finalAnswer && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700 rounded-xl flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono uppercase">
                Final Result
              </span>
              <div className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-200 font-mono">
                <MathView math={finalAnswer} block={false} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-xl transition-colors"
          >
            Close Solution
          </button>
        </div>
      </div>
    </div>
  );
};
