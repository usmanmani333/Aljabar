import React from 'react';
import { UNITS_DATA } from '../data/textbookData';
import { UnitInfo } from '../types/math';
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
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface CurriculumOverviewProps {
  onSelectUnit: (unitId: number) => void;
  selectedUnitId?: number;
  solvedProblemIds?: string[];
}

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  onSelectUnit,
  selectedUnitId,
  solvedProblemIds = [],
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hash': return <Hash className="w-5 h-5" />;
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Binary': return <Binary className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Grid': return <Grid className="w-5 h-5" />;
      case 'GitFork': return <GitFork className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      case 'LineChart': return <LineChart className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'BarChart2': return <BarChart2 className="w-5 h-5" />;
      case 'Dices': return <Dices className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-indigo-600 mb-1">
            Punjab Curriculum & Textbook Board (PCTB)
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Mathematics 9 Exercise Workbook
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Official Punjab Curriculum & Textbook Board (PCTB) National Curriculum. Complete exercises across all 13 units with exact book questions, crisp LaTeX typesetting, and notebook completion tracking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {UNITS_DATA.map((unit: UnitInfo) => {
          return (
            <div
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    {getIcon(unit.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    Unit {unit.id.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {unit.name}
                  </h3>
                  {unit.urduName && (
                    <span className="text-sm font-urdu text-indigo-700/80 dark:text-indigo-400" dir="rtl">
                      {unit.urduName}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {unit.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {unit.exercises.join(' · ')}
                </span>
                <span className="font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Exercises</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
