import React, { useState, useMemo, useRef } from 'react';
import {
  X,
  Printer,
  FileDown,
  Check,
  Plus,
  Trash2,
  Settings2,
  Eye,
  Layers,
  Sparkles,
  BookOpen,
  HelpCircle,
  Shuffle,
  ChevronDown,
  Grid,
  Columns,
  Maximize2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Minimize2,
} from 'lucide-react';
import { BOOK_EXERCISES, BookExerciseSection, BookQuestion } from '../data/bookExercises';
import { MathView } from './MathView';
import { MathDiagram } from './MathDiagram';

export interface SelectedTestItem {
  sectionId: string;
  exerciseId: string;
  unitId: number;
  unitTitle: string;
  question: BookQuestion;
  marks: number;
}

interface TestMakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExerciseId?: string;
  selectedItems: SelectedTestItem[];
  onToggleItem: (item: SelectedTestItem) => void;
  onClearItems: () => void;
  onSelectMultiple: (items: SelectedTestItem[]) => void;
}

export const TestMakerModal: React.FC<TestMakerModalProps> = ({
  isOpen,
  onClose,
  initialExerciseId,
  selectedItems,
  onToggleItem,
  onClearItems,
  onSelectMultiple,
}) => {
  // Test Paper Configurations
  const [pageSize, setPageSize] = useState<'a4' | 'legal'>('a4');
  const [layoutMode, setLayoutMode] = useState<'ultra-compact' | 'compact' | 'standard' | 'workspace'>('compact');
  const [columns, setColumns] = useState<1 | 2>(1);
  const [includeSolutions, setIncludeSolutions] = useState(false);
  const [includeDiagrams, setIncludeDiagrams] = useState(true);

  // Institution / Header Details
  const [instituteName, setInstituteName] = useState('PUNJAB CURRICULUM & TEXTBOOK ACADEMY');
  const [testTitle, setTestTitle] = useState('CLASS 9TH MATHEMATICS · CHAPTER TEST');
  const [timeAllowed, setTimeAllowed] = useState('45 Minutes');
  const [customInstructions, setCustomInstructions] = useState('Attempt all questions. Show complete steps and rough work.');

  // Selection Drawer Filter
  const [activeUnitFilter, setActiveUnitFilter] = useState<number>(() => {
    if (initialExerciseId) {
      const found = BOOK_EXERCISES.find((e) => e.id === initialExerciseId);
      if (found) return found.unitId;
    }
    return 1;
  });

  const [activeExerciseFilter, setActiveExerciseFilter] = useState<string>(() => {
    return initialExerciseId || BOOK_EXERCISES[0]?.id || '';
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'picker'>('preview');

  // Print ref
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  // Exercises in selected unit
  const exercisesInUnit = useMemo(() => {
    return BOOK_EXERCISES.filter((e) => e.unitId === activeUnitFilter);
  }, [activeUnitFilter]);

  const currentExerciseSection = useMemo(() => {
    return (
      BOOK_EXERCISES.find((e) => e.id === activeExerciseFilter) ||
      exercisesInUnit[0] ||
      BOOK_EXERCISES[0]
    );
  }, [activeExerciseFilter, exercisesInUnit]);

  // Total calculated marks
  const totalMarks = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + (item.marks || 4), 0);
  }, [selectedItems]);

  const isItemSelected = (questionId: string) => {
    return selectedItems.some((item) => item.question.id === questionId);
  };

  const handleSelectAllCurrentExercise = () => {
    const toAdd: SelectedTestItem[] = [];
    currentExerciseSection.questions.forEach((q) => {
      if (!isItemSelected(q.id)) {
        toAdd.push({
          sectionId: currentExerciseSection.id,
          exerciseId: currentExerciseSection.exerciseId,
          unitId: currentExerciseSection.unitId,
          unitTitle: currentExerciseSection.unitTitle,
          question: q,
          marks: q.subParts ? q.subParts.length * 2 : 4,
        });
      }
    });
    if (toAdd.length > 0) {
      onSelectMultiple(toAdd);
    }
  };

  const handleRandomSample = (count: number) => {
    const available = currentExerciseSection.questions.filter((q) => !isItemSelected(q.id));
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, count).map((q) => ({
      sectionId: currentExerciseSection.id,
      exerciseId: currentExerciseSection.exerciseId,
      unitId: currentExerciseSection.unitId,
      unitTitle: currentExerciseSection.unitTitle,
      question: q,
      marks: q.subParts ? q.subParts.length * 2 : 4,
    }));
    if (picked.length > 0) {
      onSelectMultiple(picked);
    }
  };

  // Estimate page fit score
  const pageFitEstimate = useMemo(() => {
    let score = 0;
    selectedItems.forEach((item) => {
      score += 10; // base question score
      if (item.question.subParts) {
        score += item.question.subParts.length * (columns === 2 ? 3 : 5);
      }
      if (includeDiagrams && item.question.diagram) {
        score += 15;
      }
      if (layoutMode === 'workspace') {
        score += 20;
      }
    });

    const singlePageLimit =
      pageSize === 'legal'
        ? (layoutMode === 'ultra-compact' ? 120 : layoutMode === 'compact' ? 85 : 55)
        : (layoutMode === 'ultra-compact' ? 95 : layoutMode === 'compact' ? 68 : 45);

    const fitsOnOnePage = score <= singlePageLimit;
    const estimatedPages = Math.max(1, Math.ceil(score / singlePageLimit));

    return {
      score,
      singlePageLimit,
      fitsOnOnePage,
      estimatedPages,
    };
  }, [selectedItems, layoutMode, pageSize, columns, includeDiagrams]);

  // Browser Print trigger with dynamic @page styling
  const handlePrint = () => {
    const styleId = 'test-maker-page-size-style';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent =
      pageSize === 'legal'
        ? `@page { size: 8.5in 14in portrait; margin: 8mm 10mm 8mm 10mm; }`
        : `@page { size: A4 portrait; margin: 8mm 10mm 8mm 10mm; }`;

    document.body.classList.add('is-printing-test');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('is-printing-test');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      id="test-maker-modal-root"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl max-w-6xl w-full h-[95vh] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Top App Header (test-maker-chrome is hidden during print) */}
        <div className="test-maker-chrome p-3.5 sm:p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 text-cyan-300 flex items-center justify-center border border-indigo-400/40">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  PDF Test Paper & Worksheet Maker
                </span>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full font-mono font-bold">
                  {selectedItems.length} Questions Selected
                </span>
                {/* Single Page Fit Badge */}
                {selectedItems.length > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1 ${
                      pageFitEstimate.fitsOnOnePage
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                    }`}
                  >
                    {pageFitEstimate.fitsOnOnePage ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Fits 1 Page</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        <span>Est. {pageFitEstimate.estimatedPages} Pages</span>
                      </>
                    )}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-extrabold flex items-center gap-2">
                <span>Class 9 Mathematics Exam Builder</span>
                <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                  (Punjab Curriculum & Board Pattern)
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={selectedItems.length === 0}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
              title="Print or Save as PDF with exact A4/Legal page dimensions"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar: Paper Options & Settings (test-maker-chrome hidden in print) */}
        <div className="test-maker-chrome px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          {/* Left: View Mode Tabs */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Print Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('picker')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'picker'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Select Questions ({selectedItems.length})</span>
            </button>
          </div>

          {/* Right: Layout & Page Size Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Page Size Selection (A4 vs Legal) */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Page Type:</span>
              <button
                onClick={() => setPageSize('a4')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors ${
                  pageSize === 'a4'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="A4 Standard Sheet (210 × 297 mm)"
              >
                A4 (Standard)
              </button>
              <button
                onClick={() => setPageSize('legal')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors ${
                  pageSize === 'legal'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Legal Sheet (8.5 × 14 in / 216 × 356 mm) - Longer Page for Fitting Many Questions"
              >
                Legal (Long)
              </button>
            </div>

            {/* Density / Spacing Mode */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Spacing:</span>
              <button
                onClick={() => setLayoutMode('ultra-compact')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  layoutMode === 'ultra-compact'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Fit many questions on one page (Ultra-dense layout)"
              >
                Fit 1 Page (Dense)
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  layoutMode === 'compact'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Compact multi-question layout"
              >
                Compact
              </button>
              <button
                onClick={() => setLayoutMode('standard')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  layoutMode === 'standard'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Standard board exam layout"
              >
                Standard
              </button>
              <button
                onClick={() => setLayoutMode('workspace')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  layoutMode === 'workspace'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Includes blank ruled lines for student answers"
              >
                Working Space
              </button>
            </div>

            {/* Column Layout */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Cols:</span>
              <button
                onClick={() => setColumns(1)}
                className={`p-1 rounded text-[11px] font-bold ${
                  columns === 1 ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
                title="Single Column"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setColumns(2)}
                className={`p-1 rounded text-[11px] font-bold ${
                  columns === 2 ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
                title="2 Columns (Fits 2x more questions per page)"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Diagrams Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 select-none shadow-2xs">
              <input
                type="checkbox"
                checked={includeDiagrams}
                onChange={(e) => setIncludeDiagrams(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-[11px]">Diagrams</span>
            </label>

            {/* Solutions Checkbox */}
            <label className="flex items-center gap-1.5 cursor-pointer bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 select-none shadow-2xs">
              <input
                type="checkbox"
                checked={includeSolutions}
                onChange={(e) => setIncludeSolutions(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-[11px]">Solution Key</span>
            </label>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* TAB 1: Question Picker Drawer (Sidebar on desktop, full view when active) */}
          <div
            className={`test-maker-picker w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col shrink-0 ${
              activeTab === 'picker' ? 'flex flex-1' : 'hidden md:flex'
            }`}
          >
            {/* Picker Header & Filters */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-500">
                  Select Unit & Exercise
                </span>
                {selectedItems.length > 0 && (
                  <button
                    onClick={onClearItems}
                    className="text-[11px] text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Unit Dropdown */}
              <div className="space-y-1">
                <select
                  value={activeUnitFilter}
                  onChange={(e) => {
                    const uId = parseInt(e.target.value, 10);
                    setActiveUnitFilter(uId);
                    const firstEx = BOOK_EXERCISES.find((ex) => ex.unitId === uId);
                    if (firstEx) setActiveExerciseFilter(firstEx.id);
                  }}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                >
                  {Array.from({ length: 13 }, (_, i) => i + 1).map((uId) => {
                    const firstEx = BOOK_EXERCISES.find((ex) => ex.unitId === uId);
                    return (
                      <option key={uId} value={uId}>
                        Unit {uId}: {firstEx?.unitTitle || `Unit ${uId}`}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Exercise Pills in this unit */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
                {exercisesInUnit.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExerciseFilter(ex.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors ${
                      activeExerciseFilter === ex.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {ex.exerciseId}
                  </button>
                ))}
              </div>

              {/* Quick Actions for Exercise */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                <button
                  onClick={handleSelectAllCurrentExercise}
                  className="py-1 px-2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 font-semibold hover:bg-indigo-100 transition-colors text-center"
                >
                  Add All ({currentExerciseSection.questions.length} Qs)
                </button>
                <button
                  onClick={() => handleRandomSample(4)}
                  className="py-1 px-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 font-semibold transition-colors text-center flex items-center justify-center gap-1"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Pick 4 Random</span>
                </button>
              </div>
            </div>

            {/* Questions List for Current Exercise */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                {currentExerciseSection.exerciseId} · Questions
              </div>

              {currentExerciseSection.questions.map((q) => {
                const selected = isItemSelected(q.id);
                return (
                  <div
                    key={q.id}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      selected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1">
                          <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono text-[10px]">
                            {q.questionNumber}
                          </span>
                          <span className="line-clamp-1">{q.mainInstruction}</span>
                        </div>

                        {q.singleStatementLatex && (
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono line-clamp-2 pl-6">
                            <MathView math={q.singleStatementLatex} block={false} />
                          </div>
                        )}

                        {q.subParts && (
                          <div className="pl-6 text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2 mt-1">
                            <span>{q.subParts.length} Sub-parts</span>
                            {q.diagram && (
                              <span className="px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold text-[9px]">
                                With Diagram
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          onToggleItem({
                            sectionId: currentExerciseSection.id,
                            exerciseId: currentExerciseSection.exerciseId,
                            unitId: currentExerciseSection.unitId,
                            unitTitle: currentExerciseSection.unitTitle,
                            question: q,
                            marks: q.subParts ? q.subParts.length * 2 : 4,
                          })
                        }
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1 shrink-0 ${
                          selected
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {selected ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TAB 2: Live Print Preview Area */}
          <div className="flex-1 overflow-y-auto bg-slate-200/70 dark:bg-slate-950/80 p-3 sm:p-6 flex flex-col items-center">
            {selectedItems.length === 0 ? (
              <div className="my-auto text-center max-w-sm p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    No Questions Added to Test Paper Yet
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Select questions from exercises across any of the 13 units to compose your custom printable exam sheet or worksheet PDF.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setActiveTab('picker')}
                    className="w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors cursor-pointer"
                  >
                    Browse & Pick Questions
                  </button>
                  <button
                    onClick={handleSelectAllCurrentExercise}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Add All Questions from {currentExerciseSection.exerciseId}
                  </button>
                </div>
              </div>
            ) : (
              /* Actual Printable Test Sheet Container */
              <div
                ref={printAreaRef}
                id="test-printable-sheet"
                className={`bg-white text-slate-950 shadow-2xl transition-all duration-200 ${
                  pageSize === 'legal'
                    ? 'w-[216mm] min-h-[356mm]'
                    : 'w-[210mm] min-h-[297mm]'
                } ${
                  layoutMode === 'ultra-compact'
                    ? 'p-[8mm_10mm]'
                    : layoutMode === 'compact'
                    ? 'p-[10mm_12mm]'
                    : 'p-[14mm_16mm]'
                } border border-slate-300 rounded-xs font-sans flex flex-col justify-between`}
                style={{
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  {/* Test Header */}
                  <div className={`border-b-2 border-slate-900 ${layoutMode === 'ultra-compact' ? 'pb-2 mb-2.5' : 'pb-3 mb-4'}`}>
                    <div className="text-center space-y-0.5">
                      {/* Institution Name */}
                      <input
                        type="text"
                        value={instituteName}
                        onChange={(e) => setInstituteName(e.target.value)}
                        className="w-full text-center text-sm sm:text-base font-black uppercase tracking-wider text-slate-950 border-none focus:outline-hidden bg-transparent"
                        placeholder="ENTER INSTITUTION NAME"
                      />
                      <input
                        type="text"
                        value={testTitle}
                        onChange={(e) => setTestTitle(e.target.value)}
                        className="w-full text-center text-xs sm:text-sm font-extrabold uppercase text-slate-800 border-none focus:outline-hidden bg-transparent"
                        placeholder="ENTER TEST TITLE"
                      />
                    </div>

                    {/* Metadata Grid (Student Info, Marks, Time) */}
                    <div className="mt-2 pt-1.5 border-t border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px] font-mono">
                      <div>
                        <span className="font-bold">Student Name:</span> _________________
                      </div>
                      <div>
                        <span className="font-bold">Roll No:</span> _____________
                      </div>
                      <div>
                        <span className="font-bold">Time Allowed:</span>{' '}
                        <input
                          type="text"
                          value={timeAllowed}
                          onChange={(e) => setTimeAllowed(e.target.value)}
                          className="w-20 inline font-mono font-bold text-slate-800 bg-transparent border-none focus:outline-hidden"
                        />
                      </div>
                      <div className="text-right">
                        <span className="font-bold">Total Marks:</span>{' '}
                        <span className="bg-black text-white px-1.5 py-0.2 rounded font-bold">
                          {totalMarks}
                        </span>
                      </div>
                    </div>

                    {/* Instructions Line */}
                    <div className="mt-1 text-[9.5px] font-sans italic text-slate-600 flex items-center justify-between">
                      <span>{customInstructions}</span>
                      <span className="font-mono text-[9px] uppercase font-bold text-slate-500">
                        Page Type: {pageSize.toUpperCase()} ({columns} Col · {layoutMode.toUpperCase()})
                      </span>
                    </div>
                  </div>

                  {/* Questions Section */}
                  <div
                    className={`${
                      columns === 2
                        ? 'grid grid-cols-2 gap-x-5 gap-y-2.5'
                        : layoutMode === 'ultra-compact'
                        ? 'space-y-2'
                        : layoutMode === 'compact'
                        ? 'space-y-3'
                        : 'space-y-4'
                    }`}
                  >
                    {selectedItems.map((item, idx) => {
                      const q = item.question;
                      const qNum = idx + 1;

                      return (
                        <div
                          key={`${item.sectionId}-${q.id}`}
                          className={`break-inside-avoid ${
                            layoutMode === 'ultra-compact'
                              ? 'py-1'
                              : layoutMode === 'compact'
                              ? 'py-1.5'
                              : 'py-2.5'
                          } border-b border-dashed border-slate-200 last:border-none`}
                        >
                          {/* Question Number & Main Instruction */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-1.5">
                              <span className="font-bold text-xs sm:text-sm font-serif shrink-0">
                                Q.{qNum}.
                              </span>
                              <div className="font-serif text-xs sm:text-sm font-semibold leading-relaxed">
                                <MathView math={q.mainInstruction} />
                              </div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-600 shrink-0">
                              [{item.marks} Marks]
                            </span>
                          </div>

                          {/* Statement if single question */}
                          {q.singleStatementLatex && (
                            <div className="pl-5 pt-0.5 font-serif text-xs leading-relaxed font-medium">
                              <MathView math={q.singleStatementLatex} block={false} />
                            </div>
                          )}

                          {/* Subparts */}
                          {q.subParts && q.subParts.length > 0 && (
                            <div
                              className={`pl-5 pt-1 grid ${
                                columns === 2 || q.subParts.length <= 2
                                  ? 'grid-cols-1 gap-1'
                                  : layoutMode === 'ultra-compact'
                                  ? 'grid-cols-3 gap-x-3 gap-y-1'
                                  : 'grid-cols-2 gap-x-4 gap-y-1'
                              }`}
                            >
                              {q.subParts.map((sp) => (
                                <div key={sp.id} className="text-xs font-serif">
                                  <div className="flex items-start gap-1.5">
                                    <span className="font-mono text-[10.5px] font-bold shrink-0 text-slate-800">
                                      {sp.partLabel}
                                    </span>
                                    <div className="leading-snug">
                                      <MathView math={sp.statementLatex} block={false} />
                                    </div>
                                  </div>
                                  {includeDiagrams && sp.diagram && (
                                    <div className="pl-4 pt-1 max-w-[210px]">
                                      <MathDiagram diagram={sp.diagram} compact />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Diagram if present */}
                          {includeDiagrams && q.diagram && (
                            <div className={`pl-5 pt-1.5 ${layoutMode === 'ultra-compact' ? 'max-w-[210px]' : 'max-w-xs'}`}>
                              <MathDiagram diagram={q.diagram} compact />
                            </div>
                          )}

                          {/* Working Lines if workspace mode enabled */}
                          {layoutMode === 'workspace' && (
                            <div className="mt-2 pl-5 space-y-2 opacity-30 select-none">
                              <div className="border-b border-dashed border-slate-400 h-3.5" />
                              <div className="border-b border-dashed border-slate-400 h-3.5" />
                              <div className="border-b border-dashed border-slate-400 h-3.5" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Attached Solution Key */}
                {includeSolutions && (
                  <div className="mt-6 pt-4 border-t-2 border-slate-800 page-break-before">
                    <div className="text-center mb-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                        OFFICIAL ANSWER KEY & STEP-BY-STEP SOLUTIONS
                      </h4>
                      <p className="text-[10px] text-slate-500 font-sans">
                        For Teacher Verification and Self-Correction
                      </p>
                    </div>

                    <div className="space-y-3 text-xs font-serif">
                      {selectedItems.map((item, idx) => {
                        const q = item.question;
                        return (
                          <div key={`sol-${item.sectionId}-${q.id}`} className="p-2.5 bg-slate-50 rounded border border-slate-200">
                            <div className="font-mono text-[11px] font-bold text-slate-800 mb-1 flex items-center justify-between">
                              <span>Solution Q.{idx + 1} ({item.exerciseId})</span>
                              {q.finalAnswer && (
                                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono text-[10px]">
                                  Ans: <MathView math={q.finalAnswer} />
                                </span>
                              )}
                            </div>

                            {q.solutionSteps && (
                              <div className="space-y-0.5 pl-2 border-l border-slate-300">
                                {q.solutionSteps.map((s, sIdx) => (
                                  <div key={sIdx} className="text-[10.5px]">
                                    <MathView math={s} />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Embedded Diagram in Answer Key */}
                            {includeDiagrams && q.diagram && (
                              <div className="my-1.5 max-w-[220px]">
                                <div className="text-[9px] font-mono font-bold text-indigo-700 uppercase mb-0.5">
                                  Solution Graph / Diagram:
                                </div>
                                <MathDiagram diagram={q.diagram} compact />
                              </div>
                            )}

                            {q.subParts && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1.5">
                                {q.subParts.map((sp) => (
                                  <div key={sp.id} className="text-[10px] bg-white p-1.5 rounded border border-slate-200">
                                    <div className="flex items-center justify-between mb-0.5">
                                      <span className="font-mono font-bold mr-1">{sp.partLabel}</span>
                                      {sp.finalAnswer ? (
                                        <span className="font-bold text-emerald-700">
                                          <MathView math={sp.finalAnswer} />
                                        </span>
                                      ) : (
                                        <span>Refer to solution</span>
                                      )}
                                    </div>
                                    {includeDiagrams && sp.diagram && (
                                      <div className="mt-1 max-w-[200px]">
                                        <MathDiagram diagram={sp.diagram} compact />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Paper Footer */}
                <div className="mt-4 pt-2 border-t border-slate-300 flex items-center justify-between text-[9px] font-mono text-slate-500">
                  <span>Punjab Curriculum and Textbook Board (PCTB) · Class 9 Mathematics</span>
                  <span>End of Test Paper · Best of Luck!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
