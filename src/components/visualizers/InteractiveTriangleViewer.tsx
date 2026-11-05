import React, { useState } from 'react';

interface TriangleViewerProps {
  perpendicular?: number;
  base?: number;
  hypotenuse?: number;
  thetaAngle?: string;
  className?: string;
}

export const InteractiveTriangleViewer: React.FC<TriangleViewerProps> = ({
  perpendicular = 4,
  base = 3,
  hypotenuse = 5,
  thetaAngle = 'A',
  className = '',
}) => {
  const [activeRatio, setActiveRatio] = useState<'sin' | 'cos' | 'tan'>('sin');

  const sinVal = (perpendicular / hypotenuse).toFixed(3);
  const cosVal = (base / hypotenuse).toFixed(3);
  const tanVal = (perpendicular / base).toFixed(3);

  // SVG coordinates for right triangle
  // Vertex C is at (50, 180) [right angle]
  // Vertex B is at (50, 40) [top]
  // Vertex A is at (220, 180) [bottom right, angle theta]
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-4 my-3 shadow-2xs ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-700">Right-Angled Triangle \\(\\triangle ACB\\)</span>
        <div className="flex items-center gap-1">
          {(['sin', 'cos', 'tan'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRatio(r)}
              className={`px-2 py-0.5 text-xs font-mono rounded ${
                activeRatio === r
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r} \\(\\theta\\)
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-64 h-48 flex items-center justify-center bg-slate-50/50 rounded-lg p-2">
          <svg viewBox="0 0 260 210" className="w-full h-full">
            {/* Triangle lines */}
            <polygon
              points="50,180 50,40 220,180"
              fill="rgba(99, 102, 241, 0.08)"
              stroke="#4338ca"
              strokeWidth="2.5"
            />

            {/* Right angle marker at C */}
            <path
              d="M 50,165 L 65,165 L 65,180"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            />
            <circle cx="58" cy="172" r="1.5" fill="#64748b" />

            {/* Angle theta arc at A (220, 180) */}
            <path
              d="M 190,180 A 30 30 0 0 0 200,163"
              fill="none"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text x="180" y="172" fontSize="12" fill="#e11d48" fontWeight="bold">
              θ
            </text>

            {/* Vertices */}
            <text x="35" y="195" fontSize="13" fontWeight="bold" fill="#1e293b">
              C
            </text>
            <text x="42" y="30" fontSize="13" fontWeight="bold" fill="#1e293b">
              B
            </text>
            <text x="230" y="195" fontSize="13" fontWeight="bold" fill="#1e293b">
              A
            </text>

            {/* Side labels */}
            {/* Perpendicular BC */}
            <text
              x="22"
              y="110"
              fontSize="12"
              fontWeight="600"
              fill={activeRatio === 'sin' || activeRatio === 'tan' ? '#4338ca' : '#64748b'}
            >
              a = {perpendicular}
            </text>
            {/* Base AC */}
            <text
              x="125"
              y="200"
              fontSize="12"
              fontWeight="600"
              fill={activeRatio === 'cos' || activeRatio === 'tan' ? '#4338ca' : '#64748b'}
            >
              b = {base}
            </text>
            {/* Hypotenuse AB */}
            <text
              x="145"
              y="100"
              fontSize="12"
              fontWeight="600"
              fill={activeRatio === 'sin' || activeRatio === 'cos' ? '#4338ca' : '#64748b'}
            >
              c = {hypotenuse}
            </text>
          </svg>
        </div>

        <div className="flex-1 space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-indigo-950">
            {activeRatio === 'sin' && (
              <div>
                <div className="font-semibold text-indigo-900">
                  sin θ = Perpendicular / Hypotenuse = a / c
                </div>
                <div className="mt-1 text-slate-700">
                  sin θ = {perpendicular} / {hypotenuse} = <span className="font-mono font-bold text-indigo-700">{sinVal}</span>
                </div>
              </div>
            )}
            {activeRatio === 'cos' && (
              <div>
                <div className="font-semibold text-indigo-900">
                  cos θ = Base / Hypotenuse = b / c
                </div>
                <div className="mt-1 text-slate-700">
                  cos θ = {base} / {hypotenuse} = <span className="font-mono font-bold text-indigo-700">{cosVal}</span>
                </div>
              </div>
            )}
            {activeRatio === 'tan' && (
              <div>
                <div className="font-semibold text-indigo-900">
                  tan θ = Perpendicular / Base = a / b
                </div>
                <div className="mt-1 text-slate-700">
                  tan θ = {perpendicular} / {base} = <span className="font-mono font-bold text-indigo-700">{tanVal}</span>
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500">
            Pythagorean Theorem: c² = a² + b² ⇒ {hypotenuse}² = {perpendicular}² + {base}² ({hypotenuse * hypotenuse} = {perpendicular * perpendicular + base * base})
          </div>
        </div>
      </div>
    </div>
  );
};
