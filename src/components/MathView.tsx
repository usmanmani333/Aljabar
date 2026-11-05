import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

function normalizeMathSymbols(str: string): string {
  return str
    .replace(/√(\d+|[a-zA-Z]+|\([^)]+\))/g, '\\sqrt{$1}')
    .replace(/√/g, '\\sqrt{}')
    .replace(/≤/g, '\\le ')
    .replace(/≥/g, '\\ge ')
    .replace(/≠/g, '\\ne ')
    .replace(/×/g, '\\times ')
    .replace(/÷/g, '\\div ')
    .replace(/π/g, '\\pi ')
    .replace(/θ/g, '\\theta ')
    .replace(/±/g, '\\pm ')
    .replace(/\.\.\./g, '\\dots ');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Intelligent LaTeX & Math renderer
 * Handles:
 * - $...$ inline math
 * - $$...$$ display math
 * - \(...\) and \[...\] standard LaTeX delimiters
 * - Raw math formulas starting with \ or containing math operators
 * - Mathematical statements, fractions, surds, matrices, and steps
 * - Preserves plain text sentences while typesetting embedded LaTeX expressions
 */
const MathViewComponent: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!math) return '';
    const trimmed = math.trim();

    // Helper to safely render KaTeX string
    const renderKaTeX = (expr: string, isDisplay: boolean) => {
      try {
        return katex.renderToString(expr.trim(), {
          displayMode: isDisplay,
          throwOnError: true,
          output: 'htmlAndMathml',
        });
      } catch (err) {
        // Fallback with throwOnError: false to highlight partial errors cleanly without crashing
        try {
          return katex.renderToString(expr.trim(), {
            displayMode: isDisplay,
            throwOnError: false,
            output: 'htmlAndMathml',
          });
        } catch {
          return `<span class="font-serif text-current">${escapeHtml(expr)}</span>`;
        }
      }
    };

    // Case 1: Explicit LaTeX delimiters $...$, $$...$$, \(...\), \[...\]
    const hasDelimiters =
      trimmed.includes('$') ||
      trimmed.includes('\\(') ||
      trimmed.includes('\\[');

    if (hasDelimiters) {
      // Normalize \[...\] to $$...$$ and \(...\) to $...$
      const normalized = trimmed
        .replace(/\\\[([\s\S]+?)\\\]/g, '$$$$$1$$$$')
        .replace(/\\\(([\s\S]+?)\\\)/g, '$$$1$$');

      const segments: string[] = [];
      const regex = /\$\$([\s\S]+?)\$\$|\$([^\$]+?)\$/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(normalized)) !== null) {
        if (match.index > lastIndex) {
          segments.push(escapeHtml(normalized.substring(lastIndex, match.index)));
        }

        const isBlockExpr = Boolean(match[1]);
        const mathExpr = match[1] || match[2];
        segments.push(renderKaTeX(mathExpr, isBlockExpr || block));

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < normalized.length) {
        segments.push(escapeHtml(normalized.substring(lastIndex)));
      }

      return segments.join('');
    }

    // Case 2: Attempt direct KaTeX rendering for mathematical statements or expressions
    const normalized = normalizeMathSymbols(trimmed);
    try {
      return katex.renderToString(normalized, {
        displayMode: block,
        throwOnError: true,
        output: 'htmlAndMathml',
      });
    } catch (directErr) {
      // Direct render failed. Check if it's a labeled step like "Step 1: ...", "Substitute in (i): <math>", etc.
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx !== -1 && colonIdx < trimmed.length - 1) {
        const prefix = trimmed.substring(0, colonIdx + 1);
        const rest = trimmed.substring(colonIdx + 1).trim();
        try {
          const renderedRest = katex.renderToString(normalizeMathSymbols(rest), {
            displayMode: block,
            throwOnError: true,
            output: 'htmlAndMathml',
          });
          return `${escapeHtml(prefix)} ${renderedRest}`;
        } catch {
          // continue to next fallback
        }
      }

      // If it doesn't contain any backslash LaTeX commands, treat as plain text sentence
      if (!trimmed.includes('\\')) {
        return escapeHtml(trimmed);
      }

      // Fallback with throwOnError: false
      try {
        return katex.renderToString(normalized, {
          displayMode: block,
          throwOnError: false,
          output: 'htmlAndMathml',
        });
      } catch {
        return escapeHtml(trimmed);
      }
    }
  }, [math, block]);

  return (
    <span
      className={`inline-block text-current ${block ? 'my-2 block text-center' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export const MathView = React.memo(MathViewComponent, (prev, next) => {
  return prev.math === next.math && prev.block === next.block && prev.className === next.className;
});
