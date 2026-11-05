import React, { useState } from 'react';

interface VennViewerProps {
  setALabel?: string;
  setBLabel?: string;
  onlyA?: number;
  intersection?: number;
  onlyB?: number;
  universalTotal?: number;
  className?: string;
}

export const InteractiveVennViewer: React.FC<VennViewerProps> = ({
  setALabel = 'Cricket (C)',
  setBLabel = 'Hockey (H)',
  onlyA = 25,
  intersection = 9,
  onlyB = 21,
  universalTotal = 55,
  className = '',
}) => {
  const [highlight, setHighlight] = useState<'all' | 'A' | 'B' | 'intersection' | 'union'>('all');

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-4 my-3 shadow-2xs ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-700">Venn Diagram Model</span>
        <div className="flex items-center gap-1">
          {(['all', 'intersection', 'A', 'B', 'union'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setHighlight(h)}
              className={`px-2 py-0.5 text-xs font-mono rounded capitalize ${
                highlight === h
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {h === 'intersection' ? 'A ∩ B' : h === 'union' ? 'A ∪ B' : h}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-md mx-auto h-48 bg-slate-50/70 border border-dashed border-slate-300 rounded-lg flex items-center justify-center p-2">
        <span className="absolute top-2 left-2 text-xs font-bold text-slate-400">
          U = {universalTotal}
        </span>

        <svg viewBox="0 0 340 180" className="w-full h-full">
          {/* Circle A */}
          <circle
            cx="130"
            cy="90"
            r="65"
            fill={
              highlight === 'A' || highlight === 'union' || highlight === 'all'
                ? 'rgba(59, 130, 246, 0.25)'
                : 'rgba(59, 130, 246, 0.05)'
            }
            stroke="#2563eb"
            strokeWidth="2"
          />

          {/* Circle B */}
          <circle
            cx="210"
            cy="90"
            r="65"
            fill={
              highlight === 'B' || highlight === 'union' || highlight === 'all'
                ? 'rgba(16, 185, 129, 0.25)'
                : 'rgba(16, 185, 129, 0.05)'
            }
            stroke="#059669"
            strokeWidth="2"
          />

          {/* Labels */}
          <text x="85" y="40" fontSize="11" fontWeight="bold" fill="#1d4ed8">
            {setALabel}
          </text>
          <text x="215" y="40" fontSize="11" fontWeight="bold" fill="#047857">
            {setBLabel}
          </text>

          {/* Numbers inside regions */}
          {/* Only A */}
          <text x="105" y="95" fontSize="14" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">
            {onlyA}
          </text>
          {/* Intersection */}
          <text
            x="170"
            y="95"
            fontSize="14"
            fontWeight="bold"
            fill={highlight === 'intersection' ? '#dc2626' : '#312e81'}
            textAnchor="middle"
          >
            {intersection}
          </text>
          {/* Only B */}
          <text x="235" y="95" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">
            {onlyB}
          </text>
        </svg>
      </div>

      <div className="mt-2 text-center text-xs text-slate-500">
        Inclusion-Exclusion: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) ⇒ {onlyA + intersection} + {onlyB + intersection} - {intersection} = {onlyA + intersection + onlyB}
      </div>
    </div>
  );
};
