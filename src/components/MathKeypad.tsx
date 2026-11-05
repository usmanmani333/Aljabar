import React from 'react';

interface MathKeypadProps {
  onInsert: (symbol: string) => void;
  className?: string;
}

export const MathKeypad: React.FC<MathKeypadProps> = ({ onInsert, className = '' }) => {
  const symbols = [
    { label: '√x', value: '\\sqrt{}', tooltip: 'Square Root' },
    { label: 'x²', value: '^2', tooltip: 'Square' },
    { label: 'a/b', value: '/', tooltip: 'Fraction' },
    { label: 'π', value: '\\pi', tooltip: 'Pi' },
    { label: 'θ', value: '\\theta', tooltip: 'Theta' },
    { label: '°', value: '^\\circ', tooltip: 'Degree' },
    { label: '±', value: '\\pm', tooltip: 'Plus-minus' },
    { label: '≤', value: '\\le', tooltip: 'Less than or equal' },
    { label: '≥', value: '\\ge', tooltip: 'Greater than or equal' },
    { label: '≠', value: '\\ne', tooltip: 'Not equal' },
    { label: '×', value: '\\times', tooltip: 'Multiplication' },
    { label: '÷', value: '\\div', tooltip: 'Division' },
    { label: 'log', value: '\\log', tooltip: 'Logarithm' },
    { label: 'sin', value: '\\sin', tooltip: 'Sine' },
    { label: 'cos', value: '\\cos', tooltip: 'Cosine' },
    { label: 'tan', value: '\\tan', tooltip: 'Tangent' },
    { label: '∩', value: '\\cap', tooltip: 'Intersection' },
    { label: '∪', value: '\\cup', tooltip: 'Union' },
    { label: '∈', value: '\\in', tooltip: 'Element of' },
    { label: '∅', value: '\\emptyset', tooltip: 'Empty Set' },
  ];

  return (
    <div className={`p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap gap-1.5 items-center ${className}`}>
      <span className="text-xs font-semibold text-slate-500 mr-1 select-none">Quick Math:</span>
      {symbols.map((s) => (
        <button
          key={s.label}
          type="button"
          onClick={() => onInsert(s.value)}
          title={s.tooltip}
          className="px-2 py-1 text-xs font-mono font-medium bg-white text-slate-700 border border-slate-200 rounded hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shadow-2xs active:scale-95"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};
