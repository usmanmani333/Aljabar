import { BookExerciseSection } from '../bookExercises';

export const UNIT_13_EXERCISES: BookExerciseSection[] = [
  {
    id: 'u13-ex13.1',
    unitId: 13,
    unitTitle: 'Probability',
    urduTitle: 'احتمال',
    exerciseId: 'EXERCISE 13.1',
    pageNumber: 251,
    headline: 'Classical Single Event Probability and Complementary Events',
    keyFormulas: [
      { label: 'Event Probability', formulaLatex: 'P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{Favorable Outcomes}}{\\text{Total Sample Space Outcomes}}' },
      { label: 'Complementary Event', formulaLatex: 'P(E\') = 1 - P(E)' },
      { label: 'Range of Probability', formulaLatex: '0 \\le P(E) \\le 1' },
      { label: 'Certain Event', formulaLatex: 'P(S) = 1, \\quad P(\\emptyset) = 0' },
    ],
    questions: [
      {
        id: 'u13-ex13.1-q1',
        questionNumber: 1,
        mainInstruction: 'Solve the lettered die consonant probability problem:',
        singleStatementLatex: 'Arshad rolls a 6-sided die, with faces labelled $L, M, N, O, P, U$. What is the probability that the die lands on a consonant?',
        solutionSteps: [
          '\\text{Sample space } S = \\{L, M, N, O, P, U\\} \\implies n(S) = 6',
          '\\text{Vowels in } S: \\{O, U\\}',
          '\\text{Consonants in } S: E = \\{L, M, N, P\\} \\implies n(E) = 4',
          'P(E) = \\frac{n(E)}{n(S)} = \\frac{4}{6} = \\frac{2}{3}',
        ],
        finalAnswer: '\\frac{2}{3}',
      },
      {
        id: 'u13-ex13.1-q2',
        questionNumber: 2,
        mainInstruction: 'A fair six-sided numerical die is rolled once. Find the probability of getting:',
        subParts: [
          {
            id: 'u13-ex13.1-q2-i',
            partLabel: '(i)',
            statementLatex: '\\text{An odd number}',
            solutionSteps: [
              '\\text{Sample space } S = \\{1, 2, 3, 4, 5, 6\\} \\implies n(S) = 6',
              '\\text{Event } E = \\text{odd numbers} = \\{1, 3, 5\\} \\implies n(E) = 3',
              'P(E) = \\frac{3}{6} = \\frac{1}{2}',
            ],
            finalAnswer: '\\frac{1}{2}',
          },
          {
            id: 'u13-ex13.1-q2-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{A number greater than } 4',
            solutionSteps: [
              '\\text{Event } E = \\{5, 6\\} \\implies n(E) = 2',
              'P(E) = \\frac{2}{6} = \\frac{1}{3}',
            ],
            finalAnswer: '\\frac{1}{3}',
          },
          {
            id: 'u13-ex13.1-q2-iii',
            partLabel: '(iii)',
            statementLatex: '\\text{A multiple of } 3',
            solutionSteps: [
              '\\text{Event } E = \\{3, 6\\} \\implies n(E) = 2',
              'P(E) = \\frac{2}{6} = \\frac{1}{3}',
            ],
            finalAnswer: '\\frac{1}{3}',
          },
          {
            id: 'u13-ex13.1-q2-iv',
            partLabel: '(iv)',
            statementLatex: '\\text{A prime number}',
            solutionSteps: [
              '\\text{Prime numbers on a die: } E = \\{2, 3, 5\\} \\implies n(E) = 3',
              'P(E) = \\frac{3}{6} = \\frac{1}{2}',
            ],
            finalAnswer: '\\frac{1}{2}',
          },
        ],
      },
      {
        id: 'u13-ex13.1-q3',
        questionNumber: 3,
        mainInstruction: 'Solve the complementary event probability problem:',
        singleStatementLatex: 'Aslam rolled a fair die. What is the probability of getting the numbers $3$ or $4$? Also find the probability of not getting the numbers $3$ or $4$ using $P(E\') = 1 - P(E)$.',
        solutionSteps: [
          'S = \\{1, 2, 3, 4, 5, 6\\} \\implies n(S) = 6',
          '\\text{Event } E = \\{3, 4\\} \\implies n(E) = 2',
          'P(E) = \\frac{n(E)}{n(S)} = \\frac{2}{6} = \\frac{1}{3}',
          '\\text{Complementary event } E\' = \\text{not getting } 3 \\text{ or } 4',
          'P(E\') = 1 - P(E) = 1 - \\frac{1}{3} = \\frac{2}{3}',
        ],
        finalAnswer: 'P(E) = \\frac{1}{3}, \\quad P(E\') = \\frac{2}{3}',
      },
      {
        id: 'u13-ex13.1-q4',
        questionNumber: 4,
        mainInstruction: 'A card is drawn at random from a well-shuffled standard deck of 52 playing cards. Find the probability of drawing:',
        subParts: [
          {
            id: 'u13-ex13.1-q4-i',
            partLabel: '(i)',
            statementLatex: '\\text{An Ace}',
            solutionSteps: [
              '\\text{Total cards } n(S) = 52',
              '\\text{Total Aces in deck } n(E) = 4',
              'P(\\text{Ace}) = \\frac{4}{52} = \\frac{1}{13}',
            ],
            finalAnswer: '\\frac{1}{13}',
          },
          {
            id: 'u13-ex13.1-q4-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{A red card}',
            solutionSteps: [
              '\\text{Red cards (Hearts + Diamonds) } n(E) = 13 + 13 = 26',
              'P(\\text{Red card}) = \\frac{26}{52} = \\frac{1}{2}',
            ],
            finalAnswer: '\\frac{1}{2}',
          },
          {
            id: 'u13-ex13.1-q4-iii',
            partLabel: '(iii)',
            statementLatex: '\\text{A spade}',
            solutionSteps: [
              '\\text{Total Spades in deck } n(E) = 13',
              'P(\\text{Spade}) = \\frac{13}{52} = \\frac{1}{4}',
            ],
            finalAnswer: '\\frac{1}{4}',
          },
          {
            id: 'u13-ex13.1-q4-iv',
            partLabel: '(iv)',
            statementLatex: '\\text{A face card (Jack, Queen, or King)}',
            solutionSteps: [
              '\\text{Each suit has 3 face cards } (J, Q, K)',
              '\\text{Total face cards } n(E) = 4 \\times 3 = 12',
              'P(\\text{Face card}) = \\frac{12}{52} = \\frac{3}{13}',
            ],
            finalAnswer: '\\frac{3}{13}',
          },
        ],
      },
      {
        id: 'u13-ex13.1-q5',
        questionNumber: 5,
        mainInstruction: 'Solve the student selection probability problem:',
        singleStatementLatex: 'In a class of $40$ students, $24$ are girls and $16$ are boys. A student is selected at random as class representative. Find the probability that the selected student is: (i) a girl, (ii) a boy.',
        solutionSteps: [
          '\\text{Total students } n(S) = 40',
          '\\text{(i) Number of girls } n(G) = 24 \\implies P(\\text{Girl}) = \\frac{24}{40} = \\frac{3}{5} = 0.6',
          '\\text{(ii) Number of boys } n(B) = 16 \\implies P(\\text{Boy}) = \\frac{16}{40} = \\frac{2}{5} = 0.4',
          '\\text{Verification: } P(G) + P(B) = 0.6 + 0.4 = 1.0',
        ],
        finalAnswer: 'P(\\text{Girl}) = \\frac{3}{5}, \\quad P(\\text{Boy}) = \\frac{2}{5}',
      },
    ],
  },
  {
    id: 'u13-ex13.2',
    unitId: 13,
    unitTitle: 'Probability',
    urduTitle: 'احتمال',
    exerciseId: 'EXERCISE 13.2',
    pageNumber: 257,
    headline: 'Experimental Probability, Relative Frequency & Expected Values',
    keyFormulas: [
      { label: 'Relative / Empirical Probability', formulaLatex: 'P(E) = \\frac{\\text{Number of times event occurred}}{\\text{Total number of trials}}' },
      { label: 'Expected Frequency', formulaLatex: 'E = n \\times P' },
    ],
    questions: [
      {
        id: 'u13-ex13.2-q1',
        questionNumber: 1,
        mainInstruction: 'A coin is tossed 200 times and Head appears 112 times in the trial:',
        subParts: [
          {
            id: 'u13-ex13.2-q1-i',
            partLabel: '(i)',
            statementLatex: '\\text{Find the experimental probability of getting a Head.}',
            solutionSteps: [
              '\\text{Total trials } n = 200',
              '\\text{Number of Heads } = 112',
              'P(\\text{Head}) = \\frac{112}{200} = \\frac{14}{25} = 0.56',
            ],
            finalAnswer: '\\frac{14}{25} = 0.56',
          },
          {
            id: 'u13-ex13.2-q1-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{Find the experimental probability of getting a Tail.}',
            solutionSteps: [
              '\\text{Number of Tails } = 200 - 112 = 88',
              'P(\\text{Tail}) = \\frac{88}{200} = \\frac{11}{25} = 0.44',
              '\\text{Or via complement: } 1 - 0.56 = 0.44',
            ],
            finalAnswer: '\\frac{11}{25} = 0.44',
          },
        ],
      },
      {
        id: 'u13-ex13.2-q2',
        questionNumber: 2,
        mainInstruction: 'Expected frequency calculation for large number of trials:',
        subParts: [
          {
            id: 'u13-ex13.2-q2-i',
            partLabel: '(i)',
            statementLatex: '\\text{A fair die is rolled } 600 \\text{ times. How many times would you expect to roll a } 6?',
            solutionSteps: [
              '\\text{Theoretical probability of rolling a } 6: P = \\frac{1}{6}',
              '\\text{Total trials } n = 600',
              '\\text{Expected frequency } E = n \\times P = 600 \\times \\frac{1}{6} = 100',
            ],
            finalAnswer: '100 \\text{ times}',
          },
          {
            id: 'u13-ex13.2-q2-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{How many times would you expect to roll an even number in } 600 \\text{ rolls?}',
            solutionSteps: [
              '\\text{Probability of even number } \\{2, 4, 6\\}: P = \\frac{3}{6} = \\frac{1}{2}',
              '\\text{Expected frequency } E = 600 \\times \\frac{1}{2} = 300',
            ],
            finalAnswer: '300 \\text{ times}',
          },
          {
            id: 'u13-ex13.2-q2-iii',
            partLabel: '(iii)',
            statementLatex: '\\text{How many times would you expect to roll a number less than } 3 \\text{ in } 600 \\text{ rolls?}',
            solutionSteps: [
              '\\text{Numbers less than } 3: \\{1, 2\\} \\implies P = \\frac{2}{6} = \\frac{1}{3}',
              '\\text{Expected frequency } E = 600 \\times \\frac{1}{3} = 200',
            ],
            finalAnswer: '200 \\text{ times}',
          },
        ],
      },
      {
        id: 'u13-ex13.2-q3',
        questionNumber: 3,
        mainInstruction: 'A bag contains 5 red balls, 8 white balls, and 7 black balls. A ball is drawn at random from the bag. Find the probability that the ball drawn is:',
        subParts: [
          {
            id: 'u13-ex13.2-q3-i',
            partLabel: '(i)',
            statementLatex: '\\text{A white ball}',
            solutionSteps: [
              '\\text{Total balls } n(S) = 5 + 8 + 7 = 20',
              '\\text{White balls } n(W) = 8',
              'P(W) = \\frac{8}{20} = \\frac{2}{5} = 0.4',
            ],
            finalAnswer: '\\frac{2}{5}',
          },
          {
            id: 'u13-ex13.2-q3-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{A red or black ball}',
            solutionSteps: [
              '\\text{Number of red or black balls } = 5 + 7 = 12',
              'P(\\text{Red or Black}) = \\frac{12}{20} = \\frac{3}{5} = 0.6',
            ],
            finalAnswer: '\\frac{3}{5}',
          },
          {
            id: 'u13-ex13.2-q3-iii',
            partLabel: '(iii)',
            statementLatex: '\\text{Not a white ball}',
            solutionSteps: [
              'P(\\text{Not white}) = 1 - P(W) = 1 - \\frac{2}{5} = \\frac{3}{5}',
            ],
            finalAnswer: '\\frac{3}{5}',
          },
          {
            id: 'u13-ex13.2-q3-iv',
            partLabel: '(iv)',
            statementLatex: '\\text{Neither a red nor a black ball}',
            solutionSteps: [
              '\\text{Balls that are neither red nor black are exactly the white balls.}',
              'P(\\text{Neither red nor black}) = P(W) = \\frac{8}{20} = \\frac{2}{5}',
            ],
            finalAnswer: '\\frac{2}{5}',
          },
        ],
      },
      {
        id: 'u13-ex13.2-q4',
        questionNumber: 4,
        mainInstruction: 'Two coins are tossed simultaneously 100 times. Outcomes: 2 Heads (28 times), 1 Head (52 times), 0 Heads (20 times):',
        subParts: [
          {
            id: 'u13-ex13.2-q4-i',
            partLabel: '(i)',
            statementLatex: '\\text{Find the empirical probability of getting 2 Heads.}',
            solutionSteps: [
              '\\text{Total trials } n = 100',
              '\\text{Frequency of 2 Heads } = 28',
              'P(2\\text{ Heads}) = \\frac{28}{100} = \\frac{7}{25} = 0.28',
            ],
            finalAnswer: '\\frac{7}{25} = 0.28',
          },
          {
            id: 'u13-ex13.2-q4-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{Find the empirical probability of getting at least 1 Head.}',
            solutionSteps: [
              '\\text{At least 1 Head means 1 Head or 2 Heads.}',
              '\\text{Total favorable trials } = 52 + 28 = 80',
              'P(\\ge 1\\text{ Head}) = \\frac{80}{100} = \\frac{4}{5} = 0.80',
            ],
            finalAnswer: '\\frac{4}{5} = 0.8',
          },
        ],
      },
      {
        id: 'u13-ex13.2-q5',
        questionNumber: 5,
        mainInstruction: 'Solve the circular spinner probability problem:',
        singleStatementLatex: 'A circular spinner is divided into 5 equal sectors colored Red, Blue, Green, Yellow, and Orange. When spun once, find the probability that it lands on: (i) Blue, (ii) Red or Yellow, (iii) Not Green.',
        solutionSteps: [
          '\\text{Total equal sectors } n(S) = 5',
          '\\text{(i) } P(\\text{Blue}) = \\frac{1}{5} = 0.2',
          '\\text{(ii) } P(\\text{Red or Yellow}) = \\frac{2}{5} = 0.4',
          '\\text{(iii) } P(\\text{Not Green}) = 1 - P(\\text{Green}) = 1 - \\frac{1}{5} = \\frac{4}{5} = 0.8',
        ],
        finalAnswer: '(i) \\; \\frac{1}{5}, \\quad (ii) \\; \\frac{2}{5}, \\quad (iii) \\; \\frac{4}{5}',
        diagram: {
          type: 'spinner',
          title: '5-Sector Probability Spinner',
          caption: 'Circular spinner with equal 72° sectors (Red, Blue, Green, Yellow, Orange)',
          props: {
            sectors: ['Red', 'Blue', 'Green', 'Yellow', 'Orange'],
            colors: ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#f97316'],
          },
        },
      },
    ],
  },
  {
    id: 'u13-rev13',
    unitId: 13,
    unitTitle: 'Probability',
    urduTitle: 'احتمال',
    exerciseId: 'REVIEW EXERCISE 13',
    pageNumber: 260,
    headline: 'Review Exercise 13: Probability Mastery',
    questions: [
      {
        id: 'u13-rev13-q1',
        questionNumber: 1,
        mainInstruction: 'Select the correct option for each question:',
        subParts: [
          {
            id: 'u13-rev13-q1-i',
            partLabel: '(i)',
            statementLatex: '\\text{The probability of an impossible event is: (a) } 1, \\; \\text{(b) } 0, \\; \\text{(c) } 1/2, \\; \\text{(d) } -1',
            solutionSteps: [
              '\\text{An impossible event cannot occur, so its number of favorable outcomes is 0.}',
              'P(\\emptyset) = \\frac{0}{n(S)} = 0',
            ],
            finalAnswer: '\\text{(b) } 0',
          },
          {
            id: 'u13-rev13-q1-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{If } P(E) = 0.65, \\text{ then } P(E\') = \\text{ (a) } 0.35, \\; \\text{(b) } 0.45, \\; \\text{(c) } 0.65, \\; \\text{(d) } 1',
            solutionSteps: [
              'P(E\') = 1 - P(E) = 1 - 0.65 = 0.35',
            ],
            finalAnswer: '\\text{(a) } 0.35',
          },
          {
            id: 'u13-rev13-q1-iii',
            partLabel: '(iii)',
            statementLatex: '\\text{The sum of probabilities of all elementary outcomes of an experiment is: (a) } 0, \\; \\text{(b) } 1, \\; \\text{(c) } 100',
            solutionSteps: [
              '\\sum P(E_i) = P(S) = 1',
            ],
            finalAnswer: '\\text{(b) } 1',
          },
          {
            id: 'u13-rev13-q1-iv',
            partLabel: '(iv)',
            statementLatex: '\\text{The probability of getting a number } 7 \\text{ on rolling a normal die is: (a) } 1/6, \\; \\text{(b) } 0, \\; \\text{(c) } 1',
            solutionSteps: [
              '\\text{Faces on a die are } \\{1, 2, 3, 4, 5, 6\\}. \\text{ Rolling a 7 is impossible.}',
            ],
            finalAnswer: '\\text{(b) } 0',
          },
          {
            id: 'u13-rev13-q1-v',
            partLabel: '(v)',
            statementLatex: '\\text{If a coin is tossed twice, total possible outcomes are: (a) } 2, \\; \\text{(b) } 4, \\; \\text{(c) } 8, \\; \\text{(d) } 6',
            solutionSteps: [
              'n(S) = 2^2 = 4 \\quad \\{HH, HT, TH, TT\\}',
            ],
            finalAnswer: '\\text{(b) } 4',
          },
          {
            id: 'u13-rev13-q1-vi',
            partLabel: '(vi)',
            statementLatex: '\\text{For any event } E, \\; 0 \\le P(E) \\le \\text{ (a) } 1, \\; \\text{(b) } 10, \\; \\text{(c) } 100',
            solutionSteps: [
              '\\text{Probability always ranges strictly between 0 (impossible) and 1 (certain).}',
            ],
            finalAnswer: '\\text{(a) } 1',
          },
        ],
      },
      {
        id: 'u13-rev13-q2',
        questionNumber: 2,
        mainInstruction: 'Explain theoretical versus experimental probability:',
        singleStatementLatex: 'Explain the difference between classical (theoretical) probability and experimental (empirical) probability with a concrete real-world example.',
        solutionSteps: [
          '\\text{1. Theoretical Probability: Based on logical reasoning assuming all outcomes are equally likely.}',
          'P(\\text{Head}) = \\frac{1}{2} = 0.5',
          '\\text{2. Experimental Probability: Based on actual observations or repeated experimental trials.}',
          'P(\\text{Head}) = \\frac{\\text{Heads observed}}{\\text{Total tosses}}',
          '\\text{Example: If a coin tossed 10 times gives 6 heads, experimental probability is } \\frac{6}{10} = 0.6, \\text{ while theoretical probability remains } 0.5.',
          '\\text{By the Law of Large Numbers, experimental probability approaches theoretical probability as trials increase.}',
        ],
        finalAnswer: '\\text{Theoretical is based on expected symmetry; Experimental is based on actual recorded trials.}',
      },
      {
        id: 'u13-rev13-q3',
        questionNumber: 3,
        mainInstruction: 'Two fair dice are thrown simultaneously. Find the probability that the sum of dots on top faces is:',
        diagram: {
          type: 'sample-space',
          title: 'Two Dice Sample Space Grid (36 Total Outcomes)',
          caption: 'Visualizing 6×6 outcomes matrix with diagonal pairs for sum = 7 highlighted',
          props: {
            highlightCondition: 'sum = 7',
          },
        },
        subParts: [
          {
            id: 'u13-rev13-q3-i',
            partLabel: '(i)',
            statementLatex: '\\text{Equal to } 7',
            solutionSteps: [
              '\\text{Total outcomes } n(S) = 6 \\times 6 = 36',
              '\\text{Pairs with sum 7: } \\{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\\} \\implies n(E) = 6',
              'P(\\text{Sum } = 7) = \\frac{6}{36} = \\frac{1}{6}',
            ],
            finalAnswer: '\\frac{1}{6}',
          },
          {
            id: 'u13-rev13-q3-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{Equal to } 11',
            solutionSteps: [
              '\\text{Pairs with sum 11: } \\{(5,6), (6,5)\\} \\implies n(E) = 2',
              'P(\\text{Sum } = 11) = \\frac{2}{36} = \\frac{1}{18}',
            ],
            finalAnswer: '\\frac{1}{18}',
          },
          {
            id: 'u13-rev13-q3-iii',
            partLabel: '(iii)',
            statementLatex: '\\text{Greater than } 9',
            solutionSteps: [
              '\\text{Possible sums }> 9 \\text{ are } 10, 11, 12',
              '\\text{Sum 10: } \\{(4,6), (5,5), (6,4)\\} \\; (3)',
              '\\text{Sum 11: } \\{(5,6), (6,5)\\} \\; (2)',
              '\\text{Sum 12: } \\{(6,6)\\} \\; (1)',
              '\\text{Total favorable } n(E) = 3 + 2 + 1 = 6',
              'P(\\text{Sum } > 9) = \\frac{6}{36} = \\frac{1}{6}',
            ],
            finalAnswer: '\\frac{1}{6}',
          },
          {
            id: 'u13-rev13-q3-iv',
            partLabel: '(iv)',
            statementLatex: '\\text{A doublet (both numbers identical)}',
            solutionSteps: [
              '\\text{Doublets: } \\{(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)\\} \\implies n(E) = 6',
              'P(\\text{Doublet}) = \\frac{6}{36} = \\frac{1}{6}',
            ],
            finalAnswer: '\\frac{1}{6}',
          },
        ],
      },
      {
        id: 'u13-rev13-q4',
        questionNumber: 4,
        mainInstruction: 'A box contains 25 identical slips numbered from 1 to 25. One slip is drawn at random. Find the probability that the number on the slip is:',
        subParts: [
          {
            id: 'u13-rev13-q4-i',
            partLabel: '(i)',
            statementLatex: '\\text{A prime number}',
            solutionSteps: [
              'S = \\{1, 2, 3, \\dots, 25\\} \\implies n(S) = 25',
              '\\text{Primes in 1 to 25: } \\{2, 3, 5, 7, 11, 13, 17, 19, 23\\} \\implies n(E) = 9',
              'P(\\text{Prime}) = \\frac{9}{25} = 0.36',
            ],
            finalAnswer: '\\frac{9}{25}',
          },
          {
            id: 'u13-rev13-q4-ii',
            partLabel: '(ii)',
            statementLatex: '\\text{Divisible by } 5',
            solutionSteps: [
              '\\text{Multiples of 5: } \\{5, 10, 15, 20, 25\\} \\implies n(E) = 5',
              'P(\\text{Divisible by 5}) = \\frac{5}{25} = \\frac{1}{5}',
            ],
            finalAnswer: '\\frac{1}{5}',
          },
          {
            id: 'u13-rev13-q4-iii',
            partLabel: '(iii)',
            statementLatex: '\\text{A perfect square}',
            solutionSteps: [
              '\\text{Perfect squares in 1 to 25: } \\{1, 4, 9, 16, 25\\} \\implies n(E) = 5',
              'P(\\text{Perfect square}) = \\frac{5}{25} = \\frac{1}{5}',
            ],
            finalAnswer: '\\frac{1}{5}',
          },
        ],
      },
    ],
  },
];
