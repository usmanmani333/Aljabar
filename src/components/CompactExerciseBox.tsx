import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Printer,
  Sparkles,
  Edit3,
  CheckCircle2,
  Circle,
  BookOpen,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Coffee,
  Type,
  Share2,
  Lightbulb,
  FileText,
} from 'lucide-react';
import { BookExerciseSection, BookQuestion } from '../data/bookExercises';
import { MathView } from './MathView';
import { ScratchpadDrawer } from './ScratchpadDrawer';
import { FormulaSheetModal } from './FormulaSheetModal';
import { SolutionModal } from './SolutionModal';
import { MathDiagram, MathDiagramConfig } from './MathDiagram';

interface CompactExerciseBoxProps {
  section: BookExerciseSection;
  onPrevExercise: () => void;
  onNextExercise: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  direction: number; // 1 for next, -1 for prev
  currentIndex: number;
  totalExercises: number;
  bookmarkedExerciseIds: string[];
  onToggleBookmarkExercise: (exerciseId: string) => void;
  onOpenTestMaker?: (exerciseId?: string) => void;
  selectedTestQuestionIds?: string[];
  onToggleTestQuestion?: (question: BookQuestion, section: BookExerciseSection) => void;
}

export type ThemeMode = 'modern' | 'parchment' | 'midnight';
export type MathSize = 'compact' | 'standard' | 'large';

const STORAGE_KEY_NOTEBOOK_CHECKS = 'aljabr_notebook_completed_parts';

export const CompactExerciseBox: React.FC<CompactExerciseBoxProps> = ({
  section,
  onPrevExercise,
  onNextExercise,
  hasPrev,
  hasNext,
  direction,
  currentIndex,
  totalExercises,
  bookmarkedExerciseIds,
  onToggleBookmarkExercise,
  onOpenTestMaker,
  selectedTestQuestionIds = [],
  onToggleTestQuestion,
}) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('aljabr_theme') as ThemeMode) || 'modern';
  });

  const [mathSize, setMathSize] = useState<MathSize>(() => {
    return (localStorage.getItem('aljabr_math_size') as MathSize) || 'standard';
  });

  const [completedParts, setCompletedParts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTEBOOK_CHECKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const [expandedSolutionIds, setExpandedSolutionIds] = useState<string[]>([]);
  const [activeModalItem, setActiveModalItem] = useState<{
    title: string;
    partLabel?: string;
    statementLatex: string;
    hint?: string;
    solutionSteps?: string[];
    finalAnswer?: string;
    diagram?: MathDiagramConfig;
  } | null>(null);

  const toggleSolutionExpanded = (id: string) => {
    setExpandedSolutionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Touch swipe support
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('aljabr_theme', theme);
    if (theme === 'midnight') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aljabr_math_size', mathSize);
  }, [mathSize]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTEBOOK_CHECKS, JSON.stringify(completedParts));
    } catch (e) {
      console.warn(e);
    }
  }, [completedParts]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' && hasNext) {
        onNextExercise();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrevExercise();
      } else if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
        setShowAllSolutions((prev) => !prev);
      } else if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
        setIsScratchpadOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
        if (section.keyFormulas && section.keyFormulas.length > 0) {
          setIsFormulaModalOpen((prev) => !prev);
        }
      } else if (e.key === 'Escape') {
        setIsScratchpadOpen(false);
        setIsFormulaModalOpen(false);
        setActiveModalItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasNext, hasPrev, onNextExercise, onPrevExercise, section.keyFormulas]);

  const togglePartCompletion = (partId: string) => {
    setCompletedParts((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
  };

  const isBookmarked = bookmarkedExerciseIds.includes(section.id);

  // Calculate total parts in this exercise for student progress
  const totalSubpartsInExercise = section.questions.reduce((acc, q) => {
    return acc + (q.subParts ? q.subParts.length : 1);
  }, 0);

  const completedSubpartsInExercise = section.questions.reduce((acc, q) => {
    if (q.subParts) {
      return acc + q.subParts.filter((p) => completedParts.includes(p.id)).length;
    }
    return acc + (completedParts.includes(q.id) ? 1 : 0);
  }, 0);

  // Theme classes
  const themeClasses = {
    modern: {
      card: 'bg-white border-slate-300 text-slate-900 shadow-xl shadow-slate-200/50',
      header: 'border-slate-800 text-slate-800',
      badge: 'bg-slate-900 text-white border-slate-900',
      subpartCard: 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70 text-slate-900',
      subpartActive: 'bg-emerald-50/70 border-emerald-300 text-emerald-950',
      statementBox: 'bg-slate-50 border-slate-200 text-slate-900',
      footer: 'border-slate-800 text-slate-600',
      toolbar: 'bg-slate-100 border-slate-200 text-slate-700',
    },
    parchment: {
      card: 'bg-[#fbf7ee] border-[#dfd6c0] text-[#2c2416] shadow-xl shadow-[#ece3cb]/50',
      header: 'border-[#4a3b2c] text-[#4a3b2c]',
      badge: 'bg-[#4a3b2c] text-[#fbf7ee] border-[#4a3b2c]',
      subpartCard: 'bg-[#f4edd9]/80 border-[#d8ccb0] hover:border-[#b5a684] hover:bg-[#efe6cd] text-[#2c2416]',
      subpartActive: 'bg-[#e4edd4] border-[#9bb577] text-[#283815]',
      statementBox: 'bg-[#f3ebd5] border-[#d8ccb0] text-[#2c2416]',
      footer: 'border-[#4a3b2c] text-[#6d5b45]',
      toolbar: 'bg-[#efe6cf] border-[#d8ccb0] text-[#4a3b2c]',
    },
    midnight: {
      card: 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl shadow-black/80',
      header: 'border-slate-700 text-slate-300',
      badge: 'bg-indigo-600 text-white border-indigo-500',
      subpartCard: 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800 text-slate-100',
      subpartActive: 'bg-emerald-950/60 border-emerald-600/80 text-emerald-200',
      statementBox: 'bg-slate-800/90 border-slate-700 text-slate-100',
      footer: 'border-slate-800 text-slate-400',
      toolbar: 'bg-slate-800/90 border-slate-700 text-slate-300',
    },
  }[theme];

  // Font size styling
  const mathScaleClass = {
    compact: 'text-xs md:text-sm',
    standard: 'text-sm md:text-base',
    large: 'text-base md:text-lg',
  }[mathSize];

  // Motion animation variants for swipe transitions
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 250 : -250,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    // Threshold for swipe gesture: 60px
    if (deltaX < -60 && hasNext) {
      onNextExercise();
    } else if (deltaX > 60 && hasPrev) {
      onPrevExercise();
    }
    setTouchStartX(null);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 py-2">
      {/* Floating Swipe Edge Paddles (Left & Right) */}
      {hasPrev && (
        <button
          onClick={onPrevExercise}
          className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-xl border border-slate-200 items-center justify-center transition-all hover:scale-110 active:scale-95 group focus:outline-hidden"
          title="Previous Exercise (←)"
          aria-label="Previous Exercise"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNextExercise}
          className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-xl border border-slate-200 items-center justify-center transition-all hover:scale-110 active:scale-95 group focus:outline-hidden"
          title="Next Exercise (→)"
          aria-label="Next Exercise"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Swipeable Animated Container */}
      <div
        className="w-full touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={section.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              const swipeThreshold = 50;
              if (offset.x < -swipeThreshold || velocity.x < -300) {
                if (hasNext) onNextExercise();
              } else if (offset.x > swipeThreshold || velocity.x > 300) {
                if (hasPrev) onPrevExercise();
              }
            }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            {/* The Compact Exercise Box (One Box for Whole Exercise including All Parts) */}
            <div
              className={`rounded-2xl sm:rounded-3xl border transition-colors p-5 sm:p-8 md:p-10 relative overflow-hidden select-text ${themeClasses.card}`}
            >
              {/* Textbook Top Running Header */}
              <div
                className={`flex flex-wrap items-center justify-between pb-3.5 border-b-2 gap-2 text-xs font-semibold ${themeClasses.header}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono uppercase tracking-wider font-bold">
                    Mathematics 9
                  </span>
                  <span className="text-slate-400">•</span>
                  <span>National Curriculum 2023</span>
                </div>

                <div className="text-center font-bold text-sm tracking-wide flex items-center justify-center gap-2 flex-wrap">
                  <span className="font-serif">Unit {section.unitId}: {section.unitTitle}</span>
                  <span className="font-urdu text-base font-normal opacity-90 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-indigo-700 dark:text-indigo-400">
                    {section.urduTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold">
                    Page {section.pageNumber}
                  </span>
                  <span className="text-slate-400">of 288</span>
                </div>
              </div>

              {/* Notebook Practice Mastery Bar */}
              <div className="mt-3.5 mb-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-600 dark:text-slate-400">Notebook Practice:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    {completedSubpartsInExercise} of {totalSubpartsInExercise} parts solved
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-28 sm:w-44 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          totalSubpartsInExercise > 0
                            ? Math.round((completedSubpartsInExercise / totalSubpartsInExercise) * 100)
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {totalSubpartsInExercise > 0
                      ? Math.round((completedSubpartsInExercise / totalSubpartsInExercise) * 100)
                      : 0}%
                  </span>
                  {completedSubpartsInExercise === totalSubpartsInExercise && totalSubpartsInExercise > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs animate-bounce">
                      ✓ Mastered!
                    </span>
                  )}
                </div>
              </div>

              {/* Box Toolbar: Themes, Math Scale, Formulas, Scratchpad, Print */}
              <div
                className={`my-4 p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2.5 text-xs font-medium ${themeClasses.toolbar}`}
              >
                {/* Exercise Pagination Counter & Bookmark */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleBookmarkExercise(section.id)}
                    className={`p-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                      isBookmarked
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-white/60 dark:bg-slate-700/60 border-slate-300 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700'
                    }`}
                    title={isBookmarked ? 'Bookmarked' : 'Bookmark this exercise'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </span>
                  </button>

                  <div className="text-[11px] font-mono opacity-80 px-2 py-1 rounded bg-black/5 dark:bg-white/5">
                    Exercise {currentIndex + 1} of {totalExercises}
                  </div>
                </div>

                {/* Right controls: Solutions, Formulas, Scratchpad, Size, Theme, Print */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Toggle Solutions Display */}
                  <button
                    onClick={() => setShowAllSolutions((prev) => !prev)}
                    className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors border shadow-2xs ${
                      showAllSolutions
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white/70 dark:bg-slate-700/70 border-slate-300 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                    title="Toggle Display of Complete Step-by-Step Solutions"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{showAllSolutions ? 'Hide Solutions' : 'Show Solutions'}</span>
                  </button>

                  {/* Math Teacher Formula Cheat Sheet */}
                  {section.keyFormulas && section.keyFormulas.length > 0 && (
                    <button
                      onClick={() => setIsFormulaModalOpen(true)}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                      title="Math Teacher's Formula Card"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Formulas</span>
                    </button>
                  )}

                  {/* Student Scratchpad */}
                  <button
                    onClick={() => setIsScratchpadOpen(true)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-slate-700/70 border border-slate-300 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
                    title="Open Rough Work Pad"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Scratchpad</span>
                  </button>

                  {/* Make Test Paper Button */}
                  {onOpenTestMaker && (
                    <button
                      onClick={() => onOpenTestMaker(section.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                      title="Build a printable test or PDF worksheet from this exercise"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Make Test</span>
                    </button>
                  )}

                  {/* Math Size */}
                  <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white/70 dark:bg-slate-700/70">
                    <button
                      onClick={() => setMathSize('compact')}
                      className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                        mathSize === 'compact' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-black/5'
                      }`}
                      title="Compact Math Size"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setMathSize('standard')}
                      className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                        mathSize === 'standard' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-black/5'
                      }`}
                      title="Standard Math Size"
                    >
                      A
                    </button>
                    <button
                      onClick={() => setMathSize('large')}
                      className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                        mathSize === 'large' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-black/5'
                      }`}
                      title="Large Math Size"
                    >
                      A+
                    </button>
                  </div>

                  {/* Themes (Modern, Parchment, Midnight) */}
                  <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white/70 dark:bg-slate-700/70">
                    <button
                      onClick={() => setTheme('modern')}
                      className={`p-1.5 transition-colors ${
                        theme === 'modern' ? 'bg-indigo-600 text-white' : 'hover:bg-black/5'
                      }`}
                      title="Clean White Theme"
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTheme('parchment')}
                      className={`p-1.5 transition-colors ${
                        theme === 'parchment' ? 'bg-amber-700 text-white' : 'hover:bg-black/5'
                      }`}
                      title="Warm Paper / Parchment Theme"
                    >
                      <Coffee className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTheme('midnight')}
                      className={`p-1.5 transition-colors ${
                        theme === 'midnight' ? 'bg-slate-950 text-indigo-400' : 'hover:bg-black/5'
                      }`}
                      title="Midnight Dark Theme"
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Print */}
                  <button
                    onClick={triggerPrint}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    title="Print Exercise Sheet"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Central Official Exercise Badge */}
              <div className="my-6 text-center">
                <div className="inline-block relative">
                  <div
                    className={`px-8 py-2 rounded-full text-base font-extrabold tracking-widest uppercase shadow-xs transition-colors ${themeClasses.badge}`}
                  >
                    ‹‹‹ {section.exerciseId} ›››
                  </div>
                </div>
                <h3 className="mt-2 text-sm md:text-base font-serif font-semibold tracking-wide opacity-90">
                  {section.headline}
                </h3>
              </div>

              {/* Exercise Questions List (All inside this single compact box) */}
              <div className="space-y-8 divide-y divide-black/10 dark:divide-white/10">
                {section.questions.map((q) => {
                  return (
                    <div key={q.id} className="pt-6 first:pt-0 space-y-3.5">
                      {/* Main Question Instruction */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="font-mono font-bold text-sm sm:text-base px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 shrink-0 select-none">
                            Q.{q.questionNumber}
                          </span>
                          <div
                            className={`font-semibold leading-relaxed ${mathScaleClass}`}
                          >
                            <MathView math={q.mainInstruction} />
                          </div>
                        </div>

                        {onToggleTestQuestion && q.subParts && q.subParts.length > 0 && (
                          <button
                            type="button"
                            onClick={() => onToggleTestQuestion(q, section)}
                            className={`px-2 py-1 text-xs rounded-lg font-semibold transition-colors flex items-center gap-1 border shrink-0 ${
                              selectedTestQuestionIds.includes(q.id)
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                            title={
                              selectedTestQuestionIds.includes(q.id)
                                ? 'Remove question from test paper'
                                : 'Add entire question to test paper'
                            }
                          >
                            <FileText className="w-3 h-3" />
                            <span>{selectedTestQuestionIds.includes(q.id) ? 'In Test' : '+ Test'}</span>
                          </button>
                        )}
                      </div>

                      {/* Standalone Question Statement (e.g. Word Problem or Single Equation) */}
                      {q.singleStatementLatex && (
                        <div
                          className={`ml-2 sm:ml-8 p-4 rounded-xl border leading-relaxed font-serif ${mathScaleClass} ${themeClasses.statementBox}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <MathView math={q.singleStatementLatex} block={false} />
                              {q.diagram && (
                                <div className="mt-3">
                                  <MathDiagram diagram={q.diagram} />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {onToggleTestQuestion && (
                                <button
                                  type="button"
                                  onClick={() => onToggleTestQuestion(q, section)}
                                  className={`px-2 py-1 text-xs rounded-lg font-semibold transition-colors flex items-center gap-1 border shrink-0 ${
                                    selectedTestQuestionIds.includes(q.id)
                                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title={
                                    selectedTestQuestionIds.includes(q.id)
                                      ? 'Remove question from test paper'
                                      : 'Add to test paper'
                                  }
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>{selectedTestQuestionIds.includes(q.id) ? 'In Test' : '+ Test'}</span>
                                </button>
                              )}
                              {q.solutionSteps && q.solutionSteps.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveModalItem({
                                      title: `Question ${q.questionNumber}`,
                                      statementLatex: q.singleStatementLatex || '',
                                      hint: q.hint,
                                      solutionSteps: q.solutionSteps,
                                      finalAnswer: q.finalAnswer,
                                      diagram: q.diagram,
                                    })
                                  }
                                  className="px-2.5 py-1 text-xs rounded-lg font-semibold bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-600/20 transition-colors flex items-center gap-1 border border-cyan-500/20"
                                  title="View step-by-step solution"
                                >
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Solution</span>
                                </button>
                              )}
                              <button
                                onClick={() => togglePartCompletion(q.id)}
                                className={`p-1 rounded-lg shrink-0 transition-colors ${
                                  completedParts.includes(q.id)
                                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                }`}
                                title={
                                  completedParts.includes(q.id)
                                    ? 'Marked as completed in notebook'
                                    : 'Mark as completed in notebook'
                                }
                              >
                                {completedParts.includes(q.id) ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <Circle className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Inline Solution Steps for Standalone Question */}
                          <AnimatePresence initial={false}>
                            {(showAllSolutions || expandedSolutionIds.includes(q.id)) && q.solutionSteps && (
                              <motion.div
                                key={`sol-standalone-${q.id}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 space-y-2.5">
                                  <div className="text-[11px] font-mono uppercase tracking-wide font-bold text-cyan-700 dark:text-cyan-400 flex items-center justify-between">
                                    <span>Mathematical Steps:</span>
                                    {q.finalAnswer && (
                                      <span className="font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                                        <span>Ans:</span>
                                        <MathView math={q.finalAnswer} />
                                      </span>
                                    )}
                                  </div>

                                  {/* Embedded Solution Graph & Diagram */}
                                  {q.diagram && (
                                    <div className="my-2 p-2 rounded-xl bg-indigo-50/50 dark:bg-slate-900/50 border border-indigo-200/50 dark:border-indigo-900/40">
                                      <div className="text-[10px] font-mono uppercase font-bold text-indigo-700 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                        <span>Official Solution Graph & Visual Working:</span>
                                      </div>
                                      <MathDiagram diagram={q.diagram} />
                                    </div>
                                  )}

                                  <div className="space-y-2 pl-3 border-l-2 border-indigo-400/40 dark:border-indigo-500/40">
                                    {q.solutionSteps.map((step, sIdx) => (
                                      <div key={sIdx} className="flex items-start gap-2 text-xs group">
                                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold select-none shrink-0 mt-0.5">
                                          S{sIdx + 1}
                                        </span>
                                        <div className="font-serif text-slate-900 dark:text-slate-100 font-medium overflow-x-auto py-0.5">
                                          <MathView math={step} block={false} />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* Diagram for Question with Subparts (e.g. Number Line, Coordinate Plane, Triangle, Circle) */}
                      {q.diagram && (
                        <div className="ml-2 sm:ml-8">
                          <MathDiagram diagram={q.diagram} />
                        </div>
                      )}

                      {/* Compact Subparts Grid (e.g. (i), (ii), (iii), (iv)...) */}
                      {q.subParts && q.subParts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 ml-2 sm:ml-8">
                          {q.subParts.map((part) => {
                            const isDone = completedParts.includes(part.id);
                            const isExpanded = showAllSolutions || expandedSolutionIds.includes(part.id);
                            return (
                              <div
                                key={part.id}
                                className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 select-text ${
                                  isDone ? themeClasses.subpartActive : themeClasses.subpartCard
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2 flex-1 min-w-0">
                                    <span className="font-mono text-xs font-bold shrink-0 opacity-80 mt-0.5">
                                      {part.partLabel}
                                    </span>
                                    <div
                                      className={`font-serif leading-snug break-words ${mathScaleClass}`}
                                    >
                                      <MathView math={part.statementLatex} block={false} />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePartCompletion(part.id);
                                    }}
                                    className={`p-0.5 shrink-0 transition-colors ${
                                      isDone
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
                                    }`}
                                    title={
                                      isDone
                                        ? 'Completed in your notebook (click to unmark)'
                                        : 'Mark as done in your notebook'
                                    }
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                                    ) : (
                                      <Circle className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>

                                {/* Solution controls */}
                                {part.solutionSteps && part.solutionSteps.length > 0 && (
                                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
                                    <button
                                      type="button"
                                      onClick={() => toggleSolutionExpanded(part.id)}
                                      className="text-cyan-700 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                                    >
                                      <Lightbulb className="w-3 h-3 text-amber-500" />
                                      <span>{isExpanded ? 'Hide Steps' : 'Solution'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveModalItem({
                                          title: `Question ${q.questionNumber}`,
                                          partLabel: part.partLabel,
                                          statementLatex: part.statementLatex,
                                          hint: part.hint,
                                          solutionSteps: part.solutionSteps,
                                          finalAnswer: part.finalAnswer,
                                          diagram: part.diagram || q.diagram,
                                        })
                                      }
                                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5"
                                      title="Open in full screen modal"
                                    >
                                      <Maximize2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}

                                {/* Inline Solution Steps */}
                                <AnimatePresence initial={false}>
                                  {isExpanded && part.solutionSteps && (
                                    <motion.div
                                      key={`sol-sub-${part.id}`}
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pt-2 border-t border-cyan-500/20 space-y-2 text-xs">
                                        {/* Embedded Solution Graph / Diagram if present on subpart or question */}
                                        {(part.diagram || q.diagram) && (
                                          <div className="my-1.5 p-1 rounded-lg bg-indigo-50/60 dark:bg-slate-900/60 border border-indigo-200/60 dark:border-indigo-900/40">
                                            <div className="text-[9.5px] font-mono uppercase font-bold text-indigo-700 dark:text-indigo-300 mb-0.5 flex items-center gap-1">
                                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                              <span>Solution Graph & Illustration:</span>
                                            </div>
                                            <MathDiagram diagram={part.diagram || q.diagram!} compact />
                                          </div>
                                        )}

                                        <div className="space-y-1.5 pl-2.5 border-l-2 border-cyan-500/40">
                                          {part.solutionSteps.map((step, sIdx) => (
                                            <div key={sIdx} className="flex items-start gap-1.5 py-0.5 group">
                                              <span className="font-mono text-[9px] px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold select-none shrink-0 mt-0.5">
                                                S{sIdx + 1}
                                              </span>
                                              <div className="font-serif text-slate-900 dark:text-slate-100 font-medium overflow-x-auto py-0.5">
                                                <MathView math={step} block={false} />
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                        {part.finalAnswer && (
                                          <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-between gap-1.5">
                                            <span className="opacity-75 shrink-0">Ans:</span>
                                            <span className="font-serif overflow-x-auto text-right">
                                              <MathView math={part.finalAnswer} />
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Box Footer: Running Footer & Student Notebook Checklist Progress */}
              <div
                className={`mt-10 pt-4 border-t-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${themeClasses.footer}`}
              >
                <div>
                  <span className="font-bold">PESRP</span> • Punjab Curriculum & Textbook Board
                </div>

                {/* Progress in Notebook */}
                <div className="flex items-center gap-2 font-sans font-medium text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>
                    Notebook Practice: <strong>{completedSubpartsInExercise}</strong> /{' '}
                    {totalSubpartsInExercise} parts solved
                  </span>
                </div>

                <div className="font-bold">
                  Page {section.pageNumber}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Swipe Pagination Bar & Quick Arrows */}
      <div className="mt-4 flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={onPrevExercise}
          disabled={!hasPrev}
          className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Exercise</span>
        </button>

        <div className="text-center font-mono text-xs text-slate-500">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {currentIndex + 1}
          </span>{' '}
          / {totalExercises}
          <div className="text-[10px] text-slate-400 font-sans hidden sm:flex items-center gap-1.5 justify-center mt-0.5">
            <span>Keys:</span>
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[9px]">← →</kbd>
            <span>flip</span>
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[9px]">S</kbd>
            <span>solutions</span>
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[9px]">D</kbd>
            <span>scratchpad</span>
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[9px]">F</kbd>
            <span>formulas</span>
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[9px]">⌘K</kbd>
            <span>search</span>
          </div>
        </div>

        <button
          onClick={onNextExercise}
          disabled={!hasNext}
          className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
        >
          <span>Next Exercise</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modals & Drawers */}
      <ScratchpadDrawer
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        exerciseTitle={`${section.exerciseId}: ${section.headline}`}
      />

      <FormulaSheetModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        unitId={section.unitId}
        unitTitle={section.unitTitle}
        urduTitle={section.urduTitle}
        formulas={section.keyFormulas || []}
      />

      <SolutionModal
        isOpen={activeModalItem !== null}
        onClose={() => setActiveModalItem(null)}
        title={activeModalItem?.title || ''}
        partLabel={activeModalItem?.partLabel}
        statementLatex={activeModalItem?.statementLatex || ''}
        hint={activeModalItem?.hint}
        solutionSteps={activeModalItem?.solutionSteps}
        finalAnswer={activeModalItem?.finalAnswer}
        diagram={activeModalItem?.diagram}
      />
    </div>
  );
};
