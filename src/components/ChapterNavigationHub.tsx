import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BookExerciseSection } from '../data/bookExercises';
import { UNITS_DATA } from '../data/textbookData';
import {
  Hash,
  Calculator,
  Layers,
  Binary,
  TrendingUp,
  Compass,
  Grid,
  GitFork,
  Boxes,
  LineChart,
  PenTool,
  BarChart2,
  Dices,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bookmark,
  CheckCircle2,
  BookMarked,
  HelpCircle,
  Award,
  Zap,
} from 'lucide-react';

interface ChapterNavigationHubProps {
  exercises: BookExerciseSection[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  bookmarkedExerciseIds: string[];
}

export const ChapterNavigationHub: React.FC<ChapterNavigationHubProps> = ({
  exercises,
  currentIndex,
  onSelectIndex,
  bookmarkedExerciseIds,
}) => {
  const currentSection = exercises[currentIndex] || exercises[0];
  const activeUnitId = currentSection.unitId;

  // Selected category filter tab
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'algebra' | 'geometry' | 'stats'>('all');
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);

  const chapterPillsRef = useRef<HTMLDivElement | null>(null);

  // Group exercises by unitId
  const unitExercisesMap = useMemo(() => {
    const map = new Map<number, { firstIndex: number; exercises: { section: BookExerciseSection; index: number }[] }>();
    exercises.forEach((ex, idx) => {
      if (!map.has(ex.unitId)) {
        map.set(ex.unitId, { firstIndex: idx, exercises: [] });
      }
      map.get(ex.unitId)!.exercises.push({ section: ex, index: idx });
    });
    return map;
  }, [exercises]);

  // Categories
  const categories = [
    { id: 'all', label: 'All 13 Units', count: 13 },
    { id: 'algebra', label: 'Algebra & Numbers', count: 5, unitIds: [1, 2, 3, 4, 5] },
    { id: 'geometry', label: 'Geometry & Trig', count: 5, unitIds: [6, 7, 9, 10, 11] },
    { id: 'stats', label: 'Logic & Stats', count: 3, unitIds: [8, 12, 13] },
  ];

  // Filtered units based on category
  const filteredUnits = useMemo(() => {
    if (selectedCategory === 'all') return UNITS_DATA;
    const cat = categories.find((c) => c.id === selectedCategory);
    if (!cat?.unitIds) return UNITS_DATA;
    return UNITS_DATA.filter((u) => cat.unitIds.includes(u.id));
  }, [selectedCategory]);

  // Scroll active unit into view
  useEffect(() => {
    if (!chapterPillsRef.current) return;
    const activeEl = chapterPillsRef.current.querySelector<HTMLElement>(`[data-unit-id="${activeUnitId}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeUnitId]);

  const getUnitIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4 shrink-0' };
    switch (iconName) {
      case 'Hash': return <Hash {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Binary': return <Binary {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Grid': return <Grid {...props} />;
      case 'GitFork': return <GitFork {...props} />;
      case 'Boxes': return <Boxes {...props} />;
      case 'LineChart': return <LineChart {...props} />;
      case 'PenTool': return <PenTool {...props} />;
      case 'BarChart2': return <BarChart2 {...props} />;
      case 'Dices': return <Dices {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  const handleSelectUnit = (unitId: number) => {
    const data = unitExercisesMap.get(unitId);
    if (data) {
      onSelectIndex(data.firstIndex);
    }
  };

  const handlePrevChapter = () => {
    const currentUnitIdx = UNITS_DATA.findIndex((u) => u.id === activeUnitId);
    if (currentUnitIdx > 0) {
      const prevUnit = UNITS_DATA[currentUnitIdx - 1];
      handleSelectUnit(prevUnit.id);
    }
  };

  const handleNextChapter = () => {
    const currentUnitIdx = UNITS_DATA.findIndex((u) => u.id === activeUnitId);
    if (currentUnitIdx < UNITS_DATA.length - 1) {
      const nextUnit = UNITS_DATA[currentUnitIdx + 1];
      handleSelectUnit(nextUnit.id);
    }
  };

  const currentUnitInfo = UNITS_DATA.find((u) => u.id === activeUnitId) || UNITS_DATA[0];
  const exercisesInCurrentUnit = unitExercisesMap.get(activeUnitId)?.exercises || [];

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 mb-4 space-y-2.5">
      {/* 1. Category Filter Strand */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 shrink-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs scale-102'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Streak & Completion Motivator */}
        <div className="hidden sm:flex items-center gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>100% Solved Exercises</span>
          </div>
        </div>
      </div>

      {/* 2. Chapters Carousel (Units 1 to 13) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs">
        <div
          ref={chapterPillsRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredUnits.map((unit) => {
            const isActive = unit.id === activeUnitId;
            const exCount = unitExercisesMap.get(unit.id)?.exercises.length || 0;

            return (
              <button
                key={unit.id}
                data-unit-id={unit.id}
                onClick={() => handleSelectUnit(unit.id)}
                className={`px-3 py-2 rounded-xl text-left shrink-0 transition-all flex items-center gap-2.5 group relative focus:outline-hidden ${
                  isActive
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500/30'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                }`}>
                  {getUnitIcon(unit.iconName)}
                </div>
                <div className="pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase opacity-80">
                      Unit {unit.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] px-1 rounded font-mono bg-black/10 dark:bg-white/10 opacity-75">
                      {exCount} ex
                    </span>
                  </div>
                  <div className="text-xs font-bold whitespace-nowrap group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
                    {unit.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Chapter Hero Bar with Exercise Pills */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-4 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          {/* Unit Title and Urdu Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-cyan-300 flex items-center justify-center border border-indigo-400/30 shadow-inner">
              {getUnitIcon(currentUnitInfo.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  Chapter {currentUnitInfo.id.toString().padStart(2, '0')}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-urdu" dir="rtl">
                  {currentUnitInfo.urduName}
                </span>
                <span className="hidden md:inline-flex text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded-full font-mono font-semibold">
                  Board Curriculum 2024
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{currentUnitInfo.name}</span>
                <span className="text-xs font-normal text-slate-400 font-sans">
                  ({exercisesInCurrentUnit.length} Exercises)
                </span>
              </h2>
            </div>
          </div>

          {/* Chapter Prev / Next Quick Controls */}
          <div className="flex items-center gap-1.5 self-end sm:self-center">
            <button
              onClick={handlePrevChapter}
              disabled={activeUnitId === 1}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-slate-200 transition-colors flex items-center gap-1 text-xs"
              title="Previous Chapter"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline font-mono">U{(activeUnitId - 1).toString().padStart(2, '0')}</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400 px-1">
              {activeUnitId} / 13
            </span>
            <button
              onClick={handleNextChapter}
              disabled={activeUnitId === 13}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-slate-200 transition-colors flex items-center gap-1 text-xs"
              title="Next Chapter"
            >
              <span className="hidden md:inline font-mono">U{(activeUnitId + 1).toString().padStart(2, '0')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. Active Chapter Exercise Pills (e.g. Ex 1.1, Ex 1.2, Ex 1.3, Review 1) */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide mr-1 font-semibold">
            Section:
          </span>
          {exercisesInCurrentUnit.map(({ section, index }) => {
            const isCurrent = index === currentIndex;
            const isBookmarked = bookmarkedExerciseIds.includes(section.id);
            const questionCount = section.questions.length;

            return (
              <button
                key={section.id}
                onClick={() => onSelectIndex(index)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-hidden ${
                  isCurrent
                    ? 'bg-cyan-400 text-slate-950 shadow-md scale-102 ring-2 ring-cyan-300/50'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                }`}
              >
                <span>{section.exerciseId}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isCurrent ? 'bg-slate-950/20 text-slate-900 font-bold' : 'bg-black/20 text-slate-300'
                }`}>
                  {questionCount}Q
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
