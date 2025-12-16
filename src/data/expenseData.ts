export interface SampleExpense {
  id: string;
  amount: number;
  category: string;
  purpose: string;
  date: string;
  time: string;
  paymentMethod: string;
}

// Generate 1 month of dummy expense data
const generateMonthlyExpenses = (): SampleExpense[] => {
  const expenses: SampleExpense[] = [];
  const today = new Date();
  const categories = ['Food', 'Travel', 'Shopping', 'Education', 'Bills', 'Family', 'Entertainment', 'Healthcare', 'Fitness', 'Investment', 'Insurance', 'Fuel', 'Others'];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
    const dailyExpenses = Math.floor(Math.random() * 3) + 2; // 2-4 expenses per day
    
    for (let j = 0; j < dailyExpenses; j++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const expenseData = getExpenseByCategory(category);
      
      expenses.push({
        id: `exp-${Date.now()}-${i}-${j}`,
        amount: Math.round(expenseData.amount),
        category,
        purpose: expenseData.purpose,
        date: date.toISOString().split('T')[0],
        time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        paymentMethod: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash'][Math.floor(Math.random() * 5)]
      });
    }
  }
  
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const getExpenseByCategory = (category: string) => {
  const expenseTypes = {
    Food: [
      { purpose: 'Lunch at office cafeteria', amount: 180 + Math.random() * 120 },
      { purpose: 'Dinner at restaurant', amount: 400 + Math.random() * 300 },
      { purpose: 'Coffee with friends', amount: 150 + Math.random() * 100 },
      { purpose: 'Breakfast delivery', amount: 80 + Math.random() * 70 },
      { purpose: 'Grocery shopping', amount: 800 + Math.random() * 600 }
    ],
    Travel: [
      { purpose: 'Auto rickshaw to office', amount: 60 + Math.random() * 40 },
      { purpose: 'Uber ride', amount: 120 + Math.random() * 180 },
      { purpose: 'Metro card recharge', amount: 200 + Math.random() * 100 },
      { purpose: 'Bus ticket', amount: 25 + Math.random() * 35 },
      { purpose: 'Flight booking', amount: 3000 + Math.random() * 2000 }
    ],
    Shopping: [
      { purpose: 'Clothes shopping', amount: 1200 + Math.random() * 1800 },
      { purpose: 'Electronics purchase', amount: 2500 + Math.random() * 2000 },
      { purpose: 'Books and stationery', amount: 300 + Math.random() * 200 },
      { purpose: 'Home essentials', amount: 600 + Math.random() * 400 },
      { purpose: 'Online shopping', amount: 800 + Math.random() * 700 }
    ],
    Education: [
      { purpose: 'Online course fee', amount: 1500 + Math.random() * 1000 },
      { purpose: 'Books and materials', amount: 400 + Math.random() * 300 },
      { purpose: 'Certification exam', amount: 2000 + Math.random() * 1500 },
      { purpose: 'Workshop registration', amount: 800 + Math.random() * 600 }
    ],
    Bills: [
      { purpose: 'Electricity bill', amount: 800 + Math.random() * 600 },
      { purpose: 'Mobile recharge', amount: 400 + Math.random() * 200 },
      { purpose: 'Internet bill', amount: 600 + Math.random() * 300 },
      { purpose: 'Water bill', amount: 200 + Math.random() * 150 },
      { purpose: 'Gas cylinder', amount: 900 + Math.random() * 200 }
    ],
    Family: [
      { purpose: 'Family dinner', amount: 800 + Math.random() * 700 },
      { purpose: 'Gift for parents', amount: 1500 + Math.random() * 1000 },
      { purpose: 'Medical expenses', amount: 600 + Math.random() * 900 },
      { purpose: 'Family outing', amount: 1200 + Math.random() * 800 }
    ],
    Entertainment: [
      { purpose: 'Movie tickets', amount: 300 + Math.random() * 200 },
      { purpose: 'Gaming subscription', amount: 500 + Math.random() * 300 },
      { purpose: 'Concert tickets', amount: 1500 + Math.random() * 1000 },
      { purpose: 'Streaming subscription', amount: 200 + Math.random() * 100 }
    ],
    Healthcare: [
      { purpose: 'Doctor consultation', amount: 500 + Math.random() * 300 },
      { purpose: 'Medicines', amount: 200 + Math.random() * 300 },
      { purpose: 'Health checkup', amount: 1200 + Math.random() * 800 },
      { purpose: 'Dental treatment', amount: 800 + Math.random() * 700 }
    ],
    Fitness: [
      { purpose: 'Gym membership', amount: 1000 + Math.random() * 500 },
      { purpose: 'Yoga classes', amount: 600 + Math.random() * 400 },
      { purpose: 'Sports equipment', amount: 800 + Math.random() * 1200 },
      { purpose: 'Protein supplements', amount: 1500 + Math.random() * 500 }
    ],
    Investment: [
      { purpose: 'SIP investment', amount: 5000 + Math.random() * 5000 },
      { purpose: 'Stock purchase', amount: 2000 + Math.random() * 3000 },
      { purpose: 'Gold purchase', amount: 3000 + Math.random() * 2000 },
      { purpose: 'FD deposit', amount: 10000 + Math.random() * 15000 }
    ],
    Insurance: [
      { purpose: 'Health insurance premium', amount: 8000 + Math.random() * 4000 },
      { purpose: 'Life insurance premium', amount: 6000 + Math.random() * 4000 },
      { purpose: 'Vehicle insurance', amount: 5000 + Math.random() * 3000 }
    ],
    Fuel: [
      { purpose: 'Petrol fill-up', amount: 1000 + Math.random() * 500 },
      { purpose: 'Bike servicing', amount: 800 + Math.random() * 700 },
      { purpose: 'Car maintenance', amount: 1500 + Math.random() * 1000 }
    ],
    Others: [
      { purpose: 'Miscellaneous expense', amount: 200 + Math.random() * 300 },
      { purpose: 'Emergency expense', amount: 500 + Math.random() * 1000 },
      { purpose: 'Charity donation', amount: 300 + Math.random() * 700 }
    ]
  };
  
  const categoryExpenses = expenseTypes[category as keyof typeof expenseTypes] || expenseTypes.Others;
  const selected = categoryExpenses[Math.floor(Math.random() * categoryExpenses.length)];
  return { ...selected, amount: Math.round(selected.amount) };
};

export const sampleExpenses: SampleExpense[] = generateMonthlyExpenses();

export const expenseCategories = [
  { name: 'Food', color: '#FF6B6B', icon: '🍽️', budget: 8000 },
  { name: 'Travel', color: '#4ECDC4', icon: '🚗', budget: 4000 },
  { name: 'Shopping', color: '#45B7D1', icon: '🛍️', budget: 6000 },
  { name: 'Education', color: '#96CEB4', icon: '📚', budget: 3000 },
  { name: 'Bills', color: '#FFEAA7', icon: '💡', budget: 5000 },
  { name: 'Family', color: '#DDA0DD', icon: '👨👩👧👦', budget: 7000 },
  { name: 'Entertainment', color: '#98D8C8', icon: '🎬', budget: 3000 },
  { name: 'Healthcare', color: '#FF9F43', icon: '🏥', budget: 4000 },
  { name: 'Fitness', color: '#00D2D3', icon: '💪', budget: 2000 },
  { name: 'Investment', color: '#5F27CD', icon: '📈', budget: 15000 },
  { name: 'Insurance', color: '#00A8FF', icon: '🛡️', budget: 3000 },
  { name: 'Fuel', color: '#FF3838', icon: '⛽', budget: 3000 },
  { name: 'Others', color: '#F7DC6F', icon: '📦', budget: 2000 }
];

export const savingTips = [
  "Set a daily spending limit and track it in real-time",
  "Use the 24-hour rule for purchases above ₹1000",
  "Review your top spending category weekly",
  "Automate savings transfers right after salary credit",
  "Use digital payment alerts to stay aware of expenses",
  "Plan meals to reduce food delivery expenses",
  "Compare prices before making any purchase",
  "Set category-wise monthly budgets and stick to them"
];