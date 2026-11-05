import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Route: POST /api/check-step
 * Automated feedback for intermediate mathematical reasoning or step solution
 */
app.post('/api/check-step', async (req, res) => {
  try {
    const {
      problemTitle,
      problemStatement,
      stepNumber,
      stepTitle,
      stepPrompt,
      expectedAnswer,
      studentInput,
      workingHistory,
    } = req.body;

    if (!studentInput || typeof studentInput !== 'string') {
      return res.status(400).json({ error: 'Student input is required' });
    }

    // If Gemini client is available, call gemini-3.8-flash for rich mathematical diagnostics
    if (ai) {
      try {
        const prompt = `You are a warm, encouraging high school mathematics teacher evaluating a Grade 9 student's work on the Punjab Curriculum and Textbook Board (PCTB) Mathematics 9 curriculum.
The student is solving this exercise:
Problem: ${problemTitle || 'Exercise Problem'}
Problem Statement: ${problemStatement}
Current Step ${stepNumber}: ${stepTitle}
Step Goal/Question: ${stepPrompt}
Expected/Target Result for this step: ${expectedAnswer}

Student's Working / Answer for this step:
"${studentInput}"

${workingHistory ? `Previous Steps Completed:\n${JSON.stringify(workingHistory)}` : ''}

Evaluate the student's input:
1. Is it mathematically correct, equivalent, or a valid step toward the goal? (Note: Accept standard mathematical variations such as equivalent fractions like 4/9, standard algebraic forms, decimals if appropriate, or correct algebraic simplification).
2. If incorrect or partially correct, pinpoint the exact algebraic/arithmetic or conceptual mistake (e.g. sign error, missed distribution, incorrect formula application, inverted reciprocal).
3. Provide a warm, constructive, 1-2 sentence feedback message for the high school student.
4. Give a subtle nudge or next action guidance without giving away the final answer immediately.

Return your response in pure JSON format with this exact structure:
{
  "isCorrect": boolean,
  "confidence": number (0 to 1),
  "feedback": "constructive 1-2 sentence explanation tailored to the student",
  "guidance": "actionable tip on what to do next",
  "identifiedError": "brief description of misconception or null if correct"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const text = response.text?.trim() || '{}';
        const parsed = JSON.parse(text);
        return res.json({
          source: 'gemini',
          isCorrect: Boolean(parsed.isCorrect),
          feedback: parsed.feedback || (parsed.isCorrect ? 'Great job! Your step is correct.' : 'Check your arithmetic or signs.'),
          guidance: parsed.guidance || 'Review the given values and formula.',
          identifiedError: parsed.identifiedError || null,
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call warning, falling back to rule-based engine:', geminiError?.message);
      }
    }

    // Intelligent fallback rule-based matching if Gemini is unavailable
    const cleanStudent = studentInput.trim().toLowerCase().replace(/\s+/g, '');
    const cleanExpected = (expectedAnswer || '').toString().trim().toLowerCase().replace(/\s+/g, '');

    const isMatch = cleanStudent === cleanExpected ||
      cleanStudent.includes(cleanExpected) ||
      cleanExpected.includes(cleanStudent);

    return res.json({
      source: 'local-engine',
      isCorrect: isMatch,
      feedback: isMatch
        ? 'Well done! That matches the required step for this exercise.'
        : `Let's check this step carefully. You entered "${studentInput}". Compare with the expected format or review the formula.`,
      guidance: isMatch
        ? 'Proceed to the next step!'
        : 'Double check intermediate calculations or signs.',
      identifiedError: isMatch ? null : 'Answer does not match expected result.',
    });
  } catch (error: any) {
    console.error('Error in /api/check-step:', error);
    return res.status(500).json({
      error: 'Failed to evaluate step',
      details: error?.message || 'Server error',
    });
  }
});

/**
 * Route: POST /api/get-hint
 * Provides intelligent pedagogical hints tailored to high schoolers
 */
app.post('/api/get-hint', async (req, res) => {
  try {
    const { problemTitle, problemStatement, stepTitle, stepPrompt, hintTier, standardHint } = req.body;

    if (ai) {
      try {
        const prompt = `You are a high school mathematics tutor for Grade 9 students (PCTB Mathematics curriculum).
Problem: ${problemTitle}
Problem Statement: ${problemStatement}
Current Step: ${stepTitle} - ${stepPrompt}
Requested Hint Level: ${hintTier === 1 ? 'Concept / Formula reminder' : 'Calculation step guidance'}

Provide a clear, pedagogical hint in 1-2 concise sentences.
CRITICAL RULE: NEVER reveal the final answer, solution, or result. Always guide the student with the mathematical rule or first step so they compute and solve it themselves. If math is included, format in LaTeX like $x = 3$.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.3,
          },
        });

        const hintText = response.text?.trim();
        if (hintText) {
          return res.json({ hint: hintText, source: 'gemini' });
        }
      } catch (e: any) {
        console.warn('AI hint fallback:', e?.message);
      }
    }

    return res.json({
      hint: standardHint || 'Review the relevant formula and substitute the given values step by step.',
      source: 'local-engine',
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to generate hint' });
  }
});

// Vite Middleware for development
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // Production static file serving
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Digital Math Book app running at http://localhost:${port}`);
});
