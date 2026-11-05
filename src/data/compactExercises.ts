export interface CompactSubPart {
  label: string;
  math: string;
}

export interface CompactTable {
  headers: string[];
  rows: (string | number)[][];
}

export interface CompactQuestion {
  questionNumber: number;
  instruction: string;
  statement?: string;
  subParts?: CompactSubPart[];
  table?: CompactTable;
  options?: string[];
  note?: string;
}

export interface CompactExercise {
  id: string;
  unitId: number;
  unitTitle: string;
  urduTitle: string;
  exerciseTitle: string; // e.g. "EXERCISE 1.1"
  pageNumber: number;
  subtitle: string;
  keyFormulas?: string[];
  questions: CompactQuestion[];
}

export const COMPACT_EXERCISES: CompactExercise[] = [
  // ================= UNIT 1: REAL NUMBERS =================
  {
    id: 'ex-1.1',
    unitId: 1,
    unitTitle: 'Real Numbers',
    urduTitle: 'حقیقی اعداد',
    exerciseTitle: 'EXERCISE 1.1',
    pageNumber: 10,
    subtitle: 'Identification of Rational/Irrational Numbers, Real Line & Properties',
    keyFormulas: [
      '\\mathbb{Q} = \\{ \\frac{p}{q} \\mid p, q \\in \\mathbb{Z} \\wedge q \\ne 0 \\}',
      '\\text{Commutative: } a + b = b + a, \\; ab = ba',
      '\\text{Associative: } (a + b) + c = a + (b + c)',
      '\\text{Distributive: } a(b + c) = ab + ac',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Identify each of the following as a rational or irrational number:',
        subParts: [
          { label: '(i)', math: '2.353535' },
          { label: '(ii)', math: '0.\\bar{6}' },
          { label: '(iii)', math: '2.236067...' },
          { label: '(iv)', math: '\\sqrt{7}' },
          { label: '(v)', math: 'e' },
          { label: '(vi)', math: '\\pi' },
          { label: '(vii)', math: '5 + \\sqrt{11}' },
          { label: '(viii)', math: '\\sqrt{3} + \\sqrt{13}' },
          { label: '(ix)', math: '\\frac{15}{4}' },
          { label: '(x)', math: '(2 - \\sqrt{2})(2 + \\sqrt{2})' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Represent the following numbers on number line:',
        subParts: [
          { label: '(i)', math: '\\sqrt{2}' },
          { label: '(ii)', math: '\\sqrt{3}' },
          { label: '(iii)', math: '4\\frac{1}{3}' },
          { label: '(iv)', math: '-2\\frac{1}{7}' },
          { label: '(v)', math: '\\frac{5}{8}' },
          { label: '(vi)', math: '2\\frac{3}{4}' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'Express the following as a rational number \\frac{p}{q} where p and q are integers and q \\ne 0:',
        subParts: [
          { label: '(i)', math: '0.\\bar{4}' },
          { label: '(ii)', math: '0.\\overline{37}' },
          { label: '(iii)', math: '0.\\overline{21}' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Name the property used in the following:',
        subParts: [
          { label: '(i)', math: '(a + 4) + b = a + (4 + b)' },
          { label: '(ii)', math: '\\sqrt{2} + \\sqrt{3} = \\sqrt{3} + \\sqrt{2}' },
          { label: '(iii)', math: 'x - x = 0' },
          { label: '(iv)', math: 'a(b + c) = ab + ac' },
          { label: '(v)', math: '16 + 0 = 16' },
          { label: '(vi)', math: '100 \\times 1 = 100' },
          { label: '(vii)', math: '4 \\times (5 \\times 8) = (4 \\times 5) \\times 8' },
          { label: '(viii)', math: 'ab = ba' },
        ],
      },
      {
        questionNumber: 5,
        instruction: 'Name the property used in the following:',
        subParts: [
          { label: '(i)', math: '-3 < -1 \\Rightarrow 0 < 2' },
          { label: '(ii)', math: '\\text{If } a < b \\text{ then } \\frac{1}{a} > \\frac{1}{b}' },
          { label: '(iii)', math: '\\text{If } a < b \\text{ then } a + c < b + c' },
          { label: '(iv)', math: '\\text{If } ac < bc \\text{ and } c > 0 \\text{ then } a < b' },
          { label: '(v)', math: '\\text{If } ac < bc \\text{ and } c < 0 \\text{ then } a > b' },
          { label: '(vi)', math: '\\text{Either } a > b \\text{ or } a = b \\text{ or } a < b' },
        ],
      },
      {
        questionNumber: 6,
        instruction: 'Find two rational numbers between:',
        subParts: [
          { label: '(i)', math: '\\frac{1}{3} \\text{ and } \\frac{1}{4}' },
          { label: '(ii)', math: '3 \\text{ and } 4' },
          { label: '(iii)', math: '\\frac{3}{5} \\text{ and } \\frac{4}{5}' },
        ],
      },
    ],
  },

  {
    id: 'ex-1.2',
    unitId: 1,
    unitTitle: 'Real Numbers',
    urduTitle: 'حقیقی اعداد',
    exerciseTitle: 'EXERCISE 1.2',
    pageNumber: 13,
    subtitle: 'Rationalization of Denominators, Surds & Laws of Indices',
    keyFormulas: [
      '(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b',
      'a^m \\cdot a^n = a^{m+n}, \\quad (a^m)^n = a^{mn}, \\quad \\frac{a^m}{a^n} = a^{m-n}',
      'a^{-n} = \\frac{1}{a^n}, \\quad a^0 = 1',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Rationalize the denominator of following:',
        subParts: [
          { label: '(i)', math: '\\frac{13}{4 + \\sqrt{3}}' },
          { label: '(ii)', math: '\\frac{\\sqrt{2} + \\sqrt{5}}{\\sqrt{3}}' },
          { label: '(iii)', math: '\\frac{\\sqrt{2} - 1}{\\sqrt{5}}' },
          { label: '(iv)', math: '\\frac{6 - 4\\sqrt{2}}{6 + 4\\sqrt{2}}' },
          { label: '(v)', math: '\\frac{\\sqrt{3} - \\sqrt{2}}{\\sqrt{3} + \\sqrt{2}}' },
          { label: '(vi)', math: '\\frac{4\\sqrt{3}}{\\sqrt{7} + \\sqrt{5}}' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Simplify the following:',
        subParts: [
          { label: '(i)', math: '\\left(\\frac{81}{16}\\right)^{-\\frac{3}{4}}' },
          { label: '(ii)', math: '\\left(\\frac{3}{4}\\right)^{-2} \\div \\left(\\frac{4}{9}\\right)^3 \\times \\frac{16}{27}' },
          { label: '(iii)', math: '(0.027)^{-\\frac{1}{3}}' },
          { label: '(iv)', math: '\\sqrt{\\frac{x^{14} \\times y^{21} \\times z^{35}}{y^{14} z^7}}' },
          { label: '(v)', math: '\\frac{5\\cdot(25)^{n+1} - 25\\cdot(5)^{2n}}{5\\cdot(5)^{2n+3} - (25)^{n+1}}' },
          { label: '(vi)', math: '\\frac{(16)^{x+1} + 20(4^{2x})}{2^{x-3} \\times 8^{x+2}}' },
          { label: '(vii)', math: '(64)^{-\\frac{2}{3}} \\div (9)^{-\\frac{3}{2}}' },
          { label: '(viii)', math: '\\frac{3^n \\times 9^{n+1}}{3^{n-1} \\times 9^{n-1}}' },
          { label: '(ix)', math: '\\frac{5^{n+3} - 6\\cdot 5^{n+1}}{9\\times 5^n - 4\\times 5^n}' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'If x = 3 + \\sqrt{8} then find the value of:',
        subParts: [
          { label: '(i)', math: 'x + \\frac{1}{x}' },
          { label: '(ii)', math: 'x - \\frac{1}{x}' },
          { label: '(iii)', math: 'x^2 + \\frac{1}{x^2}' },
          { label: '(iv)', math: 'x^2 - \\frac{1}{x^2}' },
          { label: '(v)', math: 'x^4 + \\frac{1}{x^4}' },
          { label: '(vi)', math: '\\left(x - \\frac{1}{x}\\right)^2' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Find the rational numbers p and q such that:',
        statement: '\\frac{8 - 3\\sqrt{2}}{4 + 3\\sqrt{2}} = p + q\\sqrt{2}',
      },
      {
        questionNumber: 5,
        instruction: 'Simplify the following:',
        subParts: [
          { label: '(i)', math: '\\frac{(25)^{\\frac{3}{2}} \\times (243)^{\\frac{3}{5}}}{(16)^{\\frac{5}{4}} \\times (8)^{\\frac{4}{3}}}' },
          { label: '(ii)', math: '\\frac{54x \\times \\sqrt[3]{(27)^{2x}}}{9^{x+1} + 216(3^{2x-1})}' },
          { label: '(iii)', math: '\\sqrt{\\frac{(216)^{\\frac{2}{3}} \\times (25)^{\\frac{1}{2}}}{(0.04)^{-\\frac{3}{2}}}}' },
          { label: '(iv)', math: '\\left(a^{\\frac{2}{3}} + b^{\\frac{2}{3}}\\right) \\times \\left(a^{\\frac{4}{3}} - a^{\\frac{2}{3}}b^{\\frac{2}{3}} + b^{\\frac{4}{3}}\\right)' },
        ],
      },
    ],
  },

  {
    id: 'ex-1.3',
    unitId: 1,
    unitTitle: 'Real Numbers',
    urduTitle: 'حقیقی اعداد',
    exerciseTitle: 'EXERCISE 1.3',
    pageNumber: 18,
    subtitle: 'Real-Life Word Problems: Geometry, Finance & Measurement',
    keyFormulas: [
      '\\text{Profit} = \\text{SP} - \\text{CP}, \\quad \\text{Profit \\%} = \\frac{\\text{Profit}}{\\text{CP}} \\times 100',
      '^\\circ\\text{F} = \\frac{9}{5}^\\circ\\text{C} + 32, \\quad \\text{K} = ^\\circ\\text{C} + 273',
      '\\text{Compound Amount} = P(1 + r)^t',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'The sum of three consecutive integers is forty-two, find the three integers.',
      },
      {
        questionNumber: 2,
        instruction: 'The diagram shows right angled \\triangle ABC in which the length of AC is (\\sqrt{3} + \\sqrt{5})\\text{ cm}. The area of \\triangle ABC is (1 + \\sqrt{15})\\text{ cm}^2. Find the length \\overline{AB} in the form (a\\sqrt{3} + b\\sqrt{5})\\text{ cm}, where a and b are integers.',
      },
      {
        questionNumber: 3,
        instruction: 'A rectangle has sides of length 2 + \\sqrt{18}\\text{ m} and \\left(5 - \\frac{4}{\\sqrt{2}}\\right)\\text{ m}. Express the area of the rectangle in the form a + b\\sqrt{2}, where a and b are integers.',
      },
      {
        questionNumber: 4,
        instruction: 'Find two numbers whose sum is 68 and difference is 22.',
      },
      {
        questionNumber: 5,
        instruction: 'The weather in Lahore was unusually warm during the summer of 2024. The TV news reported temperature as high as 48^\\circ\\text{C}. By using the formula \\left(^\\circ\\text{F} = \\frac{9}{5}^\\circ\\text{C} + 32\\right) find the temperature as Fahrenheit scale.',
      },
      {
        questionNumber: 6,
        instruction: 'The sum of the ages of the father and son is 72 years. Six years ago, the father\'s age was 2 times the age of the son. What was son\'s age six years ago?',
      },
      {
        questionNumber: 7,
        instruction: 'Mirha bought a toy for Rs. 1500 and sold for Rs. 1520. What was her profit percentage?',
      },
      {
        questionNumber: 8,
        instruction: 'The annual income of Tayyab is Rs. 9,60,000, while the exempted amount is Rs. 1,30,000. How much tax would he have to pay at the rate of 0.75%?',
      },
      {
        questionNumber: 9,
        instruction: 'Find the compound markup on Rs. 3,75,000 for one year at the rate of 14% compounded annually.',
      },
    ],
  },

  {
    id: 'rev-1',
    unitId: 1,
    unitTitle: 'Real Numbers',
    urduTitle: 'حقیقی اعداد',
    exerciseTitle: 'REVIEW EXERCISE 1',
    pageNumber: 19,
    subtitle: 'Comprehensive Multiple Choice & Review Problems',
    questions: [
      {
        questionNumber: 1,
        instruction: 'Four options are given against each statement. Encircle the correct option:',
        subParts: [
          { label: '(i)', math: '\\sqrt{7} \\text{ is: (a) integer, (b) rational number, (c) irrational number, (d) natural number}' },
          { label: '(ii)', math: '\\pi \\text{ and } e \\text{ are: (a) natural numbers, (b) integers, (c) rational numbers, (d) irrational numbers}' },
          { label: '(iii)', math: '\\text{If } n \\text{ is not a perfect square, then } \\sqrt{n} \\text{ is: (a) rational, (b) natural, (c) integer, (d) irrational}' },
          { label: '(iv)', math: '\\sqrt{3} + \\sqrt{5} \\text{ is: (a) whole number, (b) integer, (c) rational number, (d) irrational number}' },
          { label: '(v)', math: '\\text{For all } x \\in \\mathbb{R}, \\; x = x \\text{ is called: (a) reflexive property, (b) transitive, (c) symmetric, (d) trichotomy}' },
          { label: '(vii)', math: '2^x \\times 8^x = 64 \\text{ then } x = \\text{ (a) } \\frac{3}{2}, \\; \\text{(b) } \\frac{3}{4}, \\; \\text{(c) } \\frac{5}{6}, \\; \\text{(d) } \\frac{2}{3}' },
          { label: '(ix)', math: '\\sqrt{75} + \\sqrt{27} = \\text{ (a) } \\sqrt{102}, \\; \\text{(b) } 9\\sqrt{3}, \\; \\text{(c) } 5\\sqrt{3}, \\; \\text{(d) } 8\\sqrt{3}' },
          { label: '(x)', math: '\\text{The product of } (3 + \\sqrt{5})(3 - \\sqrt{5}) \\text{ is: (a) prime, (b) odd, (c) irrational, (d) rational}' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Is 0 a rational number? Explain.',
      },
      {
        questionNumber: 5,
        instruction: 'State trichotomy property of real numbers.',
      },
      {
        questionNumber: 6,
        instruction: 'Find two rational numbers between 4 and 5.',
      },
      {
        questionNumber: 8,
        instruction: 'The sum of three consecutive odd integers is 51. Find the three integers.',
      },
      {
        questionNumber: 9,
        instruction: 'Abdullah picked up 96 balls and placed them into two buckets. One bucket has twenty-eight more balls than the other bucket. How many balls were in each bucket?',
      },
    ],
  },

  // ================= UNIT 2: LOGARITHMS =================
  {
    id: 'ex-2.1',
    unitId: 2,
    unitTitle: 'Logarithms',
    urduTitle: 'لوگارتھم',
    exerciseTitle: 'EXERCISE 2.1',
    pageNumber: 22,
    subtitle: 'Scientific Notation, Standard Notation & Planetary Word Problems',
    keyFormulas: [
      '\\text{Scientific Notation: } a \\times 10^n, \\quad 1 \\le a < 10, \\; n \\in \\mathbb{Z}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Express the following numbers in scientific notation:',
        subParts: [
          { label: '(i)', math: '2000000' },
          { label: '(ii)', math: '48900' },
          { label: '(iii)', math: '0.0042' },
          { label: '(iv)', math: '0.0000009' },
          { label: '(v)', math: '73 \\times 10^3' },
          { label: '(vi)', math: '0.65 \\times 10^2' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Express the following numbers in ordinary notation:',
        subParts: [
          { label: '(i)', math: '8.04 \\times 10^2' },
          { label: '(ii)', math: '3 \\times 10^5' },
          { label: '(iii)', math: '1.5 \\times 10^{-2}' },
          { label: '(iv)', math: '1.77 \\times 10^7' },
          { label: '(v)', math: '5.5 \\times 10^{-6}' },
          { label: '(vi)', math: '4 \\times 10^{-5}' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'The speed of light is approximately 3 \\times 10^8\\text{ metres per second}. Express it in standard form.',
      },
      {
        questionNumber: 4,
        instruction: 'The circumference of the Earth at the equator is about 40075000 metres. Express this number in scientific notation.',
      },
      {
        questionNumber: 5,
        instruction: 'The diameter of Mars is 6.779 \\times 10^3\\text{ km}. Express this number in standard form.',
      },
      {
        questionNumber: 6,
        instruction: 'The diameter of Earth is about 1.2756 \\times 10^4\\text{ km}. Express this number in standard form.',
      },
    ],
  },

  {
    id: 'ex-2.2',
    unitId: 2,
    unitTitle: 'Logarithms',
    urduTitle: 'لوگارتھم',
    exerciseTitle: 'EXERCISE 2.2',
    pageNumber: 24,
    subtitle: 'Logarithmic Form, Exponential Form and Unknown Variables',
    keyFormulas: [
      '\\log_b(x) = y \\iff b^y = x, \\quad b > 0, \\; b \\ne 1',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Express each of the following in logarithmic form:',
        subParts: [
          { label: '(i)', math: '10^3 = 1000' },
          { label: '(ii)', math: '2^8 = 256' },
          { label: '(iii)', math: '3^{-3} = \\frac{1}{27}' },
          { label: '(iv)', math: '20^2 = 400' },
          { label: '(v)', math: '16^{-\\frac{1}{4}} = \\frac{1}{2}' },
          { label: '(vi)', math: '11^2 = 121' },
          { label: '(vii)', math: 'p = q^r' },
          { label: '(viii)', math: '(32)^{-\\frac{1}{5}} = \\frac{1}{2}' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Express each of the following in exponential form:',
        subParts: [
          { label: '(i)', math: '\\log_5 125 = 3' },
          { label: '(ii)', math: '\\log_2 16 = 4' },
          { label: '(iii)', math: '\\log_{23} 1 = 0' },
          { label: '(iv)', math: '\\log_5 5 = 1' },
          { label: '(v)', math: '\\log_2 \\frac{1}{8} = -3' },
          { label: '(vi)', math: '\\frac{1}{2} = \\log_9 3' },
          { label: '(vii)', math: '5 = \\log_{10} 100000' },
          { label: '(viii)', math: '\\log_4 \\frac{1}{16} = -2' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'Find the value of x in each of the following:',
        subParts: [
          { label: '(i)', math: '\\log_x 64 = 3' },
          { label: '(ii)', math: '\\log_5 1 = x' },
          { label: '(iii)', math: '\\log_x 8 = 1' },
          { label: '(iv)', math: '\\log_{10} x = -3' },
          { label: '(v)', math: '\\log_4 x = \\frac{3}{2}' },
          { label: '(vi)', math: '\\log_2 1024 = x' },
        ],
      },
    ],
  },

  {
    id: 'ex-2.3',
    unitId: 2,
    unitTitle: 'Logarithms',
    urduTitle: 'لوگارتھم',
    exerciseTitle: 'EXERCISE 2.3',
    pageNumber: 30,
    subtitle: 'Characteristic, Mantissa & Antilogarithm Tables',
    keyFormulas: [
      '\\log(\\text{Number}) = \\text{Characteristic} + \\text{Mantissa}',
      '\\text{If Number } \\ge 1: \\text{ Char} = (\\text{digits left of decimal}) - 1',
      '\\text{If Number } < 1: \\text{ Char} = -(\\text{zeros before first non-zero digit} + 1)',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Find characteristic of the following numbers:',
        subParts: [
          { label: '(i)', math: '5287' },
          { label: '(ii)', math: '59.28' },
          { label: '(iii)', math: '0.0567' },
          { label: '(iv)', math: '234.7' },
          { label: '(v)', math: '0.000049' },
          { label: '(vi)', math: '145000' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Find logarithm of the following numbers using logarithm table:',
        subParts: [
          { label: '(i)', math: '43' },
          { label: '(ii)', math: '579' },
          { label: '(iii)', math: '1.982' },
          { label: '(iv)', math: '0.0876' },
          { label: '(v)', math: '0.047' },
          { label: '(vi)', math: '0.000354' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'If \\log 3.177 = 0.5019, then find:',
        subParts: [
          { label: '(i)', math: '\\log 3177' },
          { label: '(ii)', math: '\\log 31.77' },
          { label: '(iii)', math: '\\log 0.03177' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Find the value of x:',
        subParts: [
          { label: '(i)', math: '\\log x = 0.0065' },
          { label: '(ii)', math: '\\log x = 1.192' },
          { label: '(iii)', math: '\\log x = -3.434' },
          { label: '(iv)', math: '\\log x = -1.5726' },
          { label: '(v)', math: '\\log x = 4.3561' },
          { label: '(vi)', math: '\\log x = -2.0184' },
        ],
      },
    ],
  },

  {
    id: 'ex-2.4',
    unitId: 2,
    unitTitle: 'Logarithms',
    urduTitle: 'لوگارتھم',
    exerciseTitle: 'EXERCISE 2.4',
    pageNumber: 34,
    subtitle: 'Laws of Logarithms, Earthquake Magnitude & Real Life Growth',
    keyFormulas: [
      '\\log_b(xy) = \\log_b(x) + \\log_b(y)',
      '\\log_b\\left(\\frac{x}{y}\\right) = \\log_b(x) - \\log_b(y)',
      '\\log_b(x^n) = n\\log_b(x)',
      '\\log_b(x) = \\frac{\\log_a(x)}{\\log_a(b)}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Without using calculator, evaluate the following:',
        subParts: [
          { label: '(i)', math: '\\log_2 18 - \\log_2 9' },
          { label: '(ii)', math: '\\log_2 64 + \\log_2 2' },
          { label: '(iii)', math: '\\frac{1}{3}\\log_3 8 - \\log_3 18' },
          { label: '(iv)', math: '2\\log 2 + \\log 25' },
          { label: '(v)', math: '\\frac{1}{3}\\log_4 64 + 2\\log_5 25' },
          { label: '(vi)', math: '\\log_3 12 + \\log_3 0.25' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Write the following as a single logarithm:',
        subParts: [
          { label: '(i)', math: '\\frac{1}{2}\\log 25 + 2\\log 3' },
          { label: '(ii)', math: '\\log 9 - \\frac{1}{3}\\log 3' },
          { label: '(iii)', math: '\\log_5 b^2 \\cdot \\log_b 5^3' },
          { label: '(iv)', math: '2\\log_3 x + \\log_3 y' },
          { label: '(v)', math: '4\\log_5 x - \\log_5 y + \\log_5 z' },
          { label: '(vi)', math: '2\\ln a + 3\\ln b - 4\\ln c' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'Expand the following using laws of logarithms:',
        subParts: [
          { label: '(i)', math: '\\log\\left(\\frac{11}{5}\\right)' },
          { label: '(ii)', math: '\\log_5 \\sqrt{8a^6}' },
          { label: '(iii)', math: '\\ln\\left(\\frac{a^2 b}{c}\\right)' },
          { label: '(iv)', math: '\\log\\left(\\frac{xy}{z}\\right)^9' },
          { label: '(v)', math: '\\ln\\sqrt[3]{16x^3}' },
          { label: '(vi)', math: '\\log_2\\left(\\frac{1 - a}{b}\\right)^5' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Find the value of x in the following equations:',
        subParts: [
          { label: '(i)', math: '\\log 2 + \\log x = 1' },
          { label: '(ii)', math: '\\log_2 x + \\log_2 8 = 5' },
          { label: '(iii)', math: '(81)^x = (243)^{x+2}' },
          { label: '(iv)', math: '\\left(\\frac{1}{27}\\right)^{x-6} = 27' },
          { label: '(v)', math: '\\log(5x - 10) = 2' },
          { label: '(vi)', math: '\\log_2(x + 1) - \\log_2(x - 4) = 2' },
        ],
      },
      {
        questionNumber: 6,
        instruction: 'The formula to measure the magnitude of earthquakes is given by M = \\log_{10}\\left(\\frac{A}{A_0}\\right). If amplitude A is 10,000 and reference amplitude A_0 is 10. What is the magnitude of the earthquake?',
      },
      {
        questionNumber: 7,
        instruction: 'Abdullah invested Rs. 100,000 in a saving scheme and gains interest at the rate of 5% per annum so that total value is modelled by y = 100000(1.05)^t. Find after how many years the investment will be double.',
      },
      {
        questionNumber: 8,
        instruction: 'Huria is hiking up a mountain where temperature decreases by 3% (factor 0.97) for every 100m gained in altitude. Initial temperature at sea level is 20^\\circ\\text{C}. Using T = T_i \\times 0.97^{\\frac{h}{100}}, calculate temperature at altitude of 500 metres.',
      },
    ],
  },

  // ================= UNIT 3: SETS AND FUNCTIONS =================
  {
    id: 'ex-3.1',
    unitId: 3,
    unitTitle: 'Sets and Functions',
    urduTitle: 'سیٹ اور تفاعل',
    exerciseTitle: 'EXERCISE 3.1',
    pageNumber: 42,
    subtitle: 'Set Builder Notation, Tabular Form, Subsets & Power Sets',
    keyFormulas: [
      '\\text{Number of elements in power set } P(S) = 2^m',
      'A \\subseteq B \\iff (\\forall x \\in A \\implies x \\in B)',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Write the following sets in set builder notation:',
        subParts: [
          { label: '(i)', math: '\\{1, 4, 9, 16, 25, 36, \\dots, 484\\}' },
          { label: '(ii)', math: '\\{2, 4, 8, 16, \\dots, 256\\}' },
          { label: '(iii)', math: '\\{0, \\pm 1, \\pm 2, \\dots, \\pm 1000\\}' },
          { label: '(iv)', math: '\\{6, 12, 18, \\dots, 120\\}' },
          { label: '(vii)', math: '\\{1, 2, 4, 5, 10, 20, 25, 50, 100\\}' },
          { label: '(viii)', math: '\\{5, 10, 15, \\dots, 100\\}' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Write each of the following sets in tabular forms:',
        subParts: [
          { label: '(i)', math: '\\{x \\mid x \\text{ is a multiple of } 3 \\wedge x \\le 36\\}' },
          { label: '(ii)', math: '\\{x \\mid x \\in \\mathbb{R} \\wedge 2x + 1 = 0\\}' },
          { label: '(iii)', math: '\\{x \\mid x \\in P \\wedge x < 12\\}' },
          { label: '(iv)', math: '\\{x \\mid x \\text{ is a divisor of } 128\\}' },
          { label: '(v)', math: '\\{x \\mid x = 2^n, n \\in \\mathbb{N} \\wedge n < 8\\}' },
          { label: '(vii)', math: '\\{x \\mid x \\in \\mathbb{N} \\wedge x = x\\}' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'Write two proper subsets of each of the following sets:',
        subParts: [
          { label: '(i)', math: '\\{a, b, c\\}' },
          { label: '(ii)', math: '\\{0, 1\\}' },
          { label: '(iii)', math: '\\mathbb{N}' },
          { label: '(iv)', math: '\\mathbb{Z}' },
        ],
      },
      {
        questionNumber: 6,
        instruction: 'What is the number of elements of the power set of each of the following sets?',
        subParts: [
          { label: '(i)', math: '\\{\\}' },
          { label: '(ii)', math: '\\{0, 1\\}' },
          { label: '(iii)', math: '\\{1, 2, 3, 4, 5, 6, 7\\}' },
          { label: '(iv)', math: '\\{0, 1, 2, 3, 4, 5, 6, 7\\}' },
          { label: '(v)', math: '\\{a, \\{b, c\\}\\}' },
        ],
      },
    ],
  },

  {
    id: 'ex-3.2',
    unitId: 3,
    unitTitle: 'Sets and Functions',
    urduTitle: 'سیٹ اور تفاعل',
    exerciseTitle: 'EXERCISE 3.2',
    pageNumber: 53,
    subtitle: 'Set Operations, De Morgan\'s Laws & Multi-Set Word Problems',
    keyFormulas: [
      'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)',
      'n(A \\cup B \\cup C) = n(A)+n(B)+n(C)-n(A \\cap B)-n(A \\cap C)-n(B \\cap C)+n(A \\cap B \\cap C)',
      '(A \\cup B)\' = A\' \\cap B\', \\quad (A \\cap B)\' = A\' \\cup B\'',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Consider universal set U = \\{x \\mid x \\text{ is multiple of } 2 \\text{ and } 0 < x \\le 30\\}, A = \\{x \\mid x \\text{ is multiple of } 6\\}, B = \\{x \\mid x \\text{ is multiple of } 8\\}:',
        subParts: [
          { label: '(i)', math: '\\text{List all elements of sets } A \\text{ and } B \\text{ in tabular form}' },
          { label: '(ii)', math: '\\text{Find } A \\cap B' },
          { label: '(iii)', math: '\\text{Draw a Venn diagram}' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Verify commutative properties of union and intersection for:',
        subParts: [
          { label: '(i)', math: 'A = \\{1, 2, 3, 4, 5\\}, \\; B = \\{4, 6, 8, 10\\}' },
          { label: '(ii)', math: '\\mathbb{N}, \\; \\mathbb{Z}' },
        ],
      },
      {
        questionNumber: 7,
        instruction: 'In a class of 55 students, 34 like to play cricket and 30 like to play hockey. Also each student likes to play at least one of the two games. How many students like to play both games?',
      },
      {
        questionNumber: 8,
        instruction: 'In a group of 500 employees, 250 can speak Urdu, 150 can speak English, 50 can speak Punjabi, 40 can speak Urdu and English, 30 can speak both English and Punjabi, and 10 can speak Urdu and Punjabi. How many can speak all three languages?',
      },
      {
        questionNumber: 10,
        instruction: 'In a training session, 17 participants have laptops, 11 have tablets, 9 have laptops and tablets, 6 have laptops and books, and 4 have both tablets and books. Eight participants have all three items. The total number of participants with laptops, tablets, or books is 35. How many participants have books?',
      },
    ],
  },

  {
    id: 'ex-3.3',
    unitId: 3,
    unitTitle: 'Sets and Functions',
    urduTitle: 'سیٹ اور تفاعل',
    exerciseTitle: 'EXERCISE 3.3',
    pageNumber: 61,
    subtitle: 'Binary Relations, Domain, Range, Injective, Surjective & Bijective',
    keyFormulas: [
      '\\text{Domain: set of first elements of ordered pairs}',
      '\\text{Range: set of second elements of ordered pairs}',
      '\\text{Bijective: Both One-to-One and Onto}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'For A = \\{1, 2, 3, 4\\}, find the following relations in A. State domain and range:',
        subParts: [
          { label: '(i)', math: '\\{(x, y) \\mid y = x\\}' },
          { label: '(ii)', math: '\\{(x, y) \\mid y + x = 5\\}' },
          { label: '(iii)', math: '\\{(x, y) \\mid x + y < 5\\}' },
          { label: '(iv)', math: '\\{(x, y) \\mid x + y > 5\\}' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'If g(x) = 3x + 2 and h(x) = x^2 + 1, then find:',
        subParts: [
          { label: '(i)', math: 'g(0)' },
          { label: '(ii)', math: 'g(-3)' },
          { label: '(iii)', math: 'g\\left(\\frac{2}{3}\\right)' },
          { label: '(iv)', math: 'h(1)' },
          { label: '(v)', math: 'h(-4)' },
          { label: '(vi)', math: 'h\\left(-\\frac{1}{2}\\right)' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Given that f(x) = ax + b + 1, where a and b are constant numbers. If f(3) = 8 and f(6) = 14, then find the values of a and b.',
      },
      {
        questionNumber: 6,
        instruction: 'Consider the function defined by f(x) = 5x + 2. If f(x) = 32, find the x value.',
      },
      {
        questionNumber: 7,
        instruction: 'Consider the function f(x) = cx^2 + d, where c and d are constant numbers. If f(1) = 6 and f(-2) = 10, then find the values of c and d.',
      },
    ],
  },

  // ================= UNIT 4: FACTORIZATION =================
  {
    id: 'ex-4.1',
    unitId: 4,
    unitTitle: 'Factorization & Algebraic Manipulation',
    urduTitle: 'تجزی اور الجبرائی تحویل',
    exerciseTitle: 'EXERCISE 4.1',
    pageNumber: 69,
    subtitle: 'Common Factors, Quadratic Trinomials & Splitting Middle Term',
    keyFormulas: [
      'ax^2 + bx + c: \\text{ find factors } p, q \\text{ such that } p \\cdot q = ac \\text{ and } p + q = b',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Factorize by identifying common factors:',
        subParts: [
          { label: '(i)', math: '6x + 12' },
          { label: '(ii)', math: '15y^2 + 20y' },
          { label: '(iii)', math: '-12x^2 - 3x' },
          { label: '(iv)', math: '4a^2 b + 8ab^2' },
          { label: '(v)', math: 'xy - 3x^2 + 2x' },
          { label: '(vi)', math: '3a^2 b - 9ab^2 + 15ab' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Factorize:',
        subParts: [
          { label: '(i)', math: '5x + 15' },
          { label: '(ii)', math: 'x^2 + 4x + 3' },
          { label: '(iii)', math: 'x^2 + 6x + 8' },
          { label: '(iv)', math: 'x^2 + 4x + 4' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'Factorize:',
        subParts: [
          { label: '(i)', math: 'x^2 + x - 12' },
          { label: '(ii)', math: 'x^2 + 7x + 10' },
          { label: '(iii)', math: 'x^2 - 6x + 8' },
          { label: '(iv)', math: 'x^2 - x - 56' },
          { label: '(v)', math: 'x^2 - 10x - 24' },
          { label: '(vi)', math: 'y^2 + 4y - 12' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Factorize:',
        subParts: [
          { label: '(i)', math: '2x^2 + 7x + 3' },
          { label: '(ii)', math: '2x^2 + 11x + 15' },
          { label: '(iii)', math: '4x^2 + 13x + 3' },
          { label: '(iv)', math: '3x^2 + 5x + 2' },
          { label: '(v)', math: '3y^2 - 11y + 6' },
          { label: '(vi)', math: '2y^2 - 5y + 2' },
        ],
      },
    ],
  },

  {
    id: 'ex-4.4',
    unitId: 4,
    unitTitle: 'Factorization & Algebraic Manipulation',
    urduTitle: 'تجزی اور الجبرائی تحویل',
    exerciseTitle: 'EXERCISE 4.4',
    pageNumber: 79,
    subtitle: 'Square Root of Polynomials & Quadratic/Cubic Optimization',
    keyFormulas: [
      '\\sqrt{(ax \\pm b)^2} = \\pm(ax \\pm b)',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Find the square root of the following polynomials by factorization method:',
        subParts: [
          { label: '(i)', math: 'x^2 - 8x + 16' },
          { label: '(ii)', math: '9x^2 + 12x + 4' },
          { label: '(iii)', math: '36a^2 + 84a + 49' },
          { label: '(iv)', math: '64y^2 - 32y + 4' },
          { label: '(v)', math: '200t^2 - 120t + 18' },
          { label: '(vi)', math: '40x^2 + 120x + 90' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'An investor\'s return R(x) in rupees after investing x thousand rupees is given by quadratic expression: R(x) = -x^2 + 6x - 8. Factorize the expression and find the investment levels that result in zero return.',
      },
      {
        questionNumber: 4,
        instruction: 'A company\'s profit P(x) in rupees from selling x units of a product is modeled by cubic expression: P(x) = x^3 - 15x^2 + 75x - 125. Find the break-even point(s), where the profit is zero.',
      },
      {
        questionNumber: 5,
        instruction: 'The potential energy V(x) in an electric field varies as a cubic function of distance x, given by: V(x) = 2x^3 - 6x^2 + 4x. Determine where the potential energy is zero.',
      },
    ],
  },

  // ================= UNIT 5: LINEAR EQUATIONS AND INEQUALITIES =================
  {
    id: 'ex-5.1',
    unitId: 5,
    unitTitle: 'Linear Equations and Inequalities',
    urduTitle: 'یک درجی مساواتیں اور غیر مساواتیں',
    exerciseTitle: 'EXERCISE 5.1',
    pageNumber: 90,
    subtitle: 'Linear Equations in One Variable & Inequalities on Real Line',
    keyFormulas: [
      'ax + b = 0 \\implies x = -\\frac{b}{a}',
      '\\text{Multiplying or dividing by a negative number reverses inequality sign: } -x \\le a \\implies x \\ge -a',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Solve and represent the solution on a real line:',
        subParts: [
          { label: '(i)', math: '12x + 30 = -6' },
          { label: '(ii)', math: '\\frac{x}{3} + 6 = -12' },
          { label: '(iii)', math: '\\frac{x}{2} - \\frac{3x}{4} = \\frac{1}{12}' },
          { label: '(iv)', math: '2 = 7(2x + 4) + 12x' },
          { label: '(v)', math: '\\frac{2x - 1}{3} - \\frac{3x}{4} = \\frac{5}{6}' },
          { label: '(vi)', math: '\\frac{-5x}{10} = 9 - \\frac{10}{5}' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Solve each inequality and represent the solution on a real line:',
        subParts: [
          { label: '(i)', math: 'x - 6 \\le -2' },
          { label: '(ii)', math: '-9 > -16 + x' },
          { label: '(iii)', math: '3 + 2x \\ge 3' },
          { label: '(iv)', math: '6(x + 10) \\le 0' },
          { label: '(v)', math: '\\frac{5}{3}x - \\frac{3}{4} < \\frac{-1}{12}' },
          { label: '(vi)', math: '\\frac{1}{4}x - \\frac{1}{2} \\le -1 + \\frac{1}{2}x' },
        ],
      },
    ],
  },

  {
    id: 'ex-5.2',
    unitId: 5,
    unitTitle: 'Linear Equations and Inequalities',
    urduTitle: 'یک درجی مساواتیں اور غیر مساواتیں',
    exerciseTitle: 'EXERCISE 5.2',
    pageNumber: 94,
    subtitle: 'Feasible Solutions, Half-Planes & Corner Point Optimization',
    keyFormulas: [
      '\\text{Optimal solution of objective function } f(x, y) \\text{ occurs at a corner point of feasible region}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Maximize f(x, y) = 2x + 5y; subject to the constraints: 2y - x \\le 8, \\; x - y \\le 4, \\; x \\ge 0, \\; y \\ge 0',
      },
      {
        questionNumber: 2,
        instruction: 'Maximize f(x, y) = x + 3y; subject to the constraints: 2x + 5y \\le 30, \\; 5x + 4y \\le 20, \\; x \\ge 0, \\; y \\ge 0',
      },
      {
        questionNumber: 3,
        instruction: 'Maximize z = 2x + 3y; subject to the constraints: 2x + y \\le 4, \\; 4x - y \\le 2, \\; x \\ge 0, \\; y \\ge 0',
      },
      {
        questionNumber: 4,
        instruction: 'Minimize z = 2x + y; subject to the constraints: x + y \\ge 3, \\; 7x + 5y \\le 35, \\; x \\ge 0, \\; y \\ge 0',
      },
      {
        questionNumber: 5,
        instruction: 'Maximize the function defined as: f(x, y) = 2x + 3y subject to the constraints: 2x + y \\le 10, \\; x + 2y \\le 14, \\; x \\ge 0, \\; y \\ge 0',
      },
      {
        questionNumber: 6,
        instruction: 'Find minimum and maximum values of z = 3x + y; subject to the constraints: 3x + 5y \\ge 15, \\; x + 3y \\le 9, \\; x \\ge 0, \\; y \\ge 0',
      },
    ],
  },

  // ================= UNIT 6: TRIGONOMETRY =================
  {
    id: 'ex-6.1',
    unitId: 6,
    unitTitle: 'Trigonometry',
    urduTitle: 'علم المثلث',
    exerciseTitle: 'EXERCISE 6.1',
    pageNumber: 103,
    subtitle: 'Angle Measures, Radians, Arc Length l = rθ & Sector Area A = 1/2 r²θ',
    keyFormulas: [
      '1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.2958^\\circ, \\quad 1^\\circ = \\frac{\\pi}{180} \\text{ rad}',
      '\\text{Arc length } l = r\\theta, \\quad \\text{Sector Area } A = \\frac{1}{2}r^2\\theta \\quad (\\theta \\text{ in radians})',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Find in which quadrant the following angles lie. Write a co-terminal angle for each:',
        subParts: [
          { label: '(i)', math: '65^\\circ' },
          { label: '(ii)', math: '135^\\circ' },
          { label: '(iii)', math: '-40^\\circ' },
          { label: '(iv)', math: '210^\\circ' },
          { label: '(v)', math: '-150^\\circ' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Convert the following into radians:',
        subParts: [
          { label: '(i)', math: '36^\\circ' },
          { label: '(ii)', math: '22.5^\\circ' },
          { label: '(iii)', math: '67.5^\\circ' },
        ],
      },
      {
        questionNumber: 5,
        instruction: 'Convert the following into degrees:',
        subParts: [
          { label: '(i)', math: '\\frac{\\pi}{16} \\text{ rad}' },
          { label: '(ii)', math: '\\frac{11\\pi}{5} \\text{ rad}' },
          { label: '(iii)', math: '\\frac{7\\pi}{6} \\text{ rad}' },
        ],
      },
      {
        questionNumber: 6,
        instruction: 'Find the arc length and area of a sector if:',
        subParts: [
          { label: '(i)', math: 'r = 6\\text{ cm and central angle } \\theta = \\frac{\\pi}{3}\\text{ radians}' },
          { label: '(ii)', math: 'r = \\frac{4.8}{\\pi}\\text{ cm and central angle } \\theta = \\frac{5\\pi}{6}\\text{ radians}' },
        ],
      },
      {
        questionNumber: 7,
        instruction: 'If the central angle of a sector is 60^\\circ and the radius of the circle is 12 cm, find the area of the sector and the percentage of the total area of the circle it represents.',
      },
    ],
  },

  {
    id: 'ex-6.4',
    unitId: 6,
    unitTitle: 'Trigonometry',
    urduTitle: 'علم المثلث',
    exerciseTitle: 'EXERCISE 6.4',
    pageNumber: 113,
    subtitle: 'Values of Trigonometric Ratios of Special Angles (0°, 30°, 45°, 60°, 90°)',
    keyFormulas: [
      '\\sin 30^\\circ = \\frac{1}{2}, \\; \\sin 45^\\circ = \\frac{1}{\\sqrt{2}}, \\; \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}',
      '\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}, \\; \\cos 45^\\circ = \\frac{1}{\\sqrt{2}}, \\; \\cos 60^\\circ = \\frac{1}{2}',
      '\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}, \\; \\tan 45^\\circ = 1, \\; \\tan 60^\\circ = \\sqrt{3}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Find the value of the following trigonometric ratios without using the calculator:',
        subParts: [
          { label: '(i)', math: '\\sin 30^\\circ' },
          { label: '(ii)', math: '\\cos 30^\\circ' },
          { label: '(iii)', math: '\\tan\\frac{\\pi}{6}' },
          { label: '(iv)', math: '\\tan 60^\\circ' },
          { label: '(v)', math: '\\sec 60^\\circ' },
          { label: '(vi)', math: '\\cos\\frac{\\pi}{3}' },
          { label: '(vii)', math: '\\cot 60^\\circ' },
          { label: '(viii)', math: '\\sin 60^\\circ' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Evaluate:',
        subParts: [
          { label: '(i)', math: '2\\sin 60^\\circ \\cos 60^\\circ' },
          { label: '(ii)', math: '2\\cos\\frac{\\pi}{6} \\sin\\frac{\\pi}{6}' },
          { label: '(iii)', math: '2\\sin 45^\\circ + 2\\cos 45^\\circ' },
          { label: '(iv)', math: '\\sin 60^\\circ \\cos 30^\\circ + \\cos 60^\\circ \\sin 30^\\circ' },
          { label: '(v)', math: '\\cos 60^\\circ \\cos 30^\\circ - \\sin 60^\\circ \\sin 30^\\circ' },
        ],
      },
    ],
  },

  {
    id: 'ex-6.6',
    unitId: 6,
    unitTitle: 'Trigonometry',
    urduTitle: 'علم المثلث',
    exerciseTitle: 'EXERCISE 6.6',
    pageNumber: 120,
    subtitle: 'Angles of Elevation & Depression in Real World Heights & Distances',
    keyFormulas: [
      '\\tan\\theta = \\frac{\\text{Height (Opposite)}}{\\text{Distance (Adjacent)}}',
      '\\sin\\theta = \\frac{\\text{Height}}{\\text{Slant distance (Hypotenuse)}}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'The angle of elevation of the top of a flag post from a point on the ground level 40 m away from the flag post is 60^\\circ. Find the height of the post.',
      },
      {
        questionNumber: 2,
        instruction: 'An isosceles triangle has a vertical angle of 120^\\circ and a base 10 cm long. Find the length of its altitude.',
      },
      {
        questionNumber: 3,
        instruction: 'A tree is 72 m high. Find the angle of elevation of its top from a point 100 m away on the ground level.',
      },
      {
        questionNumber: 4,
        instruction: 'A ladder makes an angle of 60^\\circ with the ground and reaches a height of 10m along the wall. Find the length of the ladder.',
      },
      {
        questionNumber: 5,
        instruction: 'A light house tower is 150 m high from the sea level. The angle of depression from the top of the tower to a ship is 60^\\circ. Find the distance between the ship and the tower.',
      },
      {
        questionNumber: 7,
        instruction: 'Find the measure of an angle of elevation of the Sun, if a tower 300 m high casts a shadow 450 m long.',
      },
      {
        questionNumber: 10,
        instruction: 'A kite has 120 m of string attached to it when at an angle of elevation of 50^\\circ. How far is it above the hand holding it? (Assume string is stretched).',
      },
    ],
  },

  // ================= UNIT 7: COORDINATE GEOMETRY =================
  {
    id: 'ex-7.1',
    unitId: 7,
    unitTitle: 'Coordinate Geometry',
    urduTitle: 'محدد جیومیٹری',
    exerciseTitle: 'EXERCISE 7.1',
    pageNumber: 127,
    subtitle: 'Distance Formula d = √[(Δx)² + (Δy)²] & Midpoint Formula M',
    keyFormulas: [
      'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
      'M = \\left( \\frac{x_1 + x_2}{2}, \\; \\frac{y_1 + y_2}{2} \\right)',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Describe the location in the plane of the point P(x, y), for which:',
        subParts: [
          { label: '(i)', math: 'x > 0' },
          { label: '(ii)', math: 'x > 0 \\wedge y > 0' },
          { label: '(iii)', math: 'x = 0' },
          { label: '(iv)', math: 'y = 0' },
          { label: '(vii)', math: 'x = y' },
          { label: '(x)', math: 'x \\text{ and } y \\text{ have opposite signs}' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Find the distance between the points:',
        subParts: [
          { label: '(i)', math: 'A(6, 7), \\; B(0, -2)' },
          { label: '(ii)', math: 'C(-5, -2), \\; D(3, 2)' },
          { label: '(iii)', math: 'L(0, 3), \\; M(-2, -4)' },
          { label: '(iv)', math: 'P(-8, -7), \\; Q(0, 0)' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'Find the midpoint of the line segment joining the two points:',
        subParts: [
          { label: '(a)', math: 'A(3, 1), \\; B(-2, -4)' },
          { label: '(b)', math: 'A(-8, 3), \\; B(2, -1)' },
          { label: '(c)', math: 'A(-\\sqrt{5}, -\\frac{1}{3}), \\; B(-3\\sqrt{5}, 5)' },
        ],
      },
      {
        questionNumber: 7,
        instruction: 'Find h such that A(-1, h), B(3, 2) and C(7, 3) are collinear.',
      },
    ],
  },

  {
    id: 'ex-7.2',
    unitId: 7,
    unitTitle: 'Coordinate Geometry',
    urduTitle: 'محدد جیومیٹری',
    exerciseTitle: 'EXERCISE 7.2',
    pageNumber: 140,
    subtitle: 'Gradient / Slope m, Parallel & Perpendicular Lines, Forms of Straight Line',
    keyFormulas: [
      'm = \\tan\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}',
      '\\text{Parallel: } m_1 = m_2, \\quad \\text{Perpendicular: } m_1 m_2 = -1',
      '\\text{Slope-Intercept: } y = mx + c, \\quad \\text{Point-Slope: } y - y_1 = m(x - x_1)',
      '\\text{Intercept Form: } \\frac{x}{a} + \\frac{y}{b} = 1, \\quad \\text{Normal Form: } x\\cos\\alpha + y\\sin\\alpha = p',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Find the slope and inclination of the line joining the points:',
        subParts: [
          { label: '(i)', math: '(-2, 4); \\; (5, 11)' },
          { label: '(ii)', math: '(3, -2); \\; (2, 7)' },
          { label: '(iii)', math: '(4, 6); \\; (4, 8)' },
        ],
      },
      {
        questionNumber: 5,
        instruction: 'Find whether the two lines determined by these pairs are parallel, perpendicular, or none:',
        subParts: [
          { label: '(a)', math: '(1, -2), (2, 4) \\text{ and } (4, 1), (-8, 2)' },
          { label: '(b)', math: '(-3, 4), (6, 2) \\text{ and } (4, 5), (-2, -7)' },
        ],
      },
      {
        questionNumber: 6,
        instruction: 'Find an equation of:',
        subParts: [
          { label: '(a)', math: '\\text{the horizontal line through } (7, -9)' },
          { label: '(b)', math: '\\text{the vertical line through } (-5, 3)' },
          { label: '(c)', math: '\\text{through } A(-6, 5) \\text{ having slope } 7' },
          { label: '(d)', math: '\\text{through } (8, -3) \\text{ having slope } 0' },
          { label: '(g)', math: 'y\\text{-intercept: } -7 \\text{ and slope: } -5' },
          { label: '(h)', math: 'x\\text{-intercept: } -3 \\text{ and } y\\text{-intercept: } 4' },
        ],
      },
    ],
  },

  {
    id: 'ex-7.3',
    unitId: 7,
    unitTitle: 'Coordinate Geometry',
    urduTitle: 'محدد جیومیٹری',
    exerciseTitle: 'EXERCISE 7.3',
    pageNumber: 144,
    subtitle: 'Real-Life Coordinate Systems, GPS, Distance on Grids & Fencing',
    questions: [
      {
        questionNumber: 1,
        instruction: 'If the houses of two friends are represented by coordinates (2, 6) and (9, 12) on a grid. Find the straight line distance between their houses if the grid units represent kilometres.',
      },
      {
        questionNumber: 2,
        instruction: 'Consider a straight trail (represented by coordinate plane) that starts at point (5, 7) and ends at point (15, 3). What are the coordinates of the midpoint?',
      },
      {
        questionNumber: 5,
        instruction: 'The start and end points of a race track are given by coordinates (3, 9) and (9, 13). What is the midpoint of the track?',
      },
      {
        questionNumber: 8,
        instruction: 'Farah is fencing around a rectangular field with corners at (0, 0), (0, 5), (8, 5) and (8, 0). How much fencing material will she need to cover the entire perimeter of the field?',
      },
      {
        questionNumber: 10,
        instruction: 'A land surveyor is marking out a rectangular plot of land with corners at (3, 1), (3, 6), (8, 6), and (8, 1). Calculate the perimeter.',
      },
    ],
  },

  // ================= UNIT 8: LOGIC =================
  {
    id: 'ex-8',
    unitId: 8,
    unitTitle: 'Logic',
    urduTitle: 'منطق',
    exerciseTitle: 'EXERCISE 8',
    pageNumber: 158,
    subtitle: 'Statements, Conjunction, Disjunction, Conditional, Converse & Deductive Proofs',
    keyFormulas: [
      '\\text{Conjunction } p \\wedge q, \\quad \\text{Disjunction } p \\vee q',
      '\\text{Conditional } p \\to q, \\quad \\text{Converse: } q \\to p, \\quad \\text{Inverse: } \\sim p \\to \\sim q, \\quad \\text{Contrapositive: } \\sim q \\to \\sim p',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Four options are given against each statement. Encircle the correct option:',
        subParts: [
          { label: '(i)', math: '\\text{Inductive reasoning is: (a) repeated experiments, (b) iff, (c) theorem, (d) general principles}' },
          { label: '(iv)', math: '\\text{Negation of "The stove is burning": (a) stove is not burning, (b) dim, (c) low heat, (d) both}' },
          { label: '(v)', math: '\\text{Conjunction } p \\wedge q \\text{ is true when: (a) both false, (b) both true, (c) only q true, (d) only p true}' },
          { label: '(vii)', math: '\\text{Contrapositive of } q \\to p \\text{ is: (a) } q \\to \\sim p, \\; \\text{(b) } \\sim p \\to \\sim q, \\; \\text{(c) } \\sim p \\to q, \\; \\text{(d) } \\sim q \\to \\sim p' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Write the converse, inverse and contrapositive of the following conditionals:',
        subParts: [
          { label: '(i)', math: '\\sim p \\to q' },
          { label: '(ii)', math: 'q \\to p' },
          { label: '(iii)', math: '\\sim p \\to \\sim q' },
          { label: '(iv)', math: '\\sim q \\to \\sim p' },
        ],
      },
      {
        questionNumber: 8,
        instruction: 'Formulate simple deductive proofs for each of the following algebraic expressions (prove LHS = RHS):',
        subParts: [
          { label: '(i)', math: '\\text{Prove that } (x - 4)^2 + 9 = x^2 - 8x + 25' },
          { label: '(ii)', math: '\\text{Prove that } (x + 1)^2 - (x - 1)^2 = 4x' },
          { label: '(iii)', math: '\\text{Prove that } (x + 5)^2 - (x - 5)^2 = 20x' },
        ],
      },
    ],
  },

  // ================= UNIT 9: SIMILAR FIGURES =================
  {
    id: 'ex-9.2',
    unitId: 9,
    unitTitle: 'Similar Figures',
    urduTitle: 'متشابہ اشکال',
    exerciseTitle: 'EXERCISE 9.2',
    pageNumber: 171,
    subtitle: 'Area of Similar Figures Theorem: A₁ / A₂ = (l₁ / l₂)² & Scaling Factors',
    keyFormulas: [
      '\\frac{A_1}{A_2} = \\left( \\frac{l_1}{l_2} \\right)^2 = k^2',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Find the ratio of the areas of similar figures if the ratio of their corresponding lengths are:',
        subParts: [
          { label: '(i)', math: '1 : 3' },
          { label: '(ii)', math: '3 : 4' },
          { label: '(iii)', math: '2 : 7' },
          { label: '(iv)', math: '8 : 9' },
          { label: '(v)', math: '6 : 5' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'Given that area of \\triangle ABC = 36\\text{ cm}^2, m\\overline{AB} = 6\\text{ cm}, m\\overline{BD} = 4\\text{ cm}. Find: (a) the area of \\triangle ADE, (b) the area of trapezium BCED.',
      },
      {
        questionNumber: 4,
        instruction: 'Given that \\triangle ABC and \\triangle DEF are similar, with a scale factor of k = 3. If the area of \\triangle ABC is 50 cm², find the area of triangle \\triangle DEF.',
      },
      {
        questionNumber: 6,
        instruction: 'The areas of two similar triangles are 16 cm² and 25 cm². What is the ratio of a pair of corresponding sides?',
      },
    ],
  },

  {
    id: 'ex-9.4',
    unitId: 9,
    unitTitle: 'Similar Figures',
    urduTitle: 'متشابہ اشکال',
    exerciseTitle: 'EXERCISE 9.4',
    pageNumber: 182,
    subtitle: 'Geometrical Properties of Regular Polygons, Angles & Tessellations',
    keyFormulas: [
      '\\text{Sum of interior angles} = (n - 2) \\times 180^\\circ',
      '\\text{Each interior angle of regular polygon} = \\frac{(n - 2) \\times 180^\\circ}{n}',
      '\\text{Each exterior angle} = \\frac{360^\\circ}{n}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Calculate polygon angles:',
        subParts: [
          { label: '(i)', math: '\\text{What is the sum of the interior angles of a decagon (10-sided polygon)?}' },
          { label: '(ii)', math: '\\text{Calculate the measure of each interior angle of a regular hexagon.}' },
          { label: '(iii)', math: '\\text{What is each exterior angle of a regular pentagon?}' },
          { label: '(iv)', math: '\\text{If the sum of interior angles is } 1260^\\circ, \\text{ how many sides does the polygon have?}' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'In a parallelogram ABCD, m\\overline{AB} = 10\\text{ cm}, m\\overline{AD} = 6\\text{ cm} and m\\angle BAD = 45^\\circ. Calculate the area of ABCD.',
      },
      {
        questionNumber: 7,
        instruction: 'A rectangular floor is 12 m by 15 m. How many square tiles, each 1 m by 1 m, are needed to cover the floor?',
      },
      {
        questionNumber: 10,
        instruction: 'A window has a trapezoidal shape with parallel sides of 3 m and 1.5 m and a height of 2 m. Find the area of the window.',
      },
    ],
  },

  // ================= UNIT 12: INFORMATION HANDLING =================
  {
    id: 'ex-12.1',
    unitId: 12,
    unitTitle: 'Information Handling',
    urduTitle: 'معلومات کا نظام',
    exerciseTitle: 'EXERCISE 12.1',
    pageNumber: 222,
    subtitle: 'Grouped Frequency Distributions, Class Boundaries & Histograms',
    keyFormulas: [
      '\\text{Class Midpoint } x = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}',
      '\\text{Class Size } h = \\text{Upper boundary} - \\text{Lower boundary}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'The following distribution represents the scores achieved by a group of chemistry students in the chemistry laboratory (classes 24–28: 3, 29–33: 6, 34–38: 12, 39–43: 23, 44–48: 15, 49–53: 6). Answer the following questions:',
        subParts: [
          { label: '(i)', math: '\\text{What is the upper limit of the last class?}' },
          { label: '(ii)', math: '\\text{What is the lower limit of the class 39 – 43?}' },
          { label: '(iii)', math: '\\text{What is the midpoint of the class } (34 - 38)?' },
          { label: '(iv)', math: '\\text{What are the class frequencies of classes } 29-33 \\text{ and } 44-48?' },
          { label: '(v)', math: '\\text{What is the size of the class limits in the above frequency distribution?}' },
          { label: '(vii)', math: '\\text{What is the lower limit of the class having 15 as its class frequency?}' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'For a school staff, the following expenditures (rupees in hundred) are required for repair of chairs: 145, 152, 153, 156, 158, 160, 146, 152, 155, 159, 161, 163, 165, 147, 148, 151, 154, 156, 158, 160, 144, 167, 151, 150, 152, 149, 145, 153, 152, 155. Prepare a frequency distribution by tally bar method taking number of classes 8.',
      },
    ],
  },

  {
    id: 'ex-12.2',
    unitId: 12,
    unitTitle: 'Information Handling',
    urduTitle: 'معلومات کا نظام',
    exerciseTitle: 'EXERCISE 12.2',
    pageNumber: 237,
    subtitle: 'Measures of Central Tendency: Arithmetic Mean, Median, Mode & Weighted Mean',
    keyFormulas: [
      '\\text{Mean } \\bar{X} = \\frac{\\sum x}{n}, \\quad \\text{Grouped Mean } = \\frac{\\sum fx}{\\sum f}',
      '\\text{Median } = l + \\frac{h}{f}\\left(\\frac{n}{2} - c\\right), \\quad \\text{Weighted Mean } \\bar{X}_w = \\frac{\\sum WX}{\\sum W}',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Find the arithmetic mean in each of the following:',
        subParts: [
          { label: '(i)', math: '4, 6, 10, 12, 15, 20, 25, 28, 30' },
          { label: '(ii)', math: '12, 18, 19, 0, -19, -18, -12' },
          { label: '(iii)', math: '6.5, 11, 12.3, 9, 8.1, 16, 18, 20.5, 25' },
          { label: '(iv)', math: '8, 10, 12, 14, 16, 20, 22' },
        ],
      },
      {
        questionNumber: 2,
        instruction: 'Following are the heights in (inches) of 12 students: 55, 53, 54, 58, 60, 61, 62, 56, 57, 52, 51, 63. Find the median height.',
      },
      {
        questionNumber: 7,
        instruction: 'The arithmetic mean of 45 numbers is 80. Find their sum.',
      },
      {
        questionNumber: 8,
        instruction: 'Five numbers are 1, 4, 0, 7, 9. Find their mean, median and mode.',
      },
      {
        questionNumber: 17,
        instruction: 'A person purchased the following food items: Rice 10 kg at Rs. 96/kg; Flour 12 kg at Rs. 48/kg; Ghee 4 kg at Rs. 190/kg; Sugar 3 kg at Rs. 49/kg; Mutton 4 kg at Rs. 650/kg. What is the weighted mean of cost of food items per kg?',
      },
    ],
  },

  // ================= UNIT 13: PROBABILITY =================
  {
    id: 'ex-13.1',
    unitId: 13,
    unitTitle: 'Probability',
    urduTitle: 'احتمال',
    exerciseTitle: 'EXERCISE 13.1',
    pageNumber: 251,
    subtitle: 'Classical Probability P(A) = n(A) / n(S), Complements, Dice, Cards & Coins',
    keyFormulas: [
      'P(A) = \\frac{n(A)}{n(S)}, \\quad 0 \\le P(A) \\le 1',
      'P(A\') = 1 - P(A), \\quad P(A) + P(A\') = 1',
    ],
    questions: [
      {
        questionNumber: 1,
        instruction: 'Arshad rolls a dice, with sides labelled L, M, N, O, P, U. What is the probability that the dice lands on consonant?',
      },
      {
        questionNumber: 2,
        instruction: 'Shazia throws a pair of fair dice. What will be the probability of getting:',
        subParts: [
          { label: '(i)', math: '\\text{sum of dots is at least } 4' },
          { label: '(ii)', math: '\\text{product of both dots is between } 5 \\text{ to } 10' },
          { label: '(iii)', math: '\\text{the difference between both the dots is equal to } 4' },
          { label: '(iv)', math: '\\text{number at least } 5 \\text{ on first dice and number at least } 4 \\text{ on second dice}' },
        ],
      },
      {
        questionNumber: 3,
        instruction: 'One alphabet is selected at random from the word "MATHEMATICS". Find the probability of getting:',
        subParts: [
          { label: '(i)', math: '\\text{vowel}' },
          { label: '(ii)', math: '\\text{consonant}' },
          { label: '(iii)', math: '\\text{an } E' },
          { label: '(iv)', math: '\\text{an } A' },
          { label: '(v)', math: '\\text{not } M' },
          { label: '(vi)', math: '\\text{not } T' },
        ],
      },
      {
        questionNumber: 4,
        instruction: 'Aslam rolled a dice. What is the probability of getting the numbers 3 or 4? Also find the probability of not getting the numbers 3 or 4.',
      },
      {
        questionNumber: 6,
        instruction: 'The probability that Ayesha will pass the examination is 0.85. What will be the probability that Ayesha will not pass the examination?',
      },
      {
        questionNumber: 8,
        instruction: 'A card is selected at random from a well shuffled pack of 52 playing cards. What will be the probability of selecting: (i) a queen, (ii) neither a queen nor a jack.',
      },
    ],
  },

  {
    id: 'ex-13.2',
    unitId: 13,
    unitTitle: 'Probability',
    urduTitle: 'احتمال',
    exerciseTitle: 'EXERCISE 13.2',
    pageNumber: 256,
    subtitle: 'Relative Frequency & Expected Frequency E = N × P(A)',
    keyFormulas: [
      '\\text{Relative Frequency } = \\frac{\\text{Frequency of event } x}{\\text{Total frequency } N}',
      '\\text{Expected Frequency } E(A) = N \\times P(A)',
    ],
    questions: [
      {
        questionNumber: 5,
        instruction: 'In 500 trials of a throw of two dice, what is expected frequency that the sum will be greater than 8?',
      },
      {
        questionNumber: 6,
        instruction: 'What is the expectation of a person who is to get Rs. 120 if he obtains at least 2 heads in single toss of three coins?',
      },
      {
        questionNumber: 8,
        instruction: 'The probability of getting 5 sixes while tossing six dice is \\frac{2}{5}, the dice is rolled 200 times. How many times would you expect it to show 5 sixes?',
      },
    ],
  },
];
