export type ProblemCategory =
  | 'algebraic'
  | 'word_problem'
  | 'trigonometry'
  | 'geometry'
  | 'statistics'
  | 'probability'
  | 'logic'
  | 'multiple_choice';

export type ProblemDifficulty = 'Core' | 'Standard' | 'Challenging';

export interface ProblemStep {
  stepNumber: number;
  title: string;
  prompt: string;
  expectedFormat: 'number' | 'latex' | 'choice' | 'text' | 'coordinate';
  acceptedAnswers: string[];
  options?: string[]; // For choice steps
  hint: string;
  detailedExplanation: string;
  commonMistakes?: { mistake: string; feedback: string }[];
}

export interface DiagramConfig {
  type: 'number_line' | 'right_triangle' | 'venn' | 'coordinate_plane' | 'histogram' | 'formula_box';
  data: Record<string, any>;
}

export interface Problem {
  id: string;
  unitId: number;
  unitTitle: string;
  exerciseId: string;
  exerciseTitle: string;
  questionNumber: number;
  subPart?: string;
  statementLatex: string;
  category: ProblemCategory;
  difficulty: ProblemDifficulty;
  officialAnswer: string;
  officialAnswerExplanation?: string;
  steps: ProblemStep[];
  diagram?: DiagramConfig;
}

export interface UnitInfo {
  id: number;
  name: string;
  urduName?: string;
  exercises: string[];
  description: string;
  iconName: string;
  color: string;
}

export interface StudentProgress {
  solvedProblemIds: string[];
  bookmarkedProblemIds: string[];
  attempts: Record<string, {
    completed: boolean;
    mistakesCount: number;
    hintsUsed: number;
    lastAttemptedAt: string;
    studentNotes?: string;
  }>;
}

export interface StepFeedbackResult {
  isCorrect: boolean;
  feedback: string;
  guidance: string;
  identifiedError?: string | null;
  source?: 'gemini' | 'local-engine';
}
