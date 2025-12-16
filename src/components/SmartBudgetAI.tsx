import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Download, DollarSign, PieChart, BarChart3, Receipt } from 'lucide-react';
import jsPDF from 'jspdf';
import SmartExpenseTracker from './SmartExpenseTracker';

const SmartBudgetAI: React.FC = () => {
  const [budgetData, setBudgetData] = useState({
    income: '',
    rent: '',
    food: '',
    emi: '',
    travel: '',
    savingsGoal: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'budget' | 'expenses'>('budget');

  const handleInputChange = (field: string, value: string) => {
    setBudgetData(prev => ({ ...prev, [field]: value }));
  };

  const generateBudget = async () => {
    if (!budgetData.income || !budgetData.savingsGoal) return;
    
    setIsAnalyzing(true);

    const income = parseInt(budgetData.income);
    const rent = parseInt(budgetData.rent || '0');
    const food = parseInt(budgetData.food || '0');
    const emi = parseInt(budgetData.emi || '0');
    const travel = parseInt(budgetData.travel || '0');
    const savings = parseInt(budgetData.savingsGoal);
    const totalExpenses = rent + food + emi + travel;
    const netBalance = income - totalExpenses;

    // Simulate AI processing with detailed analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    setAnalysis({
      budgetSummary: {
        totalExpenses,
        netBalance,
        savingsSuccessRate: Math.min(Math.round((netBalance / savings) * 100), 100),
        expenseRatio: Math.round((totalExpenses / income) * 100),
        savingsRatio: Math.round((savings / income) * 100)
      },
      financialHealth: {
        healthScore: Math.max(20, Math.min(95, 100 - Math.round((totalExpenses / income) * 100))),
        riskLevel: totalExpenses > income * 0.8 ? "High" : totalExpenses > income * 0.6 ? "Medium" : "Low",
        emiSafetyStatus: emi > income * 0.3 ? "Risky" : "Safe"
      },
      budgetBreakdown: { rent, food, emi, travel, savings: Math.min(savings, netBalance), miscellaneous: Math.max(0, netBalance - savings) },
      moneyLeaks: [
        { category: "Food", amount: Math.round(food * 0.3), reason: "Dining out expenses", impact: "Medium" },
        { category: "Travel", amount: Math.round(travel * 0.2), reason: "Unnecessary trips", impact: "Low" }
      ],
      smartRecommendations: [
        { priority: "High", action: "Build emergency fund", method: "Save ₹3000/month separately", savings: 3000, timeline: "6 months" },
        { priority: "Medium", action: "Reduce food costs", method: "Cook at home 4 days/week", savings: Math.round(food * 0.2), timeline: "Immediate" },
        { priority: "Medium", action: "Start SIP investment", method: "₹5000/month in equity funds", savings: Math.round(netBalance * 0.3), timeline: "This month" },
        { priority: "Low", action: "Optimize subscriptions", method: "Cancel unused services", savings: 1500, timeline: "This week" }
      ],
      expertTips: [
        { category: "Budgeting", tip: "Follow 50-30-20 rule: 50% needs, 30% wants, 20% savings", benefit: "Balanced financial life" },
        { category: "Investment", tip: "Start SIP with ₹5000/month in diversified equity funds", benefit: "12-15% annual returns" },
        { category: "Emergency", tip: "Build emergency fund equal to 6 months expenses", benefit: "Complete financial security" },
        { category: "Tax Planning", tip: "Invest ₹1.5L in ELSS funds annually", benefit: "Save ₹46,800 in taxes" },
        { category: "Insurance", tip: "Get term life insurance of 10x annual income", benefit: "Family financial protection" }
      ],
      detailedInsights: {
        strengths: netBalance > 0 ? ["Positive cash flow", "Savings discipline"] : ["Budget awareness"],
        weaknesses: totalExpenses > income * 0.7 ? ["High expense ratio", "Limited savings"] : ["Room for optimization"],
        opportunities: ["Investment growth", "Tax savings", "Side income"],
        threats: ["Inflation impact", "Income loss risk", "Medical emergencies"]
      }
    });

    setIsAnalyzing(false);
  };

  const PieChartComponent = ({ data, title }: { data: any[], title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const colors = ['#D4AF37', '#B76E79', '#4F46E5', '#059669', '#DC2626', '#7C3AED'];

    return (
      <div className="bg-jet-black rounded-xl p-6">
        <h4 className="text-lg font-bold text-soft-white mb-4 text-center">{title}</h4>
        <div className="flex items-center justify-center">
          <svg width="200" height="200" className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (item.value / total) * 360;
              const x1 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
              const y1 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);
              const x2 = 100 + 80 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
              const y2 = 100 + 80 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
              const largeArc = angle > 180 ? 1 : 0;
              
              const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={path}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              );
            })}
          </svg>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: colors[index % colors.length] }}></div>
                <span className="text-slate-gray text-sm">{item.name}</span>
              </div>
              <span className="text-soft-white font-medium">₹{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BarChartComponent = ({ data, title }: { data: any[], title: string }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const colors = ['#D4AF37', '#B76E79', '#4F46E5', '#059669'];

    return (
      <div className="bg-jet-black rounded-xl p-6">
        <h4 className="text-lg font-bold text-soft-white mb-4 text-center">{title}</h4>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-gray text-sm">{item.name}</span>
                <span className="text-soft-white font-medium">{item.value}%</span>
              </div>
              <div className="w-full bg-charcoal-gray rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: colors[index % colors.length]
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'High': return 'text-red-400 bg-red-400/20';
      default: return 'text-slate-gray bg-slate-gray/20';
    }
  };

  return (
    <section className="py-16 bg-jet-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-soft-white mb-4">
            Smart<span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Budget AI</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto font-inter">
            AI-powered budget analysis with beautiful visualizations and expert financial guidance
          </p>
          
          <div className="flex justify-center space-x-4 mt-6">
            <button 
              onClick={() => setActiveTab('budget')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'budget' 
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white' 
                  : 'border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Budget Analysis
            </button>
            <button 
              onClick={() => setActiveTab('expenses')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'expenses' 
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white' 
                  : 'border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black'
              }`}
            >
              <Receipt className="w-4 h-4" />
              Expense Tracker
            </button>
          </div>
        </div>

        {activeTab === 'expenses' ? (
          <SmartExpenseTracker />
        ) : !analysis ? (
          <div className="max-w-2xl mx-auto bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
            <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">
              💰 Enter Your Monthly Budget
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-soft-white font-medium mb-2">Monthly Income *</label>
                <input
                  type="number"
                  value={budgetData.income}
                  onChange={(e) => handleInputChange('income', e.target.value)}
                  placeholder="Enter total monthly income"
                  className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-soft-white font-medium mb-2">Rent/Housing</label>
                  <input
                    type="number"
                    value={budgetData.rent}
                    onChange={(e) => handleInputChange('rent', e.target.value)}
                    placeholder="Monthly rent"
                    className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-soft-white font-medium mb-2">Food & Groceries</label>
                  <input
                    type="number"
                    value={budgetData.food}
                    onChange={(e) => handleInputChange('food', e.target.value)}
                    placeholder="Food expenses"
                    className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-soft-white font-medium mb-2">EMI/Loans</label>
                  <input
                    type="number"
                    value={budgetData.emi}
                    onChange={(e) => handleInputChange('emi', e.target.value)}
                    placeholder="Total EMI"
                    className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-soft-white font-medium mb-2">Travel & Transport</label>
                  <input
                    type="number"
                    value={budgetData.travel}
                    onChange={(e) => handleInputChange('travel', e.target.value)}
                    placeholder="Travel expenses"
                    className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-soft-white font-medium mb-2">Savings Goal *</label>
                <input
                  type="number"
                  value={budgetData.savingsGoal}
                  onChange={(e) => handleInputChange('savingsGoal', e.target.value)}
                  placeholder="Monthly savings target"
                  className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={generateBudget}
                  disabled={isAnalyzing || !budgetData.income || !budgetData.savingsGoal}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  {isAnalyzing ? '🧠 AI Analyzing...' : '🚀 Generate Smart Budget'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Budget Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <DollarSign className="w-8 h-8 mb-3" />
                <h4 className="font-bold mb-1">Income</h4>
                <p className="text-2xl font-bold">₹{budgetData.income}</p>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
                <TrendingUp className="w-8 h-8 mb-3" />
                <h4 className="font-bold mb-1">Expenses</h4>
                <p className="text-2xl font-bold">₹{analysis.budgetSummary.totalExpenses}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h4 className="font-bold mb-1">Balance</h4>
                <p className="text-2xl font-bold">₹{analysis.budgetSummary.netBalance}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <Brain className="w-8 h-8 mb-3" />
                <h4 className="font-bold mb-1">Health Score</h4>
                <p className="text-2xl font-bold">{analysis.financialHealth.healthScore}/100</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <PieChartComponent
                title="💰 Budget Breakdown"
                data={[
                  { name: 'Rent', value: analysis.budgetBreakdown.rent },
                  { name: 'Food', value: analysis.budgetBreakdown.food },
                  { name: 'EMI', value: analysis.budgetBreakdown.emi },
                  { name: 'Travel', value: analysis.budgetBreakdown.travel },
                  { name: 'Savings', value: analysis.budgetBreakdown.savings },
                  { name: 'Others', value: analysis.budgetBreakdown.miscellaneous }
                ].filter(item => item.value > 0)}
              />
              
              <BarChartComponent
                title="📊 Financial Health Metrics"
                data={[
                  { name: 'Health Score', value: analysis.financialHealth.healthScore },
                  { name: 'Savings Rate', value: analysis.budgetSummary.savingsRatio },
                  { name: 'Expense Ratio', value: analysis.budgetSummary.expenseRatio },
                  { name: 'Success Rate', value: analysis.budgetSummary.savingsSuccessRate }
                ]}
              />
            </div>

            {/* Financial Health Analysis */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">🧠 AI Financial Analysis</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{analysis.financialHealth.healthScore}</span>
                  </div>
                  <h4 className="font-bold text-soft-white mb-2">Health Score</h4>
                  <p className="text-slate-gray text-sm">Overall financial wellness</p>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${getRiskColor(analysis.financialHealth.riskLevel)} mb-4`}>
                    <span className="font-bold">{analysis.financialHealth.riskLevel} Risk</span>
                  </div>
                  <h4 className="font-bold text-soft-white mb-2">Risk Level</h4>
                  <p className="text-slate-gray text-sm">Financial risk assessment</p>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                    analysis.financialHealth.emiSafetyStatus === 'Safe' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                  } mb-4`}>
                    <span className="font-bold">{analysis.financialHealth.emiSafetyStatus}</span>
                  </div>
                  <h4 className="font-bold text-soft-white mb-2">EMI Status</h4>
                  <p className="text-slate-gray text-sm">Loan burden analysis</p>
                </div>
              </div>
            </div>

            {/* Expert Tips */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">💡 Expert Financial Tips</h3>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {analysis.expertTips.map((tip: any, index: number) => (
                  <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">{tip.category[0]}</span>
                    </div>
                    <h4 className="font-bold text-soft-white mb-2 text-center">{tip.category}</h4>
                    <p className="text-slate-gray text-sm mb-3">{tip.tip}</p>
                    <p className="text-purple-400 text-xs font-medium">✓ {tip.benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Recommendations */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">🎯 Smart Recommendations</h3>
              
              <div className="space-y-4">
                {analysis.smartRecommendations.map((rec: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl p-6 border border-blue-500/20">
                    <div className="flex items-start space-x-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rec.priority === 'High' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                      }`}>
                        {rec.priority}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-soft-white mb-2">{rec.action}</h4>
                        <p className="text-slate-gray text-sm mb-2">{rec.method}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-green-400 font-medium">💰 ₹{rec.savings}/month</p>
                          <p className="text-blue-400 text-sm">⏱️ {rec.timeline}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed AI Analysis */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">🔍 Detailed AI Financial Analysis</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                    <h4 className="font-bold text-soft-white mb-3 flex items-center">
                      <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                      Income Analysis
                    </h4>
                    <p className="text-slate-gray text-sm mb-3">
                      Your monthly income of ₹{budgetData.income} places you in the {parseInt(budgetData.income) > 100000 ? 'upper-middle' : parseInt(budgetData.income) > 50000 ? 'middle' : 'lower-middle'} income bracket. 
                      {parseInt(budgetData.income) > 75000 ? 'This provides good financial flexibility for savings and investments.' : 'Focus on increasing income through skill development or side hustles.'}
                    </p>
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <p className="text-blue-400 text-xs font-medium">💡 Recommendation: {parseInt(budgetData.income) > 75000 ? 'Consider diversifying income sources' : 'Explore opportunities for income growth'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
                    <h4 className="font-bold text-soft-white mb-3 flex items-center">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                      Expense Pattern Analysis
                    </h4>
                    <p className="text-slate-gray text-sm mb-3">
                      Your expense-to-income ratio is {analysis.budgetSummary.expenseRatio}%. 
                      {analysis.budgetSummary.expenseRatio > 70 ? 'This is quite high and needs immediate attention.' : analysis.budgetSummary.expenseRatio > 50 ? 'This is manageable but has room for optimization.' : 'Excellent expense control!'}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-gray">Housing ({Math.round((parseInt(budgetData.rent || '0') / parseInt(budgetData.income)) * 100)}%)</span>
                        <span className={`font-medium ${Math.round((parseInt(budgetData.rent || '0') / parseInt(budgetData.income)) * 100) > 30 ? 'text-red-400' : 'text-green-400'}`}>
                          {Math.round((parseInt(budgetData.rent || '0') / parseInt(budgetData.income)) * 100) > 30 ? 'High' : 'Good'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-gray">Food ({Math.round((parseInt(budgetData.food || '0') / parseInt(budgetData.income)) * 100)}%)</span>
                        <span className={`font-medium ${Math.round((parseInt(budgetData.food || '0') / parseInt(budgetData.income)) * 100) > 15 ? 'text-orange-400' : 'text-green-400'}`}>
                          {Math.round((parseInt(budgetData.food || '0') / parseInt(budgetData.income)) * 100) > 15 ? 'Review' : 'Good'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/20">
                    <h4 className="font-bold text-soft-white mb-3 flex items-center">
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                      Savings & Investment Analysis
                    </h4>
                    <p className="text-slate-gray text-sm mb-3">
                      Your savings rate of {analysis.budgetSummary.savingsRatio}% is {analysis.budgetSummary.savingsRatio >= 20 ? 'excellent and above recommended levels' : analysis.budgetSummary.savingsRatio >= 10 ? 'good but can be improved' : 'below recommended levels and needs immediate attention'}.
                    </p>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <p className="text-green-400 text-xs font-medium">🎯 Target: Aim for 20% savings rate for optimal financial health</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="font-bold text-soft-white mb-3 flex items-center">
                      <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                      Risk Assessment
                    </h4>
                    <p className="text-slate-gray text-sm mb-3">
                      Based on your EMI-to-income ratio of {Math.round((parseInt(budgetData.emi || '0') / parseInt(budgetData.income)) * 100)}%, your debt burden is {Math.round((parseInt(budgetData.emi || '0') / parseInt(budgetData.income)) * 100) > 40 ? 'dangerously high' : Math.round((parseInt(budgetData.emi || '0') / parseInt(budgetData.income)) * 100) > 30 ? 'concerning' : 'manageable'}.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-gray text-sm">Emergency Fund</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${analysis.budgetSummary.netBalance > (analysis.budgetSummary.totalExpenses * 3) ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                          {analysis.budgetSummary.netBalance > (analysis.budgetSummary.totalExpenses * 3) ? 'Adequate' : 'Insufficient'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-gray text-sm">Liquidity</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${analysis.budgetSummary.netBalance > 0 ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                          {analysis.budgetSummary.netBalance > 0 ? 'Positive' : 'Negative'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Behavioral Insights */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">🧠 Behavioral Financial Insights</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                  <h4 className="font-bold text-soft-white mb-3">Spending Personality</h4>
                  <p className="text-blue-400 font-medium mb-2">
                    {analysis.budgetSummary.expenseRatio > 70 ? 'High Spender' : analysis.budgetSummary.expenseRatio > 50 ? 'Moderate Spender' : 'Conservative Spender'}
                  </p>
                  <p className="text-slate-gray text-sm">
                    {analysis.budgetSummary.expenseRatio > 70 ? 'You tend to spend most of your income. Focus on building discipline.' : analysis.budgetSummary.expenseRatio > 50 ? 'You have balanced spending habits with room for improvement.' : 'You show excellent spending discipline and control.'}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                  <h4 className="font-bold text-soft-white mb-3">Savings Behavior</h4>
                  <p className="text-green-400 font-medium mb-2">
                    {analysis.budgetSummary.savingsRatio >= 20 ? 'Excellent Saver' : analysis.budgetSummary.savingsRatio >= 10 ? 'Good Saver' : 'Needs Improvement'}
                  </p>
                  <p className="text-slate-gray text-sm">
                    {analysis.budgetSummary.savingsRatio >= 20 ? 'You prioritize savings and have strong financial discipline.' : analysis.budgetSummary.savingsRatio >= 10 ? 'You save regularly but can optimize further.' : 'Building a savings habit should be your top priority.'}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-xl p-6 border border-purple-500/20">
                  <h4 className="font-bold text-soft-white mb-3">Risk Profile</h4>
                  <p className="text-purple-400 font-medium mb-2">
                    {Math.round((parseInt(budgetData.emi || '0') / parseInt(budgetData.income)) * 100) > 30 ? 'High Risk' : Math.round((parseInt(budgetData.emi || '0') / parseInt(budgetData.income)) * 100) > 15 ? 'Moderate Risk' : 'Low Risk'}
                  </p>
                  <p className="text-slate-gray text-sm">
                    {Math.round((parseInt(budgetData.emi || '0') / parseInt(budgetData.income)) * 100) > 30 ? 'High debt burden increases financial vulnerability.' : Math.round((parseInt(budgetData.emi || '0') / parseInt(budgetData.income)) * 100) > 15 ? 'Manageable debt levels with room for investment.' : 'Low debt burden allows for aggressive wealth building.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Future Projections */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">🔮 AI-Powered Future Projections</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                    <h4 className="font-bold text-soft-white mb-4">📈 Wealth Building Forecast</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-gray">1 Year Savings:</span>
                        <span className="text-green-400 font-bold">₹{(analysis.budgetSummary.netBalance * 12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-gray">5 Year Potential:</span>
                        <span className="text-green-400 font-bold">₹{(analysis.budgetSummary.netBalance * 12 * 5 * 1.12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-gray">10 Year Wealth:</span>
                        <span className="text-green-400 font-bold">₹{(analysis.budgetSummary.netBalance * 12 * 10 * 1.15).toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-slate-gray text-xs mt-3">*Assuming 12-15% annual returns on investments</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                    <h4 className="font-bold text-soft-white mb-4">⚠️ Risk Scenarios</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-slate-gray">Income loss: {Math.round((analysis.budgetSummary.totalExpenses / parseInt(budgetData.income)) * 100)}% budget impact</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-slate-gray">Medical emergency: ₹{Math.round(parseInt(budgetData.income) * 0.3).toLocaleString()} potential impact</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-slate-gray">Inflation impact: {Math.round(analysis.budgetSummary.totalExpenses * 0.06).toLocaleString()} annual increase</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                    <h4 className="font-bold text-soft-white mb-4">🎯 Goal Achievement Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                        <div>
                          <p className="text-soft-white font-medium">Emergency Fund (6 months)</p>
                          <p className="text-slate-gray text-sm">₹{(analysis.budgetSummary.totalExpenses * 6).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-400 font-bold">{Math.ceil((analysis.budgetSummary.totalExpenses * 6) / analysis.budgetSummary.netBalance)} months</p>
                          <p className="text-slate-gray text-xs">to achieve</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                        <div>
                          <p className="text-soft-white font-medium">First ₹1 Lakh Savings</p>
                          <p className="text-slate-gray text-sm">Milestone achievement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">{Math.ceil(100000 / analysis.budgetSummary.netBalance)} months</p>
                          <p className="text-slate-gray text-xs">to achieve</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="font-bold text-soft-white mb-4">💡 Optimization Opportunities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-slate-gray">Reduce food expenses by 20% = ₹{Math.round(parseInt(budgetData.food || '0') * 0.2)} extra savings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-slate-gray">Optimize travel costs = ₹{Math.round(parseInt(budgetData.travel || '0') * 0.3)} monthly savings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-slate-gray">Start SIP investment = ₹{Math.round(analysis.budgetSummary.netBalance * 0.5)} wealth building</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  const doc = new jsPDF();
                  doc.text('SmartBudget AI Report', 20, 20);
                  doc.text(`Income: ₹${budgetData.income}`, 20, 40);
                  doc.text(`Health Score: ${analysis.financialHealth.healthScore}/100`, 20, 60);
                  doc.save('budget-report.pdf');
                }}
                className="bg-gradient-to-r from-gold to-rose-gold text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Report</span>
              </button>
              
              <button
                onClick={() => {
                  setAnalysis(null);
                  setBudgetData({income: '', rent: '', food: '', emi: '', travel: '', savingsGoal: ''});
                }}
                className="bg-charcoal-gray text-soft-white px-6 py-3 rounded-xl font-semibold hover:bg-jet-black transition-all duration-300"
              >
                ← New Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartBudgetAI;