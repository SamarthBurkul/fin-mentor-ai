import { CalculatorResult } from '../types';

export const calculateEMI = (principal: number, rate: number, tenure: number): CalculatorResult => {
  const monthlyRate = rate / (12 * 100);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
              (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - principal;
  
  return {
    monthlyPayment: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest)
  };
};

export const calculateSIP = (monthlyAmount: number, rate: number, years: number): CalculatorResult => {
  const months = years * 12;
  const monthlyRate = rate / (12 * 100);
  const maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  const totalInvestment = monthlyAmount * months;
  const totalReturns = maturityAmount - totalInvestment;
  
  return {
    maturityAmount: Math.round(maturityAmount),
    totalAmount: Math.round(totalInvestment),
    totalInterest: Math.round(totalReturns)
  };
};

export const calculateFD = (principal: number, rate: number, years: number): CalculatorResult => {
  const maturityAmount = principal * Math.pow(1 + rate / 100, years);
  const totalInterest = maturityAmount - principal;
  
  return {
    maturityAmount: Math.round(maturityAmount),
    totalInterest: Math.round(totalInterest)
  };
};

export const calculateCompoundInterest = (principal: number, rate: number, time: number, compound: number = 1): CalculatorResult => {
  const amount = principal * Math.pow(1 + (rate / 100) / compound, compound * time);
  const interest = amount - principal;
  
  return {
    maturityAmount: Math.round(amount),
    totalInterest: Math.round(interest)
  };
};

export const calculateSimpleInterest = (principal: number, rate: number, time: number): CalculatorResult => {
  const interest = (principal * rate * time) / 100;
  const amount = principal + interest;
  
  return {
    maturityAmount: Math.round(amount),
    totalInterest: Math.round(interest)
  };
};

export const calculateRD = (monthlyDeposit: number, rate: number, years: number): CalculatorResult => {
  const months = years * 12;
  const monthlyRate = rate / (12 * 100);
  let maturityAmount = 0;
  
  for (let i = 1; i <= months; i++) {
    maturityAmount += monthlyDeposit * Math.pow(1 + monthlyRate, months - i + 1);
  }
  
  const totalDeposited = monthlyDeposit * months;
  const totalInterest = maturityAmount - totalDeposited;
  
  return {
    maturityAmount: Math.round(maturityAmount),
    totalAmount: Math.round(totalDeposited),
    totalInterest: Math.round(totalInterest)
  };
};

export const calculateSavingsGrowth = (monthlyDeposit: number, rate: number, years: number): CalculatorResult => {
  const months = years * 12;
  const monthlyRate = rate / (12 * 100);
  let totalAmount = 0;
  
  for (let i = 0; i < months; i++) {
    totalAmount = (totalAmount + monthlyDeposit) * (1 + monthlyRate);
  }
  
  const totalDeposited = monthlyDeposit * months;
  const totalInterest = totalAmount - totalDeposited;
  
  return {
    maturityAmount: Math.round(totalAmount),
    totalAmount: Math.round(totalDeposited),
    totalInterest: Math.round(totalInterest)
  };
};