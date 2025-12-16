export interface CalculatorResult {
  monthlyPayment?: number;
  totalAmount?: number;
  totalInterest?: number;
  maturityAmount?: number;
  savings?: number;
}

export interface LoanDetails {
  principal: number;
  rate: number;
  tenure: number;
  type: 'home' | 'personal' | 'car' | 'education';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface UserProgress {
  name: string;
  score: number;
  badges: string[];
  completedModules: string[];
}

export interface BankLocation {
  id: number;
  name: string;
  type: 'bank' | 'atm';
  address: string;
  distance: number;
  coordinates: { lat: number; lng: number };
}