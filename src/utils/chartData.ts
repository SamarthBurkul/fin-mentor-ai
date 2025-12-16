export const generateEMIBreakdown = (principal: number, totalInterest: number) => ({
  labels: ['Principal', 'Interest'],
  datasets: [{
    data: [principal, totalInterest],
    backgroundColor: ['#00E5FF', '#00FFC6'],
    borderColor: ['#00E5FF', '#00FFC6'],
    borderWidth: 2
  }]
});

export const generateSIPGrowth = (monthlyAmount: number, years: number, rate: number) => {
  const months = years * 12;
  const monthlyRate = rate / (12 * 100);
  const labels = [];
  const invested = [];
  const returns = [];
  
  for (let i = 1; i <= months; i++) {
    if (i % 12 === 0) {
      labels.push(`Year ${i/12}`);
      const totalInvested = monthlyAmount * i;
      const maturity = monthlyAmount * (((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) * (1 + monthlyRate));
      invested.push(totalInvested);
      returns.push(maturity);
    }
  }
  
  return {
    labels,
    datasets: [
      {
        label: 'Amount Invested',
        data: invested,
        borderColor: '#00E5FF',
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        fill: true
      },
      {
        label: 'Wealth Created',
        data: returns,
        borderColor: '#00FFC6',
        backgroundColor: 'rgba(0, 255, 198, 0.1)',
        fill: true
      }
    ]
  };
};

export const generateFDGrowth = (principal: number, rate: number, years: number) => {
  const labels = [];
  const amounts = [];
  
  for (let i = 1; i <= years; i++) {
    labels.push(`Year ${i}`);
    const amount = principal * Math.pow(1 + rate / 100, i);
    amounts.push(amount);
  }
  
  return {
    labels,
    datasets: [{
      label: 'FD Growth',
      data: amounts,
      borderColor: '#FACC15',
      backgroundColor: 'rgba(250, 204, 21, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };
};

export const generateRDGrowth = (monthlyDeposit: number, rate: number, years: number) => {
  const months = years * 12;
  const monthlyRate = rate / (12 * 100);
  const labels = [];
  const amounts = [];
  
  for (let i = 1; i <= months; i++) {
    if (i % 6 === 0) {
      labels.push(`Month ${i}`);
      let total = 0;
      for (let j = 1; j <= i; j++) {
        total += monthlyDeposit * Math.pow(1 + monthlyRate, i - j + 1);
      }
      amounts.push(total);
    }
  }
  
  return {
    labels,
    datasets: [{
      label: 'RD Maturity',
      data: amounts,
      backgroundColor: '#EF4444',
      borderColor: '#EF4444',
      borderWidth: 2
    }]
  };
};

export const generateEMISchedule = (principal: number, rate: number, tenure: number) => {
  const monthlyRate = rate / (12 * 100);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const labels = [];
  const principalData = [];
  const interestData = [];
  let balance = principal;
  
  for (let i = 1; i <= Math.min(tenure, 12); i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;
    
    labels.push(`Month ${i}`);
    principalData.push(principalPayment);
    interestData.push(interestPayment);
  }
  
  return {
    labels,
    datasets: [
      { label: 'Principal', data: principalData, backgroundColor: '#00E5FF' },
      { label: 'Interest', data: interestData, backgroundColor: '#EF4444' }
    ]
  };
};

export const generateEMIComparison = (principal: number, rate: number, tenure: number) => {
  const scenarios = [
    { name: 'Current', tenure: tenure, rate: rate },
    { name: 'Shorter', tenure: Math.max(tenure - 60, 12), rate: rate },
    { name: 'Lower Rate', tenure: tenure, rate: Math.max(rate - 1, 1) }
  ];
  
  const data = scenarios.map(scenario => {
    const monthlyRate = scenario.rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, scenario.tenure)) / (Math.pow(1 + monthlyRate, scenario.tenure) - 1);
    return emi;
  });
  
  return {
    labels: scenarios.map(s => s.name),
    datasets: [{
      data: data,
      backgroundColor: ['#00E5FF', '#00FFC6', '#FACC15']
    }]
  };
};

export const generateAllCharts = (calculatorType: string, values: any, result: any) => {
  switch (calculatorType) {
    case 'emi':
      return [
        { type: 'pie', data: generateEMIBreakdown(parseFloat(values.principal), result.totalInterest), title: 'EMI Breakdown' },
        { type: 'bar', data: generateEMISchedule(parseFloat(values.principal), parseFloat(values.rate), parseFloat(values.tenure)), title: 'Monthly Schedule' },
        { type: 'bar', data: generateEMIComparison(parseFloat(values.principal), parseFloat(values.rate), parseFloat(values.tenure)), title: 'EMI Comparison' }
      ];
    case 'sip':
      return [
        { type: 'line', data: generateSIPGrowth(parseFloat(values.monthlyAmount), parseFloat(values.years), parseFloat(values.rate)), title: 'SIP Growth' },
        { type: 'pie', data: { labels: ['Equity (70%)', 'Debt (20%)', 'Gold (10%)'], datasets: [{ data: [result.maturityAmount * 0.7, result.maturityAmount * 0.2, result.maturityAmount * 0.1], backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'] }] }, title: 'Asset Allocation' },
        { type: 'bar', data: { labels: ['Conservative (8%)', 'Moderate (12%)', 'Aggressive (15%)'], datasets: [{ data: [parseFloat(values.monthlyAmount) * 12 * parseFloat(values.years) * 1.5, result.maturityAmount, result.maturityAmount * 1.3], backgroundColor: ['#22C55E', '#3B82F6', '#EF4444'] }] }, title: 'Return Scenarios' }
      ];
    case 'fd':
      return [
        { type: 'line', data: generateFDGrowth(parseFloat(values.principal), parseFloat(values.rate), parseFloat(values.years)), title: 'FD Growth' },
        { type: 'pie', data: { labels: ['Principal', 'Interest'], datasets: [{ data: [parseFloat(values.principal), result.totalInterest], backgroundColor: ['#3B82F6', '#10B981'] }] }, title: 'FD Breakdown' },
        { type: 'bar', data: { labels: ['5%', '6%', '7%', '8%'], datasets: [{ data: [5, 6, 7, 8].map(r => parseFloat(values.principal) * Math.pow(1 + r / 100, parseFloat(values.years))), backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'] }] }, title: 'Rate Comparison' }
      ];
    case 'rd':
      return [
        { type: 'bar', data: generateRDGrowth(parseFloat(values.monthlyAmount), parseFloat(values.rate), parseFloat(values.years)), title: 'RD Growth' },
        { type: 'pie', data: { labels: ['Deposits', 'Interest'], datasets: [{ data: [result.totalAmount, result.totalInterest], backgroundColor: ['#8B5CF6', '#EC4899'] }] }, title: 'RD Breakdown' },
        { type: 'bar', data: { labels: ['5%', '6%', '7%'], datasets: [{ data: [5, 6, 7].map(r => parseFloat(values.monthlyAmount) * 12 * parseFloat(values.years) * (1 + r/100)), backgroundColor: ['#F59E0B', '#10B981', '#3B82F6'] }] }, title: 'Rate Comparison' }
      ];
    case 'interest':
      const principal = parseFloat(values.principal) || 0;
      const intRate = parseFloat(values.rate) || 0;
      const time = Math.min(parseFloat(values.time) || 1, 10);
      return [
        { type: 'pie', data: { labels: ['Principal', 'Interest'], datasets: [{ data: [principal, result.totalInterest || 0], backgroundColor: ['#3B82F6', '#10B981'] }] }, title: 'Interest Breakdown' },
        { type: 'line', data: { labels: Array.from({length: time}, (_, i) => `Year ${i+1}`), datasets: [{ label: 'Simple', data: Array.from({length: time}, (_, i) => principal + (principal * intRate * (i+1)) / 100), borderColor: '#8B5CF6', backgroundColor: 'rgba(139, 92, 246, 0.1)', fill: true }, { label: 'Compound', data: Array.from({length: time}, (_, i) => principal * Math.pow(1 + intRate / 100, i+1)), borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true }] }, title: 'Growth Comparison' },
        { type: 'bar', data: { labels: ['Simple', 'Compound'], datasets: [{ data: [(principal * intRate * time) / 100, principal * Math.pow(1 + intRate / 100, time) - principal], backgroundColor: ['#8B5CF6', '#10B981'] }] }, title: 'Interest Comparison' }
      ];
    case 'savings':
      return [
        { type: 'line', data: { labels: Array.from({length: parseFloat(values.years)}, (_, i) => `Year ${i+1}`), datasets: [{ label: 'Savings Growth', data: Array.from({length: parseFloat(values.years)}, (_, i) => parseFloat(values.monthlyAmount) * 12 * (i+1) * (1 + parseFloat(values.rate)/100)), borderColor: '#06B6D4', backgroundColor: 'rgba(6, 182, 212, 0.1)', fill: true }] }, title: 'Savings Growth' },
        { type: 'pie', data: { labels: ['Savings', 'Interest'], datasets: [{ data: [result.totalAmount, result.totalInterest], backgroundColor: ['#06B6D4', '#10B981'] }] }, title: 'Savings Breakdown' },
        { type: 'bar', data: { labels: ['5 Years', '10 Years', '15 Years'], datasets: [{ data: [5, 10, 15].map(y => parseFloat(values.monthlyAmount) * 12 * y * (1 + parseFloat(values.rate)/100)), backgroundColor: ['#F59E0B', '#10B981', '#3B82F6'] }] }, title: 'Time Projection' }
      ];
    default:
      return [];
  }
};