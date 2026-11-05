import React, { useState } from 'react';

interface NumberLineProps {
  point?: number;
  label?: string;
  inequality?: '<=' | '>=' | '<' | '>';
  min?: number;
  max?: number;
  step?: number;
}

export const InteractiveNumberLine: React.FC<NumberLineProps> = ({
  point = 0,
  label,
  inequality,
  min = -6,
  max = 6,
  step = 1,
}) => {
  const [testValue, setTestValue] = useState<number>(point);

  const totalRange = max - min;
  const getXPercent = (val: number) => {
    return Math.max(0, Math.min(100, ((val - min) / totalRange) * 100));
  };

  const ticks: number[] = [];
  for (let t = min; t <= max; t += step) {
    ticks.push(t);
  }

  const pointX = getXPercent(point);
  const isInequality = Boolean(inequality);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 my-3 shadow-2xs">
      <div className="flex items-center justify-between mb-3 text-xs text-slate-600">
        <span className="font-semibold text-slate-800">
          Real Number Line Representation
        </span>
        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
          {label || (inequality ? `x ${inequality} ${point}` : `x = ${point}`)}
        </span>
      </div>

      <div className="relative w-full h-20 flex items-center select-none px-4">
        {/* Main horizontal line with arrowheads */}
        <div className="absolute left-2 right-2 h-0.5 bg-slate-700 flex items-center justify-between">
          <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-slate-700 -ml-2" />
          <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-slate-700 -mr-2" />
        </div>

        {/* Inequality Shaded Ray */}
        {inequality && (
          <div
            className="absolute h-2.5 bg-indigo-500/30 rounded-full"
            style={{
              left: inequality === '<=' || inequality === '<' ? '2%' : `${pointX}%`,
              width: inequality === '<=' || inequality === '<' ? `${pointX - 2}%` : `${98 - pointX}%`,
            }}
          />
        )}

        {/* Ticks and numerical labels */}
        {ticks.map((t) => {
          const tickX = getXPercent(t);
          const isZero = t === 0;
          return (
            <div
              key={t}
              className="absolute flex flex-col items-center -translate-x-1/2"
              style={{ left: `${tickX}%` }}
            >
              <div
                className={`w-0.5 ${
                  isZero ? 'h-5 bg-slate-900' : 'h-3 bg-slate-400'
                }`}
              />
              <span
                className={`text-[11px] mt-1 font-mono ${
                  isZero ? 'font-bold text-slate-900' : 'text-slate-500'
                }`}
              >
                {t}
              </span>
            </div>
          );
        })}

        {/* The Marked Target Point */}
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center z-10"
          style={{ left: `${pointX}%` }}
        >
          {/* Target circle */}
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              inequality === '<' || inequality === '>'
                ? 'bg-white border-indigo-600'
                : 'bg-indigo-600 border-indigo-700'
            } shadow-sm`}
          />
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1 rounded -top-6 absolute whitespace-nowrap">
            {label || point}
          </span>
        </div>
      </div>

      {/* Interactive slider for student experimentation */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-3 text-xs">
        <label htmlFor="test-slider" className="text-slate-500 shrink-0">
          Explore Value:
        </label>
        <input
          id="test-slider"
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={testValue}
          onChange={(e) => setTestValue(parseFloat(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <span className="font-mono font-semibold text-slate-800 w-12 text-right">
          {testValue.toFixed(1)}
        </span>
      </div>
    </div>
  );
};
