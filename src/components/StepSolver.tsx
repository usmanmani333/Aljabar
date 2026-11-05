import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Edit3,
  Bookmark,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Problem, ProblemStep, StepFeedbackResult } from '../types/math';
import { MathView } from './MathView';
import { MathKeypad } from './MathKeypad';
import { InteractiveNumberLine } from './visualizers/InteractiveNumberLine';
import { InteractiveTriangleViewer } from './visualizers/InteractiveTriangleViewer';
import { InteractiveVennViewer } from './visualizers/InteractiveVennViewer';
import { InteractiveCoordinatePlane } from './visualizers/InteractiveCoordinatePlane';

interface StepSolverProps {
  problem: Problem;
  isBookmarked: boolean;
  onToggleBookmark: (problemId: string) => void;
  onProblemSolved: (problemId: string) => void;
  onNextProblem?: () => void;
  onBackToBook?: () => void;
  hasMoreProblems?: boolean;
}

export const StepSolver: React.FC<StepSolverProps> = ({
  problem,
  isBookmarked,
  onToggleBookmark,
  onProblemSolved,
  onNextProblem,
  onBackToBook,
  hasMoreProblems = false,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [studentInput, setStudentInput] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<StepFeedbackResult | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hintTier, setHintTier] = useState<number>(0);
  const [activeHintText, setActiveHintText] = useState<string | null>(null);
  const [scratchpad, setScratchpad] = useState<string>('');
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  // Reset state when problem changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setStudentInput('');
    setFeedback(null);
    setCompletedSteps([]);
    setHintTier(0);
    setActiveHintText(null);
  }, [problem.id]);

  const currentStep: ProblemStep | undefined = problem.steps[currentStepIndex];
  const isProblemCompleted = completedSteps.length === problem.steps.length;

  const handleInsertSymbol = (symbol: string) => {
    setStudentInput((prev) => prev + symbol);
  };

  const handleCheckStep = async (overrideInput?: string) => {
    const inputToCheck = (overrideInput ?? studentInput).trim();
    if (!inputToCheck || !currentStep) return;

    setIsEvaluating(true);
    setFeedback(null);

    try {
      // Send to backend automated checker
      const response = await fetch('/api/check-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          problemTitle: `${problem.exerciseId} Q${problem.questionNumber} ${problem.subPart || ''}`,
          problemStatement: problem.statementLatex,
          stepNumber: currentStep.stepNumber,
          stepTitle: currentStep.title,
          stepPrompt: currentStep.prompt,
          expectedAnswer: currentStep.acceptedAnswers[0],
          studentInput: inputToCheck,
          workingHistory: completedSteps.map((idx) => ({
            step: problem.steps[idx].title,
            answer: problem.steps[idx].acceptedAnswers[0],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Automated verification service unavailable');
      }

      const result: StepFeedbackResult = await response.json();
      setFeedback(result);

      if (result.isCorrect) {
        if (!completedSteps.includes(currentStepIndex)) {
          const nextCompleted = [...completedSteps, currentStepIndex];
          setCompletedSteps(nextCompleted);

          if (nextCompleted.length === problem.steps.length) {
            // Problem finished! Trigger confetti
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.7 },
            });
            onProblemSolved(problem.id);
          }
        }
      }
    } catch (err: any) {
      // Local fallback checking
      const cleanStudent = inputToCheck.toLowerCase().replace(/\s+/g, '');
      const isAccepted = currentStep.acceptedAnswers.some((ans) => {
        const cleanAns = ans.toLowerCase().replace(/\s+/g, '');
        return cleanStudent === cleanAns || cleanStudent.includes(cleanAns);
      });

      const fallbackResult: StepFeedbackResult = {
        isCorrect: isAccepted,
        feedback: isAccepted
          ? 'Great job! That correctly completes this step.'
          : 'Check your calculations or algebraic signs and try again.',
        guidance: isAccepted
          ? 'You can now advance to the next step.'
          : currentStep.hint,
        source: 'local-engine',
      };

      setFeedback(fallbackResult);

      if (isAccepted && !completedSteps.includes(currentStepIndex)) {
        const nextCompleted = [...completedSteps, currentStepIndex];
        setCompletedSteps(nextCompleted);
        if (nextCompleted.length === problem.steps.length) {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
          });
          onProblemSolved(problem.id);
        }
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < problem.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setStudentInput('');
      setFeedback(null);
      setHintTier(0);
      setActiveHintText(null);
    }
  };

  const handleRequestHint = async () => {
    if (!currentStep) return;
    const nextTier = Math.min(3, hintTier + 1);
    setHintTier(nextTier);

    try {
      const res = await fetch('/api/get-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: `${problem.exerciseId} Q${problem.questionNumber}`,
          problemStatement: problem.statementLatex,
          stepTitle: currentStep.title,
          stepPrompt: currentStep.prompt,
          hintTier: nextTier,
          standardHint: currentStep.hint,
        }),
      });
      const data = await res.json();
      setActiveHintText(data.hint || currentStep.hint);
    } catch {
      setActiveHintText(currentStep.hint);
    }
  };

  const handleResetProblem = () => {
    setCurrentStepIndex(0);
    setStudentInput('');
    setFeedback(null);
    setCompletedSteps([]);
    setHintTier(0);
    setActiveHintText(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Problem Top Header & Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          {onBackToBook && (
            <button
              onClick={onBackToBook}
              className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>‹ Return to Digital Textbook Page</span>
            </button>
          )}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{problem.unitTitle}</span>
            <span aria-hidden="true">·</span>
            <span>{problem.exerciseId}</span>
            <span aria-hidden="true">·</span>
            <span>Question {problem.questionNumber} {problem.subPart || ''}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize text-slate-700">{problem.difficulty}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Problem Solver
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggleBookmark(problem.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={() => setShowScratchpad((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showScratchpad
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Scratchpad</span>
          </button>
          <button
            onClick={handleResetProblem}
            title="Reset problem progress"
            className="p-2 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Problem Statement Box */}
      <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Problem Statement
        </div>
        <div className="text-base text-slate-900 leading-relaxed font-serif">
          <MathView math={problem.statementLatex} block={false} />
        </div>
      </div>

      {/* Interactive Diagram if applicable */}
      {problem.diagram?.type === 'number_line' && (
        <InteractiveNumberLine
          point={problem.diagram.data.point}
          label={problem.diagram.data.label}
          inequality={problem.diagram.data.inequality}
          min={problem.diagram.data.min}
          max={problem.diagram.data.max}
        />
      )}
      {problem.diagram?.type === 'right_triangle' && (
        <InteractiveTriangleViewer
          perpendicular={problem.diagram.data.perpendicular}
          base={problem.diagram.data.base}
          hypotenuse={problem.diagram.data.hypotenuse}
          thetaAngle={problem.diagram.data.thetaAngle}
        />
      )}
      {problem.diagram?.type === 'venn' && (
        <InteractiveVennViewer
          setALabel={problem.diagram.data.sets?.[0]?.label}
          setBLabel={problem.diagram.data.sets?.[1]?.label}
          universalTotal={problem.diagram.data.totalUnion}
        />
      )}
      {problem.diagram?.type === 'coordinate_plane' && (
        <InteractiveCoordinatePlane points={problem.diagram.data.points} />
      )}

      {/* Optional In-app Scratchpad */}
      {showScratchpad && (
        <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-xs text-amber-900 font-semibold">
            <span>Rough Work & Working Notes</span>
            <button
              onClick={() => setScratchpad('')}
              className="text-[11px] text-amber-700 hover:underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={scratchpad}
            onChange={(e) => setScratchpad(e.target.value)}
            placeholder="Type your intermediate calculations or notes here..."
            className="w-full h-20 p-2 text-xs font-mono bg-white border border-amber-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>
      )}

      {/* Step Navigation Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">
            Step-by-Step Solving Guide
          </span>
          <span className="text-slate-500 font-mono">
            {completedSteps.length} of {problem.steps.length} steps completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {problem.steps.map((st, idx) => {
            const isDone = completedSteps.includes(idx);
            const isCurrent = currentStepIndex === idx;
            return (
              <button
                key={st.stepNumber}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  setStudentInput('');
                  setFeedback(null);
                  setActiveHintText(null);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                    : 'border-slate-200 bg-slate-50/50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold mb-0.5">
                  <span>Step {st.stepNumber}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-slate-400 font-normal">#{st.stepNumber}</span>
                  )}
                </div>
                <div className="text-xs font-medium truncate text-slate-800">
                  {st.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Workspace */}
      {currentStep && (
        <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 shadow-2xs">
          <div className="space-y-1">
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
              Step {currentStep.stepNumber}: {currentStep.title}
            </div>
            <div className="text-sm font-medium text-slate-800">
              <MathView math={currentStep.prompt} block={false} />
            </div>
          </div>

          {/* Input or Multiple Choice */}
          {currentStep.expectedFormat === 'choice' && currentStep.options ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {currentStep.options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStudentInput(option);
                    handleCheckStep(option);
                  }}
                  className={`p-3 text-left text-xs font-medium rounded-xl border transition-all ${
                    studentInput === option
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {studentInput === option && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={studentInput}
                  onChange={(e) => setStudentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCheckStep();
                    }
                  }}
                  placeholder="Enter your working or final value for this step (e.g. 4/9, 6, x <= 4)..."
                  className="flex-1 px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
                <button
                  onClick={() => handleCheckStep()}
                  disabled={isEvaluating || !studentInput.trim()}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shrink-0 shadow-xs"
                >
                  {isEvaluating ? 'Evaluating...' : 'Check Step'}
                </button>
              </div>

              {/* Math virtual keyboard buttons */}
              <MathKeypad onInsert={handleInsertSymbol} />
            </div>
          )}

          {/* Feedback Section */}
          {feedback && (
            <div
              className={`p-4 rounded-xl border transition-all ${
                feedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-xs flex-1">
                  <div className="font-semibold text-sm">
                    {feedback.isCorrect ? 'Correct Step!' : 'Needs Review'}
                  </div>
                  <p className="leading-relaxed">{feedback.feedback}</p>
                  {feedback.guidance && (
                    <div className="pt-1 font-medium text-slate-700">
                      💡 {feedback.guidance}
                    </div>
                  )}

                  {feedback.isCorrect && currentStepIndex < problem.steps.length - 1 && (
                    <button
                      onClick={handleNextStep}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                    >
                      <span>Continue to Step {currentStep.stepNumber + 1}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Hint & Diagnostic Tools Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRequestHint}
                className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {hintTier === 0
                    ? 'Need a Step Hint?'
                    : hintTier === 1
                    ? 'Get Setup Hint'
                    : 'Show Detailed Step Hint'}
                </span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              PCTB Grade 9 Automated Step Evaluator
            </div>
          </div>

          {/* Active Hint Callout */}
          {activeHintText && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <div className="font-semibold text-amber-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Step Guidance (Level {hintTier}/3)</span>
              </div>
              <p className="leading-relaxed">
                <MathView math={activeHintText} />
              </p>
            </div>
          )}
        </div>
      )}

      {/* Completion Banner */}
      {isProblemCompleted && (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">
                Problem Successfully Solved!
              </h4>
              <p className="text-xs text-slate-600">
                You worked through all {problem.steps.length} steps accurately with verified mathematical reasoning.
              </p>
            </div>
          </div>

          {hasMoreProblems && onNextProblem && (
            <button
              onClick={onNextProblem}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span>Next Exercise Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
