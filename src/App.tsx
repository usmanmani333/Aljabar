import React, { useState, useEffect, useMemo } from 'react';
import { BOOK_EXERCISES, BookExerciseSection } from './data/bookExercises';
import { CompactExerciseBox } from './components/CompactExerciseBox';
import { ChapterNavigationHub } from './components/ChapterNavigationHub';
import { TopNavigation } from './components/TopNavigation';
import { TableOfContentsModal } from './components/TableOfContentsModal';
import { CurriculumOverview } from './components/CurriculumOverview';
import { LogTableLookupModal } from './components/visualizers/LogTableLookupModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { TestMakerModal, SelectedTestItem } from './components/TestMakerModal';
import { Bookmark, ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';

const STORAGE_KEY_EXERCISE_BOOKMARKS = 'aljabr_bookmarked_exercises';
const STORAGE_KEY_LAST_EXERCISE_INDEX = 'aljabr_last_exercise_index';
const STORAGE_KEY_TEST_ITEMS = 'aljabr_selected_test_items';

export default function App() {
  const [activeView, setActiveView] = useState<'book' | 'curriculum'>('book');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LAST_EXERCISE_INDEX);
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val) && val >= 0 && val < BOOK_EXERCISES.length) {
          return val;
        }
      }
    } catch {
      // fallback
    }
    return 0;
  });

  const [direction, setDirection] = useState<number>(1);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const [bookmarkedExerciseIds, setBookmarkedExerciseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EXERCISE_BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isTestMakerOpen, setIsTestMakerOpen] = useState(false);
  const [selectedTestItems, setSelectedTestItems] = useState<SelectedTestItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TEST_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LAST_EXERCISE_INDEX, currentIndex.toString());
    } catch (e) {
      console.warn(e);
    }
  }, [currentIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXERCISE_BOOKMARKS, JSON.stringify(bookmarkedExerciseIds));
    } catch (e) {
      console.warn(e);
    }
  }, [bookmarkedExerciseIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEST_ITEMS, JSON.stringify(selectedTestItems));
    } catch (e) {
      console.warn(e);
    }
  }, [selectedTestItems]);

  const currentSection: BookExerciseSection = BOOK_EXERCISES[currentIndex] || BOOK_EXERCISES[0];

  const handleToggleTestItem = (item: SelectedTestItem) => {
    setSelectedTestItems((prev) => {
      const exists = prev.some((p) => p.question.id === item.question.id);
      if (exists) {
        return prev.filter((p) => p.question.id !== item.question.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleToggleTestQuestion = (question: any, section: BookExerciseSection) => {
    handleToggleTestItem({
      sectionId: section.id,
      exerciseId: section.exerciseId,
      unitId: section.unitId,
      unitTitle: section.unitTitle,
      question,
      marks: question.subParts ? question.subParts.length * 2 : 4,
    });
  };

  const handleSelectMultipleTestItems = (items: SelectedTestItem[]) => {
    setSelectedTestItems((prev) => {
      const newItems = items.filter((item) => !prev.some((p) => p.question.id === item.question.id));
      return [...prev, ...newItems];
    });
  };

  const handleClearTestItems = () => {
    setSelectedTestItems([]);
  };

  const selectedTestQuestionIds = useMemo(() => {
    return selectedTestItems.map((item) => item.question.id);
  }, [selectedTestItems]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < BOOK_EXERCISES.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSelectIndex = (newIndex: number) => {
    if (newIndex !== currentIndex) {
      setDirection(newIndex > currentIndex ? 1 : -1);
      setCurrentIndex(newIndex);
    }
  };

  const handleToggleBookmarkExercise = (exerciseId: string) => {
    setBookmarkedExerciseIds((prev) =>
      prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId]
    );
  };

  const handleRandomExercise = () => {
    const randomIndex = Math.floor(Math.random() * BOOK_EXERCISES.length);
    handleSelectIndex(randomIndex);
    setActiveView('book');
  };

  const handleSelectUnitFromCurriculum = (unitId: number) => {
    const targetIdx = BOOK_EXERCISES.findIndex((ex) => ex.unitId === unitId);
    if (targetIdx !== -1) {
      handleSelectIndex(targetIdx);
    }
    setActiveView('book');
  };

  // Global keyboard shortcuts (Cmd+K / / to open search)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors flex flex-col">
      {/* Top Bar */}
      <TopNavigation
        activeView={activeView}
        onViewChange={setActiveView}
        onOpenTableOfContents={() => setIsTocOpen(true)}
        onOpenLogTables={() => setIsLogModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTestMaker={() => setIsTestMakerOpen(true)}
        onRandomExercise={handleRandomExercise}
        bookmarkedCount={bookmarkedExerciseIds.length}
        selectedTestCount={selectedTestItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6">
        {activeView === 'book' ? (
          <div>
            {/* Chapter Navigation Hub with Sections, Categories, and Chapter Exercises */}
            <ChapterNavigationHub
              exercises={BOOK_EXERCISES}
              currentIndex={currentIndex}
              onSelectIndex={handleSelectIndex}
              bookmarkedExerciseIds={bookmarkedExerciseIds}
            />

            {/* Compact Exercise Box (One Box with Whole Exercise, Swipeable) */}
            <CompactExerciseBox
              section={currentSection}
              onPrevExercise={handlePrev}
              onNextExercise={handleNext}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < BOOK_EXERCISES.length - 1}
              direction={direction}
              currentIndex={currentIndex}
              totalExercises={BOOK_EXERCISES.length}
              bookmarkedExerciseIds={bookmarkedExerciseIds}
              onToggleBookmarkExercise={handleToggleBookmarkExercise}
              onOpenTestMaker={() => setIsTestMakerOpen(true)}
              selectedTestQuestionIds={selectedTestQuestionIds}
              onToggleTestQuestion={handleToggleTestQuestion}
            />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Class 9 Mathematics Curriculum</h2>
                <p className="text-xs text-slate-500">
                  Select any unit below to jump directly to its textbook exercises
                </p>
              </div>
              <button
                onClick={() => setActiveView('book')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Return to Book
              </button>
            </div>
            <CurriculumOverview
              onSelectUnit={handleSelectUnitFromCurriculum}
              selectedUnitId={currentSection.unitId}
            />
          </div>
        )}
      </main>

      {/* Table of Contents Modal */}
      <TableOfContentsModal
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        currentIndex={currentIndex}
        onSelectExerciseIndex={handleSelectIndex}
        bookmarkedExerciseIds={bookmarkedExerciseIds}
      />

      {/* Logarithm Table Modal (Pages 283-288) */}
      <LogTableLookupModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectIndex={(idx) => {
          handleSelectIndex(idx);
          setActiveView('book');
        }}
      />

      {/* Test Maker Modal (PDF & Printable Exam Builder) */}
      <TestMakerModal
        isOpen={isTestMakerOpen}
        onClose={() => setIsTestMakerOpen(false)}
        initialExerciseId={currentSection.id}
        selectedItems={selectedTestItems}
        onToggleItem={handleToggleTestItem}
        onClearItems={handleClearTestItems}
        onSelectMultiple={handleSelectMultipleTestItems}
      />
    </div>
  );
}
