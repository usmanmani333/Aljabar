import React, { useState } from 'react';
import { Image, Copy, Check, ExternalLink } from 'lucide-react';

export type DiagramType =
  | 'number-line'
  | 'coordinate-plane'
  | 'quadrants'
  | 'triangle'
  | 'similar-triangles'
  | 'venn'
  | 'histogram'
  | 'circle'
  | 'spinner'
  | 'sample-space'
  | 'linear-graph';

export interface MathDiagramConfig {
  type: DiagramType;
  title: string;
  caption?: string;
  props?: Record<string, any>;
}

interface MathDiagramProps {
  diagram: MathDiagramConfig;
  className?: string;
  compact?: boolean;
}

export const MathDiagram: React.FC<MathDiagramProps> = ({
  diagram,
  className = '',
  compact = false,
}) => {
  const { type, title, caption, props = {} } = diagram;
  const [copied, setCopied] = useState(false);

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(`${title} - ${caption || ''}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-slate-50/95 dark:bg-slate-900/95 ${
        compact ? 'p-1.5 sm:p-2 my-1.5' : 'p-3 sm:p-4 my-3'
      } text-slate-800 dark:text-slate-200 shadow-xs overflow-hidden ${className}`}
    >
      {/* Diagram Header Banner */}
      <div className={`flex items-center justify-between gap-2 ${compact ? 'mb-1 pb-1' : 'mb-2 pb-1.5'} border-b border-slate-200 dark:border-slate-800`}>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 animate-pulse" />
          <h4 className={`${compact ? 'text-[10px]' : 'text-xs'} font-bold font-mono tracking-wide text-indigo-950 dark:text-indigo-300 uppercase truncate`}>
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-semibold flex items-center gap-1">
            <Image className="w-2.5 h-2.5" />
            <span>Vector Graphic</span>
          </span>
          {!compact && (
            <button
              onClick={handleCopyTitle}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 rounded transition-colors"
              title="Copy graph title and details"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>

      {/* Render Specific Diagram Type */}
      <div className={`flex justify-center items-center overflow-x-auto ${compact ? 'py-0.5' : 'py-2'}`}>
        {type === 'histogram' && <HistogramDiagram compact={compact} {...props} />}
        {type === 'number-line' && <NumberLineDiagram compact={compact} {...props} />}
        {type === 'coordinate-plane' && <CoordinatePlaneDiagram compact={compact} {...props} />}
        {type === 'quadrants' && <QuadrantsDiagram compact={compact} {...props} />}
        {type === 'triangle' && <TriangleDiagram compact={compact} {...props} />}
        {type === 'similar-triangles' && <SimilarTrianglesDiagram compact={compact} {...props} />}
        {type === 'venn' && <VennDiagram compact={compact} {...props} />}
        {type === 'spinner' && <SpinnerDiagram compact={compact} {...props} />}
        {type === 'sample-space' && <SampleSpaceDiagram compact={compact} {...props} />}
        {type === 'circle' && <CircleDiagram compact={compact} {...props} />}
        {type === 'linear-graph' && <LinearGraphDiagram compact={compact} {...props} />}
      </div>

      {caption && (
        <div className={`${compact ? 'text-[9.5px]' : 'text-[11px]'} text-slate-600 dark:text-slate-400 mt-1.5 text-center font-sans`}>
          {caption}
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------
 * 1. Histogram & Frequency Polygon Diagram
 * ------------------------------------------------------------- */
function HistogramDiagram({
  classes = ['9.5-19.5', '19.5-29.5', '29.5-39.5', '39.5-49.5', '49.5-59.5'],
  frequencies = [4, 8, 12, 6, 2],
  midpoints = [14.5, 24.5, 34.5, 44.5, 54.5],
  maxFreq = 14,
  compact = false,
}: {
  classes?: string[];
  frequencies?: number[];
  midpoints?: number[];
  maxFreq?: number;
  compact?: boolean;
}) {
  const width = 440;
  const height = compact ? 170 : 230;
  const padL = 40;
  const padR = 20;
  const padT = compact ? 15 : 25;
  const padB = compact ? 30 : 40;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const barW = chartW / frequencies.length;

  const polyPoints: { x: number; y: number }[] = [];
  const firstMidX = padL + barW / 2;
  polyPoints.push({ x: firstMidX - barW, y: height - padB });

  frequencies.forEach((f, i) => {
    const x = padL + i * barW + barW / 2;
    const y = height - padB - (f / maxFreq) * chartH;
    polyPoints.push({ x, y });
  });

  const lastMidX = padL + (frequencies.length - 1) * barW + barW / 2;
  polyPoints.push({ x: lastMidX + barW, y: height - padB });
  const polyPathStr = polyPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className={`w-full ${compact ? 'max-w-[280px]' : 'max-w-md'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {[0, 4, 8, 12].map((fVal) => {
          const y = height - padB - (fVal / maxFreq) * chartH;
          return (
            <g key={fVal}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="currentColor" strokeOpacity={fVal === 0 ? 0.6 : 0.15} strokeDasharray={fVal === 0 ? undefined : '3,3'} />
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fill="currentColor" opacity={0.7} fontFamily="monospace">
                {fVal}
              </text>
            </g>
          );
        })}

        {frequencies.map((f, i) => {
          const x = padL + i * barW;
          const barHeight = (f / maxFreq) * chartH;
          const y = height - padB - barHeight;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barHeight}
                fill="rgba(99, 102, 241, 0.25)"
                stroke="#6366f1"
                strokeWidth="1.5"
              />
              <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4f46e5" fontFamily="monospace">
                f={f}
              </text>
            </g>
          );
        })}

        <path d={`${polyPathStr} L ${width - padR} ${height - padB} Z`} fill="rgba(236, 72, 153, 0.08)" />
        <path d={polyPathStr} fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {polyPoints.slice(1, -1).map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r="3" fill="#ec4899" stroke="#ffffff" strokeWidth="1" />
        ))}

        {classes.map((boundary, i) => {
          const x = padL + i * barW;
          return (
            <g key={boundary}>
              <line x1={x} y1={height - padB} x2={x} y2={height - padB + 4} stroke="currentColor" strokeWidth="1.5" />
              <text x={x} y={height - padB + 13} textAnchor="middle" fontSize="8" fill="currentColor" opacity={0.8} fontFamily="monospace">
                {boundary}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 2. Real Number Line Diagram
 * ------------------------------------------------------------- */
function NumberLineDiagram({
  points = [
    { value: 1.414, label: '√2 ≈ 1.41', color: '#6366f1' },
    { value: 1.732, label: '√3 ≈ 1.73', color: '#06b6d4' },
    { value: -2.14, label: '-2¹/₇ ≈ -2.14', color: '#ec4899' },
    { value: 4.33, label: '4¹/₃ ≈ 4.33', color: '#10b981' },
  ],
  min = -4,
  max = 6,
  compact = false,
}: {
  points?: { value: number; label: string; color?: string }[];
  min?: number;
  max?: number;
  compact?: boolean;
}) {
  const width = 420;
  const height = compact ? 85 : 110;
  const padL = 30;
  const padR = 30;
  const lineY = compact ? 42 : 55;

  const totalRange = max - min;
  const toX = (val: number) => padL + ((val - min) / totalRange) * (width - padL - padR);

  const integerTicks: number[] = [];
  for (let i = min; i <= max; i++) {
    integerTicks.push(i);
  }

  return (
    <div className={`w-full ${compact ? 'max-w-[280px]' : 'max-w-md'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        <line x1={padL - 12} y1={lineY} x2={width - padR + 12} y2={lineY} stroke="currentColor" strokeWidth="2" />
        <polygon points={`${padL - 16},${lineY} ${padL - 10},${lineY - 3} ${padL - 10},${lineY + 3}`} fill="currentColor" />
        <polygon points={`${width - padR + 16},${lineY} ${width - padR + 10},${lineY - 3} ${width - padR + 10},${lineY + 3}`} fill="currentColor" />

        {integerTicks.map((tick) => {
          const x = toX(tick);
          const isZero = tick === 0;
          return (
            <g key={tick}>
              <line x1={x} y1={lineY - (isZero ? 7 : 4)} x2={x} y2={lineY + (isZero ? 7 : 4)} stroke="currentColor" strokeWidth={isZero ? 2 : 1} opacity={isZero ? 1 : 0.6} />
              <text x={x} y={lineY + 16} textAnchor="middle" fontSize={isZero ? '10' : '9'} fontWeight={isZero ? 'bold' : 'normal'} fill="currentColor" opacity={isZero ? 1 : 0.8} fontFamily="monospace">
                {tick}
              </text>
            </g>
          );
        })}

        {points.map((pt, idx) => {
          const x = toX(pt.value);
          const color = pt.color || '#6366f1';
          const isTop = idx % 2 === 0;
          const labelY = isTop ? lineY - 18 : lineY - 28;

          return (
            <g key={idx}>
              <line x1={x} y1={lineY} x2={x} y2={lineY - 10} stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
              <circle cx={x} cy={lineY} r="3.5" fill={color} stroke="#ffffff" strokeWidth="1" />
              <rect x={x - 26} y={labelY - 9} width="52" height="13" rx="3" fill={color} opacity="0.95" />
              <text x={x} y={labelY} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                {pt.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 3. 2D Coordinate Plane Diagram
 * ------------------------------------------------------------- */
function CoordinatePlaneDiagram({
  p1 = { x: 6, y: 7, label: 'A(6, 7)' },
  p2 = { x: 0, y: -2, label: 'B(0, -2)' },
  p3,
  showDistance = true,
  compact = false,
}: {
  p1?: { x: number; y: number; label: string };
  p2?: { x: number; y: number; label: string };
  p3?: { x: number; y: number; label: string };
  showDistance?: boolean;
  compact?: boolean;
}) {
  const width = compact ? 220 : 270;
  const height = compact ? 170 : 210;
  const originX = compact ? 90 : 110;
  const originY = compact ? 100 : 125;
  const scale = compact ? 10 : 13;

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  const x1 = toSvgX(p1.x);
  const y1 = toSvgY(p1.y);
  const x2 = toSvgX(p2.x);
  const y2 = toSvgY(p2.y);

  const midX = toSvgX((p1.x + p2.x) / 2);
  const midY = toSvgY((p1.y + p2.y) / 2);
  const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)).toFixed(2);

  return (
    <div className={`w-full ${compact ? 'max-w-[200px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {[-4, -2, 2, 4, 6, 8].map((gx) => (
          <line key={`gx-${gx}`} x1={toSvgX(gx)} y1={10} x2={toSvgX(gx)} y2={height - 10} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        ))}
        {[-4, -2, 2, 4, 6, 8].map((gy) => (
          <line key={`gy-${gy}`} x1={10} y1={toSvgY(gy)} x2={width - 10} y2={toSvgY(gy)} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        ))}

        <line x1={10} y1={originY} x2={width - 10} y2={originY} stroke="currentColor" strokeWidth="1.5" />
        <line x1={originX} y1={height - 10} x2={originX} y2={10} stroke="currentColor" strokeWidth="1.5" />

        <text x={width - 8} y={originY - 4} fontSize="9" fontWeight="bold" fill="currentColor">X</text>
        <text x={originX + 5} y={16} fontSize="9" fontWeight="bold" fill="currentColor">Y</text>

        {showDistance && (
          <polygon points={`${x2},${y2} ${x1},${y2} ${x1},${y1}`} fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" strokeDasharray="3,3" strokeWidth="1" />
        )}

        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4f46e5" strokeWidth="2" />
        <circle cx={x1} cy={y1} r="3.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1" />
        <circle cx={x2} cy={y2} r="3.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1" />
        <circle cx={midX} cy={midY} r="3" fill="#ec4899" stroke="#ffffff" strokeWidth="1" />

        {p3 && (
          <g>
            <circle cx={toSvgX(p3.x)} cy={toSvgY(p3.y)} r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
            <text x={toSvgX(p3.x) + 4} y={toSvgY(p3.y) - 4} fontSize="9" fontWeight="bold" fill="#10b981" fontFamily="monospace">
              {p3.label}
            </text>
          </g>
        )}

        <text x={x1 + 4} y={y1 - 3} fontSize="9" fontWeight="bold" fill="#4f46e5" fontFamily="monospace">{p1.label}</text>
        <text x={x2 + 4} y={y2 + 10} fontSize="9" fontWeight="bold" fill="#4f46e5" fontFamily="monospace">{p2.label}</text>
        {showDistance && (
          <text x={(x1 + x2) / 2 + 8} y={(y1 + y2) / 2 + 12} fontSize="8" fill="#4f46e5" fontWeight="bold" fontFamily="monospace">
            d={dist}
          </text>
        )}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 3b. Four Quadrants & Axes Reference Diagram
 * ------------------------------------------------------------- */
function QuadrantsDiagram({
  compact = false,
}: {
  compact?: boolean;
}) {
  const width = compact ? 220 : 280;
  const height = compact ? 170 : 210;
  const originX = width / 2;
  const originY = height / 2;
  const pad = compact ? 16 : 22;

  return (
    <div className={`w-full ${compact ? 'max-w-[210px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {/* Quadrant background tints */}
        {/* Q-I: x > 0, y > 0 */}
        <rect
          x={originX}
          y={pad}
          width={originX - pad}
          height={originY - pad}
          fill="rgba(99, 102, 241, 0.08)"
        />
        {/* Q-II: x < 0, y > 0 */}
        <rect
          x={pad}
          y={pad}
          width={originX - pad}
          height={originY - pad}
          fill="rgba(16, 185, 129, 0.08)"
        />
        {/* Q-III: x < 0, y < 0 */}
        <rect
          x={pad}
          y={originY}
          width={originX - pad}
          height={originY - pad}
          fill="rgba(245, 158, 11, 0.08)"
        />
        {/* Q-IV: x > 0, y < 0 */}
        <rect
          x={originX}
          y={originY}
          width={originX - pad}
          height={originY - pad}
          fill="rgba(236, 72, 153, 0.08)"
        />

        {/* Diagonal Line x = y */}
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={pad}
          stroke="#8b5cf6"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />
        <text
          x={width - pad - 6}
          y={pad + 12}
          fontSize="7.5"
          fontWeight="bold"
          fill="#8b5cf6"
          fontFamily="monospace"
        >
          x = y
        </text>

        {/* X and Y Axes */}
        <line
          x1={pad - 6}
          y1={originY}
          x2={width - pad + 6}
          y2={originY}
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <line
          x1={originX}
          y1={height - pad + 6}
          x2={originX}
          y2={pad - 6}
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Axis Labels */}
        <text x={width - pad + 1} y={originY - 4} fontSize="9" fontWeight="bold" fill="currentColor">
          X
        </text>
        <text x={pad - 6} y={originY - 4} fontSize="9" fontWeight="bold" fill="currentColor">
          X'
        </text>
        <text x={originX + 5} y={pad - 2} fontSize="9" fontWeight="bold" fill="currentColor">
          Y
        </text>
        <text x={originX + 5} y={height - pad + 10} fontSize="9" fontWeight="bold" fill="currentColor">
          Y'
        </text>

        <text x={originX - 9} y={originY + 12} fontSize="8" opacity="0.6" fill="currentColor">
          O(0,0)
        </text>

        {/* Quadrant labels */}
        {/* Quadrant I */}
        <g>
          <text x={originX + (originX - pad) / 2} y={originY - (originY - pad) / 2 - 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4f46e5">
            Quadrant I
          </text>
          <text x={originX + (originX - pad) / 2} y={originY - (originY - pad) / 2 + 8} textAnchor="middle" fontSize="7.5" fontWeight="semibold" fill="#4f46e5" fontFamily="monospace">
            (+, +) [x&gt;0, y&gt;0]
          </text>
        </g>

        {/* Quadrant II */}
        <g>
          <text x={pad + (originX - pad) / 2} y={originY - (originY - pad) / 2 - 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#059669">
            Quadrant II
          </text>
          <text x={pad + (originX - pad) / 2} y={originY - (originY - pad) / 2 + 8} textAnchor="middle" fontSize="7.5" fontWeight="semibold" fill="#059669" fontFamily="monospace">
            (-, +) [x&lt;0, y&gt;0]
          </text>
        </g>

        {/* Quadrant III */}
        <g>
          <text x={pad + (originX - pad) / 2} y={originY + (originY - pad) / 2 - 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d97706">
            Quadrant III
          </text>
          <text x={pad + (originX - pad) / 2} y={originY + (originY - pad) / 2 + 8} textAnchor="middle" fontSize="7.5" fontWeight="semibold" fill="#d97706" fontFamily="monospace">
            (-, -) [x&lt;0, y&lt;0]
          </text>
        </g>

        {/* Quadrant IV */}
        <g>
          <text x={originX + (originX - pad) / 2} y={originY + (originY - pad) / 2 - 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#db2777">
            Quadrant IV
          </text>
          <text x={originX + (originX - pad) / 2} y={originY + (originY - pad) / 2 + 8} textAnchor="middle" fontSize="7.5" fontWeight="semibold" fill="#db2777" fontFamily="monospace">
            (+, -) [x&gt;0, y&lt;0]
          </text>
        </g>

        {/* Axis Equations annotations */}
        <rect x={width - pad - 60} y={originY + 4} width="58" height="12" rx="2" fill="currentColor" fillOpacity="0.08" />
        <text x={width - pad - 31} y={originY + 12} textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor" opacity="0.8">
          y = 0 (X-axis)
        </text>

        <rect x={originX - 58} y={pad + 4} width="54" height="12" rx="2" fill="currentColor" fillOpacity="0.08" />
        <text x={originX - 31} y={pad + 12} textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor" opacity="0.8">
          x = 0 (Y-axis)
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 4. Right-Angled Triangle Diagram
 * ------------------------------------------------------------- */
function TriangleDiagram({
  perpLabel = '4 (Perp)',
  baseLabel = '3 (Base)',
  hypLabel = '5 (Hyp)',
  angleLabel = 'θ',
  compact = false,
}: {
  perpLabel?: string;
  baseLabel?: string;
  hypLabel?: string;
  angleLabel?: string;
  compact?: boolean;
}) {
  const width = compact ? 210 : 250;
  const height = compact ? 130 : 160;

  return (
    <div className={`w-full ${compact ? 'max-w-[200px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        <polygon points="35,115 35,25 180,115" fill="rgba(99, 102, 241, 0.1)" stroke="#4f46e5" strokeWidth="2" />
        <polyline points="35,102 48,102 48,115" fill="none" stroke="#4f46e5" strokeWidth="1.2" />

        <path d="M 155,115 A 25,25 0 0,0 162,103" fill="none" stroke="#ec4899" strokeWidth="1.8" />
        <text x={148} y={110} fontSize="10" fontWeight="bold" fill="#ec4899" fontFamily="serif">{angleLabel}</text>

        <text x={26} y={22} fontSize="10" fontWeight="bold" fill="currentColor">B</text>
        <text x={20} y={124} fontSize="10" fontWeight="bold" fill="currentColor">C(90°)</text>
        <text x={186} y={120} fontSize="10" fontWeight="bold" fill="currentColor">A</text>

        <text x={14} y={70} textAnchor="middle" fontSize="9" fill="#4f46e5" fontWeight="600" transform="rotate(-90, 14, 70)">
          {perpLabel}
        </text>
        <text x={108} y={128} textAnchor="middle" fontSize="9" fill="#4f46e5" fontWeight="600">
          {baseLabel}
        </text>
        <text x={115} y={62} textAnchor="middle" fontSize="9" fill="#4f46e5" fontWeight="600" transform="rotate(-32, 115, 62)">
          {hypLabel}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 5. Similar Triangles Diagram
 * ------------------------------------------------------------- */
function SimilarTrianglesDiagram({
  triangle1 = { label: 'ΔABC', base: '6 cm', side: '8 cm', vertices: ['A', 'B', 'C'] },
  triangle2 = { label: 'ΔDEF', base: '9 cm', side: '12 cm', vertices: ['D', 'E', 'F'] },
  ratio = 'k = 3/2 (1.5×)',
  compact = false,
}: {
  triangle1?: { label: string; base: string; side: string; vertices: string[] };
  triangle2?: { label: string; base: string; side: string; vertices: string[] };
  ratio?: string;
  compact?: boolean;
}) {
  const width = compact ? 260 : 300;
  const height = compact ? 120 : 140;

  return (
    <div className={`w-full ${compact ? 'max-w-[240px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        <polygon points="20,105 50,40 85,105" fill="rgba(99, 102, 241, 0.12)" stroke="#4f46e5" strokeWidth="2" />
        <text x={14} y={112} fontSize="9" fontWeight="bold" fill="currentColor">{triangle1.vertices[0]}</text>
        <text x={50} y={34} textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">{triangle1.vertices[1]}</text>
        <text x={90} y={112} fontSize="9" fontWeight="bold" fill="currentColor">{triangle1.vertices[2]}</text>
        <text x={52} y={118} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#4f46e5">{triangle1.base}</text>
        <text x={26} y={68} fontSize="8" fontWeight="bold" fill="#4f46e5">{triangle1.side}</text>

        <text x={115} y={70} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ec4899">~</text>
        <text x={115} y={88} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ec4899" fontFamily="monospace">{ratio}</text>

        <polygon points="145,105 190,15 245,105" fill="rgba(236, 72, 153, 0.12)" stroke="#ec4899" strokeWidth="2" />
        <text x={138} y={112} fontSize="9" fontWeight="bold" fill="currentColor">{triangle2.vertices[0]}</text>
        <text x={190} y={10} textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">{triangle2.vertices[1]}</text>
        <text x={250} y={112} fontSize="9" fontWeight="bold" fill="currentColor">{triangle2.vertices[2]}</text>
        <text x={195} y={118} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ec4899">{triangle2.base}</text>
        <text x={155} y={55} fontSize="8" fontWeight="bold" fill="#ec4899">{triangle2.side}</text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 6. Venn Diagram for Sets
 * ------------------------------------------------------------- */
function VennDiagram({
  operation = 'A ∪ B',
  setA = 'A',
  setB = 'B',
  universe = 'U',
  compact = false,
}: {
  operation?: string;
  setA?: string;
  setB?: string;
  universe?: string;
  compact?: boolean;
}) {
  const width = compact ? 220 : 260;
  const height = compact ? 120 : 145;

  return (
    <div className={`w-full ${compact ? 'max-w-[200px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        <rect x={10} y={10} width={width - 20} height={height - 20} rx="6" fill="rgba(241, 245, 249, 0.5)" stroke="currentColor" strokeWidth="1.2" />
        <text x={20} y={26} fontSize="10" fontWeight="bold" fill="currentColor">{universe}</text>

        <circle cx={compact ? 80 : 95} cy={compact ? 65 : 75} r={compact ? 36 : 42} fill="rgba(99, 102, 241, 0.22)" stroke="#4f46e5" strokeWidth="1.8" />
        <circle cx={compact ? 135 : 160} cy={compact ? 65 : 75} r={compact ? 36 : 42} fill="rgba(236, 72, 153, 0.22)" stroke="#ec4899" strokeWidth="1.8" />

        <text x={compact ? 62 : 75} y={compact ? 68 : 78} fontSize="11" fontWeight="bold" fill="#4f46e5">{setA}</text>
        <text x={compact ? 148 : 175} y={compact ? 68 : 78} fontSize="11" fontWeight="bold" fill="#ec4899">{setB}</text>
        <text x={compact ? 107 : 127} y={compact ? 68 : 78} textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" opacity={0.8}>A∩B</text>

        <text x={width / 2} y={height - 14} textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">
          Region: {operation}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 7. Probability Spinner Diagram
 * ------------------------------------------------------------- */
function SpinnerDiagram({
  sectors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange'],
  colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#f97316'],
  compact = false,
}: {
  sectors?: string[];
  colors?: string[];
  compact?: boolean;
}) {
  const size = compact ? 130 : 160;
  const radius = compact ? 52 : 64;
  const cx = size / 2;
  const cy = size / 2;
  const anglePerSector = 360 / sectors.length;

  return (
    <div className={`w-full ${compact ? 'max-w-[150px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto select-none">
        {sectors.map((sec, i) => {
          const startAngle = (i * anglePerSector - 90) * (Math.PI / 180);
          const endAngle = ((i + 1) * anglePerSector - 90) * (Math.PI / 180);

          const x1 = cx + radius * Math.cos(startAngle);
          const y1 = cy + radius * Math.sin(startAngle);
          const x2 = cx + radius * Math.cos(endAngle);
          const y2 = cy + radius * Math.sin(endAngle);

          const midAngle = ((i + 0.5) * anglePerSector - 90) * (Math.PI / 180);
          const textX = cx + radius * 0.65 * Math.cos(midAngle);
          const textY = cy + radius * 0.65 * Math.sin(midAngle);

          return (
            <g key={sec}>
              <path
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                fill={colors[i % colors.length]}
                opacity="0.88"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              <text x={textX} y={textY} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="bold" fill="#ffffff">
                {sec}
              </text>
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r="5" fill="#1e293b" />
        <line x1={cx} y1={cy} x2={cx} y2={cy - radius + 12} stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points={`${cx},${cy - radius + 6} ${cx - 3},${cy - radius + 14} ${cx + 3},${cy - radius + 14}`} fill="#1e293b" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 8. Sample Space Grid (e.g. 2 Dice 36 Outcomes)
 * ------------------------------------------------------------- */
function SampleSpaceDiagram({
  highlightCondition = 'sum = 7',
  compact = false,
}: {
  highlightCondition?: string;
  compact?: boolean;
}) {
  const size = compact ? 170 : 210;
  const pad = compact ? 22 : 28;
  const cellSize = (size - pad * 2) / 6;

  return (
    <div className={`w-full ${compact ? 'max-w-[190px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${size} ${size + 16}`} className="w-full h-auto select-none">
        <text x={size / 2} y={12} textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">
          Two Dice Sample Space (n=36)
        </text>

        {[1, 2, 3, 4, 5, 6].map((num, i) => (
          <g key={num}>
            <text x={pad + i * cellSize + cellSize / 2} y={pad - 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#4f46e5">
              {num}
            </text>
            <text x={pad - 6} y={pad + i * cellSize + cellSize / 2 + 3} textAnchor="end" fontSize="8" fontWeight="bold" fill="#ec4899">
              {num}
            </text>
          </g>
        ))}

        {[1, 2, 3, 4, 5, 6].map((r) =>
          [1, 2, 3, 4, 5, 6].map((c) => {
            const isHighlight = r + c === 7;
            const x = pad + (c - 1) * cellSize;
            const y = pad + (r - 1) * cellSize;

            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={isHighlight ? 'rgba(236, 72, 153, 0.35)' : 'rgba(99, 102, 241, 0.05)'}
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                <text x={x + cellSize / 2} y={y + cellSize / 2 + 2.5} textAnchor="middle" fontSize="6.5" fontWeight={isHighlight ? 'bold' : 'normal'} fill={isHighlight ? '#ec4899' : 'currentColor'} opacity={0.9}>
                  {r},{c}
                </text>
              </g>
            );
          })
        )}

        <text x={size / 2} y={size + 12} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#ec4899" fontFamily="monospace">
          Highlighted: {highlightCondition} (6/36 = 1/6)
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 9. Circle Geometry Diagram
 * ------------------------------------------------------------- */
function CircleDiagram({
  radius = 55,
  chordLength = 70,
  center = 'O',
  compact = false,
}: {
  radius?: number;
  chordLength?: number;
  center?: string;
  compact?: boolean;
}) {
  const size = compact ? 140 : 170;
  const cx = size / 2;
  const cy = size / 2;

  const chordY = cy + (compact ? 18 : 22);
  const halfChord = chordLength / 2;
  const ax = cx - halfChord;
  const bx = cx + halfChord;

  return (
    <div className={`w-full ${compact ? 'max-w-[160px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto select-none">
        <circle cx={cx} cy={cy} r={radius} fill="rgba(99, 102, 241, 0.05)" stroke="#4f46e5" strokeWidth="1.8" />

        <circle cx={cx} cy={cy} r="3" fill="#4f46e5" />
        <text x={cx + 5} y={cy - 4} fontSize="9" fontWeight="bold" fill="currentColor">{center}</text>

        <line x1={ax} y1={chordY} x2={bx} y2={chordY} stroke="#4f46e5" strokeWidth="2" />
        <circle cx={ax} cy={chordY} r="2.5" fill="#4f46e5" />
        <circle cx={bx} cy={chordY} r="2.5" fill="#4f46e5" />
        <text x={ax - 8} y={chordY + 3} fontSize="8" fontWeight="bold" fill="currentColor">A</text>
        <text x={bx + 4} y={chordY + 3} fontSize="8" fontWeight="bold" fill="currentColor">B</text>

        <line x1={cx} y1={cy} x2={cx} y2={chordY} stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx={cx} cy={chordY} r="2.5" fill="#ec4899" />
        <text x={cx + 4} y={chordY + 10} fontSize="8" fontWeight="bold" fill="#ec4899">M</text>

        <line x1={cx} y1={cy} x2={ax} y2={chordY} stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <line x1={cx} y1={cy} x2={bx} y2={chordY} stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

        <text x={cx} y={size - 4} textAnchor="middle" fontSize="7.5" fill="currentColor" opacity={0.8}>
          OM ⊥ AB bisects chord (AM = MB)
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------
 * 10. Dynamic Linear Graph Diagram
 * Handles: single line, horizontal, vertical, through origin, or intersecting system
 * ------------------------------------------------------------- */
function LinearGraphDiagram({
  equation = '2x + y = 6',
  points = [],
  line1,
  line2,
  intersection,
  xRange = [-5, 6],
  yRange = [-4, 7],
  xIntercept,
  yIntercept,
  compact = false,
}: {
  equation?: string;
  points?: { x: number; y: number; label?: string }[];
  line1?: {
    equation?: string;
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    color?: string;
  };
  line2?: {
    equation?: string;
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    color?: string;
  };
  intersection?: { x: number; y: number; label: string };
  xRange?: [number, number];
  yRange?: [number, number];
  xIntercept?: { x: number; y: number; label: string };
  yIntercept?: { x: number; y: number; label: string };
  compact?: boolean;
}) {
  const width = compact ? 220 : 270;
  const height = compact ? 160 : 200;
  const pad = compact ? 25 : 30;

  const [minX, maxX] = xRange;
  const [minY, maxY] = yRange;

  const toX = (xVal: number) => {
    return pad + ((xVal - minX) / (maxX - minX)) * (width - 2 * pad);
  };

  const toY = (yVal: number) => {
    return height - pad - ((yVal - minY) / (maxY - minY)) * (height - 2 * pad);
  };

  const originX = toX(0);
  const originY = toY(0);

  // Plotted points array
  const allPoints = [...points];
  if (xIntercept && !allPoints.some((p) => p.x === xIntercept.x && p.y === xIntercept.y)) {
    allPoints.push(xIntercept);
  }
  if (yIntercept && !allPoints.some((p) => p.x === yIntercept.x && p.y === yIntercept.y)) {
    allPoints.push(yIntercept);
  }

  // Generate grid tick values
  const xTicks: number[] = [];
  for (let x = Math.ceil(minX); x <= Math.floor(maxX); x += 2) {
    if (x !== 0) xTicks.push(x);
  }

  const yTicks: number[] = [];
  for (let y = Math.ceil(minY); y <= Math.floor(maxY); y += 2) {
    if (y !== 0) yTicks.push(y);
  }

  return (
    <div className={`w-full ${compact ? 'max-w-[210px]' : 'max-w-xs'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {/* Grid lines */}
        {xTicks.map((gx) => (
          <line
            key={`grid-x-${gx}`}
            x1={toX(gx)}
            y1={pad - 10}
            x2={toX(gx)}
            y2={height - pad + 10}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}
        {yTicks.map((gy) => (
          <line
            key={`grid-y-${gy}`}
            x1={pad - 10}
            y1={toY(gy)}
            x2={width - pad + 10}
            y2={toY(gy)}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}

        {/* X and Y Axes */}
        <line x1={pad - 15} y1={originY} x2={width - pad + 15} y2={originY} stroke="currentColor" strokeWidth="1.5" />
        <line x1={originX} y1={height - pad + 15} x2={originX} y2={pad - 15} stroke="currentColor" strokeWidth="1.5" />

        {/* Axis labels & arrowheads */}
        <text x={width - pad + 12} y={originY - 4} fontSize="9" fontWeight="bold" fill="currentColor">X</text>
        <text x={originX + 5} y={pad - 8} fontSize="9" fontWeight="bold" fill="currentColor">Y</text>
        <text x={originX - 8} y={originY + 10} fontSize="8" opacity="0.6" fill="currentColor">O</text>

        {/* Primary Line */}
        {line1 ? (
          <line
            x1={toX(line1.p1.x)}
            y1={toY(line1.p1.y)}
            x2={toX(line1.p2.x)}
            y2={toY(line1.p2.y)}
            stroke={line1.color || '#4f46e5'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ) : (
          /* Default line fallback when only intercepts given */
          xIntercept && yIntercept && (
            <line
              x1={toX(minX)}
              y1={toY(yIntercept.y - (minX / (xIntercept.x || 1)) * (yIntercept.y - 0))}
              x2={toX(maxX)}
              y2={toY(yIntercept.y - (maxX / (xIntercept.x || 1)) * (yIntercept.y - 0))}
              stroke="#4f46e5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )
        )}

        {/* Second Line if given (Simultaneous System) */}
        {line2 && (
          <line
            x1={toX(line2.p1.x)}
            y1={toY(line2.p1.y)}
            x2={toX(line2.p2.x)}
            y2={toY(line2.p2.y)}
            stroke={line2.color || '#10b981'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Plotted Points */}
        {allPoints.map((pt, idx) => (
          <g key={idx}>
            <circle cx={toX(pt.x)} cy={toY(pt.y)} r="3" fill="#ec4899" stroke="#ffffff" strokeWidth="1" />
            {pt.label && (
              <text
                x={toX(pt.x) + (pt.x >= 0 ? 5 : -5)}
                y={toY(pt.y) + (pt.y >= 0 ? -4 : 10)}
                textAnchor={pt.x >= 0 ? 'start' : 'end'}
                fontSize="8"
                fontWeight="bold"
                fill="#ec4899"
                fontFamily="monospace"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}

        {/* Intersection Point Highlight */}
        {intersection && (
          <g>
            <circle cx={toX(intersection.x)} cy={toY(intersection.y)} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            <rect
              x={toX(intersection.x) + 4}
              y={toY(intersection.y) - 16}
              width="48"
              height="14"
              rx="3"
              fill="#f59e0b"
            />
            <text
              x={toX(intersection.x) + 28}
              y={toY(intersection.y) - 6}
              textAnchor="middle"
              fontSize="7.5"
              fontWeight="bold"
              fill="#ffffff"
              fontFamily="monospace"
            >
              {intersection.label}
            </text>
          </g>
        )}

        {/* Equation Badge Header */}
        <g>
          <rect
            x={width / 2 - 45}
            y={compact ? 4 : 8}
            width="90"
            height="14"
            rx="3"
            fill="#4f46e5"
            opacity="0.95"
          />
          <text
            x={width / 2}
            y={compact ? 14 : 18}
            textAnchor="middle"
            fontSize="8"
            fontWeight="bold"
            fill="#ffffff"
            fontFamily="monospace"
          >
            {equation}
          </text>
        </g>
      </svg>
    </div>
  );
}
