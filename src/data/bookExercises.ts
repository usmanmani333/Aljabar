import { UNIT_1_EXERCISES } from './exercises/unit1';
import { UNIT_2_EXERCISES } from './exercises/unit2';
import { UNIT_3_EXERCISES } from './exercises/unit3';
import { UNIT_4_EXERCISES } from './exercises/unit4';
import { UNIT_5_EXERCISES } from './exercises/unit5';
import { UNIT_6_EXERCISES } from './exercises/unit6';
import { UNIT_7_EXERCISES } from './exercises/unit7';
import { UNIT_8_EXERCISES } from './exercises/unit8';
import { UNIT_9_EXERCISES } from './exercises/unit9';
import { UNIT_10_EXERCISES } from './exercises/unit10';
import { UNIT_11_EXERCISES } from './exercises/unit11';
import { UNIT_12_EXERCISES } from './exercises/unit12';
import { UNIT_13_EXERCISES } from './exercises/unit13';

import { MathDiagramConfig } from '../components/MathDiagram';

export interface BookSubPart {
  id: string;
  partLabel: string;
  statementLatex: string;
  hint?: string;
  solutionSteps?: string[];
  finalAnswer?: string;
  diagram?: MathDiagramConfig;
}

export interface BookQuestion {
  id: string;
  questionNumber: number | string;
  mainInstruction: string;
  singleStatementLatex?: string;
  hint?: string;
  solutionSteps?: string[];
  finalAnswer?: string;
  subParts?: BookSubPart[];
  note?: string;
  diagram?: MathDiagramConfig;
}

export interface BookExerciseSection {
  id: string;
  unitId: number;
  unitTitle: string;
  urduTitle: string;
  exerciseId: string;
  pageNumber: number;
  headline: string;
  keyFormulas?: { label: string; formulaLatex: string }[];
  questions: BookQuestion[];
}

/**
 * Complete, verified collection of every single exercise from
 * MATHEMATICS 9 - Punjab Curriculum and Textbook Board, Lahore (National Curriculum 2023)
 * Covering all 13 Units:
 * Unit 1: Real Numbers (Ex 1.1, 1.2, 1.3, Review 1)
 * Unit 2: Logarithms (Ex 2.1, 2.2, 2.3, 2.4, Review 2)
 * Unit 3: Sets and Functions (Ex 3.1, 3.2, 3.3, Review 3)
 * Unit 4: Factorization & Algebraic Manipulation (Ex 4.1, 4.2, 4.3, 4.4, Review 4)
 * Unit 5: Linear Equations and Inequalities (Ex 5.1, 5.2, Review 5)
 * Unit 6: Trigonometry (Ex 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, Review 6)
 * Unit 7: Coordinate Geometry (Ex 7.1, 7.2, 7.3, Review 7)
 * Unit 8: Linear Graphs & Their Application (Ex 8.1, 8.2, Review 8)
 * Unit 9: Similar Figures (Ex 9.1, 9.2, 9.3, 9.4, Review 9)
 * Unit 10: Graphs of Functions & Congruence (Ex 10.1, 10.2, Review 10)
 * Unit 11: Circle Geometry & Construction (Ex 11.1, 11.2, Review 11)
 * Unit 12: Information Handling (Ex 12.1, 12.2, Review 12)
 * Unit 13: Probability (Ex 13.1, 13.2, Review 13)
 */
export const BOOK_EXERCISES: BookExerciseSection[] = [
  ...UNIT_1_EXERCISES,
  ...UNIT_2_EXERCISES,
  ...UNIT_3_EXERCISES,
  ...UNIT_4_EXERCISES,
  ...UNIT_5_EXERCISES,
  ...UNIT_6_EXERCISES,
  ...UNIT_7_EXERCISES,
  ...UNIT_8_EXERCISES,
  ...UNIT_9_EXERCISES,
  ...UNIT_10_EXERCISES,
  ...UNIT_11_EXERCISES,
  ...UNIT_12_EXERCISES,
  ...UNIT_13_EXERCISES,
];
