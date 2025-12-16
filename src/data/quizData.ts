import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is EMI?",
    options: ["Emergency Money Index", "Equated Monthly Installment", "Extra Money Interest", "Easy Money Investment"],
    correctAnswer: 1,
    explanation: "EMI stands for Equated Monthly Installment - the fixed amount you pay every month for a loan.",
    category: "Banking Basics"
  },
  {
    id: 2,
    question: "Which is safer for emergency funds?",
    options: ["Stock Market", "Savings Account", "Cryptocurrency", "Real Estate"],
    correctAnswer: 1,
    explanation: "Savings accounts are the safest option for emergency funds as they provide instant access and guaranteed returns.",
    category: "Savings"
  },
  {
    id: 3,
    question: "What is compound interest?",
    options: ["Interest on principal only", "Interest on interest", "Simple interest", "Bank charges"],
    correctAnswer: 1,
    explanation: "Compound interest is earning interest on both your principal amount and previously earned interest.",
    category: "Investment"
  },
  {
    id: 4,
    question: "Which loan typically has the lowest interest rate?",
    options: ["Personal Loan", "Credit Card", "Home Loan", "Business Loan"],
    correctAnswer: 2,
    explanation: "Home loans typically have the lowest interest rates because they are secured by property.",
    category: "Loans"
  },
  {
    id: 5,
    question: "What should you check before taking any loan?",
    options: ["Only interest rate", "Only tenure", "Interest rate, fees, and terms", "Only monthly EMI"],
    correctAnswer: 2,
    explanation: "Always check interest rate, processing fees, prepayment charges, and all terms before taking a loan.",
    category: "Fraud Awareness"
  }
];

export const learningModules = [
  {
    id: 'banking-basics',
    title: 'Banking Basics',
    description: 'Learn fundamental banking concepts',
    lessons: [
      'What is a Bank?',
      'Types of Bank Accounts',
      'How to Open an Account',
      'Understanding Bank Statements'
    ]
  },
  {
    id: 'savings-budgeting',
    title: 'Savings & Budgeting',
    description: 'Master the art of saving money',
    lessons: [
      'Why Save Money?',
      'Creating a Budget',
      'Emergency Fund Planning',
      'Savings Account vs FD'
    ]
  },
  {
    id: 'loans-emi',
    title: 'Loans & EMI',
    description: 'Understand loans and EMI calculations',
    lessons: [
      'Types of Loans',
      'How EMI Works',
      'Loan Eligibility',
      'Avoiding Loan Traps'
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Protect yourself and your family',
    lessons: [
      'Why Need Insurance?',
      'Types of Insurance',
      'Choosing Right Policy',
      'Claim Process'
    ]
  },
  {
    id: 'fraud-awareness',
    title: 'Fraud Awareness',
    description: 'Stay safe from financial frauds',
    lessons: [
      'Common Online Frauds',
      'Fake Loan Schemes',
      'Phishing Attacks',
      'How to Report Fraud'
    ]
  },
  {
    id: 'investment-basics',
    title: 'Investment Basics',
    description: 'Start your investment journey',
    lessons: [
      'What is Investment?',
      'SIP and Mutual Funds',
      'Risk vs Return',
      'Long-term Planning'
    ]
  }
];