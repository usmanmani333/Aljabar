import React, { useState } from 'react';

interface Point {
  x: number;
  y: number;
  label: string;
}

interface CoordinatePlaneProps {
  points?: Point[];
  className?: string;
}

export const InteractiveCoordinatePlane: React.FC<CoordinatePlaneProps> = ({
  points = [
    { x: 6, y: 7, label: 'A(6, 7)' },
    { x: 0, y: -2, label: 'B(0, -2)' },
  ],
  className = '',
}) => {
  const [activeMetric, setActiveMetric] = useState<'distance' | 'midpoint' | 'slope'>('distance');

  const p1 = points[0] || { x: 6, y: 7, label: 'A' };
  const p2 = points[1] || { x: 0, y: -2, label: 'B' };

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distSq = dx * dx + dy * dy;
  const distance = Math.sqrt(distSq).toFixed(2);
  const midX = ((p1.x + p2.x) / 2).toFixed(1);
  const midY = ((p1.y + p2.y) / 2).toFixed(1);
  const slope = dx !== 0 ? (dy / dx).toFixed(2) : 'Undefined';

  // Coordinate conversion: map plane [-4, 10] to SVG [20, 260]
  const scale = 20;
  const originX = 90;
  const originY = 150;

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-4 my-3 shadow-2xs ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-700">2D Cartesian Coordinate Grid</span>
        <div className="flex items-center gap-1">
          {(['distance', 'midpoint', 'slope'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveMetric(m)}
              className={`px-2 py-0.5 text-xs font-mono rounded capitalize ${
                activeMetric === m
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-64 h-56 bg-slate-50/70 border border-slate-200 rounded-lg overflow-hidden">
          <svg viewBox="0 0 260 220" className="w-full h-full">
            {/* Grid lines */}
            {[-4, -2, 0, 2, 4, 6, 8].map((gx) => (
              <line
                key={`gx-${gx}`}
                x1={toSvgX(gx)}
                y1="10"
                x2={toSvgX(gx)}
                y2="210"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            ))}
            {[-4, -2, 0, 2, 4, 6, 8].map((gy) => (
              <line
                key={`gy-${gy}`}
                x1="10"
                y1={toSvgY(gy)}
                x2="250"
                y2={toSvgY(gy)}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            ))}

            {/* X and Y axes */}
            <line x1="10" y1={originY} x2="250" y2={originY} stroke="#475569" strokeWidth="1.5" />
            <line x1={originX} y1="10" x2={originX} y2="210" stroke="#475569" strokeWidth="1.5" />

            {/* Axis labels */}
            <text x="242" y={originY - 5} fontSize="10" fontWeight="bold" fill="#475569">
              X
            </text>
            <text x={originX + 6} y="20" fontSize="10" fontWeight="bold" fill="#475569">
              Y
            </text>

            {/* Right triangle projections for distance */}
            <line
              x1={toSvgX(p1.x)}
              y1={toSvgY(p1.y)}
              x2={toSvgX(p2.x)}
              y2={toSvgY(p1.y)}
              stroke="#cbd5e1"
              strokeDasharray="3,3"
            />
            <line
              x1={toSvgX(p2.x)}
              y1={toSvgY(p1.y)}
              x2={toSvgX(p2.x)}
              y2={toSvgY(p2.y)}
              stroke="#cbd5e1"
              strokeDasharray="3,3"
            />

            {/* Line segment between points */}
            <line
              x1={toSvgX(p1.x)}
              y1={toSvgY(p1.y)}
              x2={toSvgX(p2.x)}
              y2={toSvgY(p2.y)}
              stroke="#4338ca"
              strokeWidth="2.5"
            />

            {/* Point 1 */}
            <circle cx={toSvgX(p1.x)} cy={toSvgY(p1.y)} r="4" fill="#4338ca" />
            <text
              x={toSvgX(p1.x) - 10}
              y={toSvgY(p1.y) - 8}
              fontSize="10"
              fontWeight="bold"
              fill="#1e1b4b"
            >
              {p1.label}
            </text>

            {/* Point 2 */}
            <circle cx={toSvgX(p2.x)} cy={toSvgY(p2.y)} r="4" fill="#4338ca" />
            <text
              x={toSvgX(p2.x) + 8}
              y={toSvgY(p2.y) + 12}
              fontSize="10"
              fontWeight="bold"
              fill="#1e1b4b"
            >
              {p2.label}
            </text>

            {/* Midpoint marker */}
            <circle
              cx={toSvgX(parseFloat(midX))}
              cy={toSvgY(parseFloat(midY))}
              r="3.5"
              fill="#e11d48"
            />
            <text
              x={toSvgX(parseFloat(midX)) + 6}
              y={toSvgY(parseFloat(midY)) - 4}
              fontSize="9"
              fill="#e11d48"
              fontWeight="bold"
            >
              M({midX}, {midY})
            </text>
          </svg>
        </div>

        <div className="flex-1 space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-indigo-950">
            {activeMetric === 'distance' && (
              <div>
                <div className="font-semibold text-indigo-900">
                  Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]
                </div>
                <div className="mt-1 text-slate-700">
                  d = √[({p2.x} - {p1.x})² + ({p2.y} - {p1.y})²] = √{distSq} ≈{' '}
                  <span className="font-mono font-bold text-indigo-700">{distance} units</span>
                </div>
              </div>
            )}
            {activeMetric === 'midpoint' && (
              <div>
                <div className="font-semibold text-indigo-900">
                  Midpoint: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
                </div>
                <div className="mt-1 text-slate-700">
                  M = (({p1.x} + {p2.x})/2, ({p1.y} + {p2.y})/2) ={' '}
                  <span className="font-mono font-bold text-rose-600">({midX}, {midY})</span>
                </div>
              </div>
            )}
            {activeMetric === 'slope' && (
              <div>
                <div className="font-semibold text-indigo-900">
                  Slope: m = (y₂ - y₁) / (x₂ - x₁)
                </div>
                <div className="mt-1 text-slate-700">
                  m = ({p2.y} - {p1.y}) / ({p2.x} - {p1.x}) ={' '}
                  <span className="font-mono font-bold text-indigo-700">{slope}</span>
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500">
            Horizontal displacement \\(\\Delta x = {dx}\\), Vertical displacement \\(\\Delta y = {dy}\\).
          </div>
        </div>
      </div>
    </div>
  );
};
