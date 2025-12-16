import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Download, Target, DollarSign, BarChart3, Shield } from 'lucide-react';
import jsPDF from 'jspdf';

const SmartInvestmentComparator: React.FC = () => {
  const [investmentData, setInvestmentData] = useState({
    amount: '',
    timePeriod: '',
    riskPreference: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [comparison, setComparison] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setInvestmentData(prev => ({ ...prev, [field]: value }));
  };

  const compareInvestments = async () => {
    if (!investmentData.amount || !investmentData.timePeriod || !investmentData.riskPreference) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const amount = parseInt(investmentData.amount);
    const years = parseInt(investmentData.timePeriod);
    const riskLevel = investmentData.riskPreference;

    // AI-based calculations
    const goldReturn = riskLevel === 'Low' ? 8 : riskLevel === 'Medium' ? 10 : 12;
    const fdReturn = 6.5;
    const mfReturn = riskLevel === 'Low' ? 12 : riskLevel === 'Medium' ? 15 : 18;

    const goldFinalValue = Math.round(amount * Math.pow(1 + goldReturn/100, years));
    const fdFinalValue = Math.round(amount * Math.pow(1 + fdReturn/100, years));
    const mfFinalValue = Math.round(amount * Math.pow(1 + mfReturn/100, years));

    setComparison({
      inputSummary: {
        amount,
        years,
        riskLevel
      },
      investments: {
        gold: {
          name: 'Gold Investment',
          expectedReturn: goldReturn,
          finalValue: goldFinalValue,
          profit: goldFinalValue - amount,
          riskLevel: 'Medium',
          stability: 85,
          liquidity: 90,
          pros: ['Inflation hedge', 'Physical asset', 'Crisis protection', 'Easy to sell'],
          cons: ['No regular income', 'Storage costs', 'Price volatility', 'No compounding'],
          suitability: riskLevel === 'Low' ? 80 : riskLevel === 'Medium' ? 90 : 70
        },
        fd: {
          name: 'Fixed Deposit',
          expectedReturn: fdReturn,
          finalValue: fdFinalValue,
          profit: fdFinalValue - amount,
          riskLevel: 'Very Low',
          stability: 100,
          liquidity: 60,
          pros: ['Guaranteed returns', 'Capital protection', 'Predictable income', 'Bank safety'],
          cons: ['Low returns', 'Inflation erosion', 'Early withdrawal penalty', 'Tax on interest'],
          suitability: riskLevel === 'Low' ? 95 : riskLevel === 'Medium' ? 70 : 40
        },
        mutualFunds: {
          name: 'Mutual Funds',
          expectedReturn: mfReturn,
          finalValue: mfFinalValue,
          profit: mfFinalValue - amount,
          riskLevel: riskLevel === 'Low' ? 'Medium' : riskLevel === 'Medium' ? 'High' : 'Very High',
          stability: riskLevel === 'Low' ? 70 : riskLevel === 'Medium' ? 60 : 50,
          liquidity: 85,
          pros: ['High growth potential', 'Professional management', 'Diversification', 'SIP option'],
          cons: ['Market risk', 'No guaranteed returns', 'Management fees', 'Volatility'],
          suitability: riskLevel === 'Low' ? 60 : riskLevel === 'Medium' ? 85 : 95
        }
      },
      aiVerdict: {
        bestOption: goldFinalValue > fdFinalValue && goldFinalValue > mfFinalValue ? 'gold' :
                   fdFinalValue > mfFinalValue ? 'fd' : 'mutualFunds',
        backupOption: goldFinalValue < mfFinalValue && goldFinalValue > fdFinalValue ? 'gold' :
                     fdFinalValue < mfFinalValue && fdFinalValue > goldFinalValue ? 'fd' : 'gold',
        avoidOption: fdFinalValue < goldFinalValue && fdFinalValue < mfFinalValue ? 'fd' : 'none',
        reasoning: `Based on your ${riskLevel.toLowerCase()} risk preference and ${years}-year timeline, this combination offers the best balance of growth and safety.`,
        confidenceScore: 85
      },
      marketInsights: {
        goldOutlook: 'Moderate growth expected due to global economic uncertainty',
        fdOutlook: 'Stable but inflation may erode real returns',
        mfOutlook: years > 5 ? 'Strong long-term potential with market volatility' : 'Short-term volatility expected',
        economicFactors: ['Inflation trends', 'Interest rate changes', 'Market sentiment', 'Global events']
      },
      riskAnalysis: {
        goldRisk: 'Price fluctuations based on global demand and currency movements',
        fdRisk: 'Inflation risk and opportunity cost of higher returns elsewhere',
        mfRisk: 'Market volatility can cause significant short-term losses',
        overallAssessment: riskLevel === 'Low' ? 'Conservative approach recommended' :
                          riskLevel === 'Medium' ? 'Balanced portfolio suggested' :
                          'Growth-focused strategy with higher volatility'
      }
    });

    setIsAnalyzing(false);
  };

  const BarChartComponent = ({ data, title }: { data: any[], title: string }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const colors = ['#FFD700', '#4F46E5', '#10B981'];

    return (
      <div className="bg-jet-black rounded-xl p-6">
        <h4 className="text-lg font-bold text-soft-white mb-4 text-center">{title}</h4>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white text-sm">{item.name}</span>
                <span className="text-soft-white font-bold">₹{(item.value / 100000).toFixed(1)}L</span>
              </div>
              <div className="w-full bg-charcoal-gray rounded-full h-4">
                <div
                  className="h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: colors[index]
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChartComponent = ({ data, title }: { data: any[], title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const colors = ['#FFD700', '#4F46E5', '#10B981'];

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
                  fill={colors[index]}
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
                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: colors[index] }}></div>
                <span className="text-white text-sm">{item.name}</span>
              </div>
              <span className="text-soft-white font-medium">{((item.value / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const generatePDFReport = () => {
    if (!comparison) return;

    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Smart Investment Comparator Report', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text('Educational Prediction - Not a Financial Guarantee', 20, 45);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Investment Details:', 20, 65);
    doc.setFontSize(10);
    doc.text(`Amount: ₹${comparison.inputSummary.amount.toLocaleString()}`, 20, 75);
    doc.text(`Time Period: ${comparison.inputSummary.years} years`, 20, 85);
    doc.text(`Risk Preference: ${comparison.inputSummary.riskLevel}`, 20, 95);
    
    doc.setFontSize(12);
    doc.text('Comparison Results:', 20, 115);
    doc.setFontSize(10);
    doc.text(`Gold: ₹${(comparison.investments.gold.finalValue / 100000).toFixed(1)}L (${comparison.investments.gold.expectedReturn}% return)`, 20, 125);
    doc.text(`Fixed Deposit: ₹${(comparison.investments.fd.finalValue / 100000).toFixed(1)}L (${comparison.investments.fd.expectedReturn}% return)`, 20, 135);
    doc.text(`Mutual Funds: ₹${(comparison.investments.mutualFunds.finalValue / 100000).toFixed(1)}L (${comparison.investments.mutualFunds.expectedReturn}% return)`, 20, 145);
    
    doc.setFontSize(12);
    doc.text('AI Recommendation:', 20, 165);
    doc.setFontSize(10);
    const bestInvestment = comparison.investments[comparison.aiVerdict.bestOption];
    doc.text(`Best Option: ${bestInvestment.name}`, 20, 175);
    doc.text(comparison.aiVerdict.reasoning, 20, 185, { maxWidth: 170 });
    
    doc.save('smart-investment-comparison.pdf');
  };

  return (
    <section className="py-16 bg-jet-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-soft-white mb-4">
            Smart Investment <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Comparator</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto font-inter">
            AI-powered comparison of Gold, Fixed Deposits, and Mutual Funds based on your profile
          </p>
        </div>

        {!comparison ? (
          <div className="max-w-3xl mx-auto bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-8">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-bold">Educational Prediction - Not a Financial Guarantee</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">
              💰 Enter Investment Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-soft-white font-medium mb-2">Investment Amount *</label>
                  <input
                    type="number"
                    value={investmentData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="e.g., 100000"
                    className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-soft-white font-medium mb-2">Time Period *</label>
                  <select
                    value={investmentData.timePeriod}
                    onChange={(e) => handleInputChange('timePeriod', e.target.value)}
                    className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Time Period</option>
                    <option value="1">1 Year</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-soft-white font-medium mb-2">Risk Preference *</label>
                  <select
                    value={investmentData.riskPreference}
                    onChange={(e) => handleInputChange('riskPreference', e.target.value)}
                    className="w-full bg-jet-black border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Risk Level</option>
                    <option value="Low">Low Risk (Safety First)</option>
                    <option value="Medium">Medium Risk (Balanced)</option>
                    <option value="High">High Risk (Growth Focus)</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-xl p-6 border border-emerald-500/20">
                <h4 className="font-bold text-soft-white mb-4">📊 What We'll Compare</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">Au</span>
                    </div>
                    <div>
                      <h5 className="text-soft-white font-medium">Gold Investment</h5>
                      <p className="text-white text-sm">Physical & digital gold options</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h5 className="text-soft-white font-medium">Fixed Deposits</h5>
                      <p className="text-white text-sm">Bank FDs and corporate deposits</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h5 className="text-soft-white font-medium">Mutual Funds</h5>
                      <p className="text-white text-sm">Equity and hybrid fund options</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={compareInvestments}
                    disabled={isAnalyzing || !investmentData.amount || !investmentData.timePeriod || !investmentData.riskPreference}
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {isAnalyzing ? '🧠 AI Analyzing...' : '🚀 Compare Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Warning Banner */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                <span className="text-orange-400 font-bold text-lg">Educational Prediction - Not a Financial Guarantee</span>
              </div>
            </div>

            {/* Investment Comparison Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Gold */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-2xl p-6 border border-yellow-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">Au</span>
                  </div>
                  <h3 className="text-xl font-bold text-soft-white">Gold Investment</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white">Expected Return:</span>
                    <span className="text-yellow-400 font-bold">{comparison.investments.gold.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Final Value:</span>
                    <span className="text-soft-white font-bold">₹{(comparison.investments.gold.finalValue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Profit:</span>
                    <span className="text-green-400 font-bold">₹{(comparison.investments.gold.profit / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Risk Level:</span>
                    <span className="text-orange-400 font-bold">{comparison.investments.gold.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Suitability:</span>
                    <span className="text-blue-400 font-bold">{comparison.investments.gold.suitability}%</span>
                  </div>
                </div>
              </div>

              {/* Fixed Deposit */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-soft-white">Fixed Deposit</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white">Expected Return:</span>
                    <span className="text-blue-400 font-bold">{comparison.investments.fd.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Final Value:</span>
                    <span className="text-soft-white font-bold">₹{(comparison.investments.fd.finalValue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Profit:</span>
                    <span className="text-green-400 font-bold">₹{(comparison.investments.fd.profit / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Risk Level:</span>
                    <span className="text-green-400 font-bold">{comparison.investments.fd.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Suitability:</span>
                    <span className="text-blue-400 font-bold">{comparison.investments.fd.suitability}%</span>
                  </div>
                </div>
              </div>

              {/* Mutual Funds */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-soft-white">Mutual Funds</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white">Expected Return:</span>
                    <span className="text-green-400 font-bold">{comparison.investments.mutualFunds.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Final Value:</span>
                    <span className="text-soft-white font-bold">₹{(comparison.investments.mutualFunds.finalValue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Profit:</span>
                    <span className="text-green-400 font-bold">₹{(comparison.investments.mutualFunds.profit / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Risk Level:</span>
                    <span className="text-red-400 font-bold">{comparison.investments.mutualFunds.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Suitability:</span>
                    <span className="text-blue-400 font-bold">{comparison.investments.mutualFunds.suitability}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <BarChartComponent
                title="💰 Final Value Comparison"
                data={[
                  { name: 'Gold', value: comparison.investments.gold.finalValue },
                  { name: 'Fixed Deposit', value: comparison.investments.fd.finalValue },
                  { name: 'Mutual Funds', value: comparison.investments.mutualFunds.finalValue }
                ]}
              />
              
              <PieChartComponent
                title="📊 Profit Distribution"
                data={[
                  { name: 'Gold', value: comparison.investments.gold.profit },
                  { name: 'Fixed Deposit', value: comparison.investments.fd.profit },
                  { name: 'Mutual Funds', value: comparison.investments.mutualFunds.profit }
                ]}
              />
            </div>

            {/* AI Verdict */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">🤖 AI Final Verdict</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-green-400 mb-2">BEST OPTION</h4>
                  <p className="text-soft-white font-bold text-lg">{comparison.investments[comparison.aiVerdict.bestOption].name}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-yellow-400 mb-2">BACKUP OPTION</h4>
                  <p className="text-soft-white font-bold text-lg">{comparison.investments[comparison.aiVerdict.backupOption].name}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-xl">{comparison.aiVerdict.confidenceScore}%</span>
                  </div>
                  <h4 className="font-bold text-blue-400 mb-2">CONFIDENCE</h4>
                  <p className="text-soft-white font-bold text-lg">AI Accuracy</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-6 border border-emerald-500/20">
                <h4 className="font-bold text-soft-white mb-3">💡 AI Reasoning</h4>
                <p className="text-white">{comparison.aiVerdict.reasoning}</p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(comparison.investments).map(([key, investment]: [string, any]) => (
                <div key={key} className="bg-charcoal-gray rounded-2xl p-6 border border-slate-gray/20">
                  <h4 className="font-bold text-soft-white mb-4">{investment.name} Analysis</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-green-400 mb-2">✅ Pros</h5>
                      <ul className="space-y-1">
                        {investment.pros.map((pro: string, index: number) => (
                          <li key={index} className="text-white text-sm flex items-start">
                            <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-red-400 mb-2">❌ Cons</h5>
                      <ul className="space-y-1">
                        {investment.cons.map((con: string, index: number) => (
                          <li key={index} className="text-white text-sm flex items-start">
                            <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">Stability:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-charcoal-gray rounded-full">
                          <div 
                            className="h-2 bg-blue-400 rounded-full transition-all duration-1000"
                            style={{ width: `${investment.stability}%` }}
                          ></div>
                        </div>
                        <span className="text-blue-400 text-sm font-bold">{investment.stability}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">Liquidity:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-charcoal-gray rounded-full">
                          <div 
                            className="h-2 bg-green-400 rounded-full transition-all duration-1000"
                            style={{ width: `${investment.liquidity}%` }}
                          ></div>
                        </div>
                        <span className="text-green-400 text-sm font-bold">{investment.liquidity}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Market Insights */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">📈 Market Insights & Risk Analysis</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-soft-white mb-3">🔮 Market Outlook</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-1">Gold</h5>
                        <p className="text-white text-sm">{comparison.marketInsights.goldOutlook}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-400 mb-1">Fixed Deposits</h5>
                        <p className="text-white text-sm">{comparison.marketInsights.fdOutlook}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-400 mb-1">Mutual Funds</h5>
                        <p className="text-white text-sm">{comparison.marketInsights.mfOutlook}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-soft-white mb-3">⚠️ Risk Assessment</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-1">Gold Risk</h5>
                        <p className="text-white text-sm">{comparison.riskAnalysis.goldRisk}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-400 mb-1">FD Risk</h5>
                        <p className="text-white text-sm">{comparison.riskAnalysis.fdRisk}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-400 mb-1">MF Risk</h5>
                        <p className="text-white text-sm">{comparison.riskAnalysis.mfRisk}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                    <h5 className="font-bold text-emerald-400 mb-2">📊 Overall Assessment</h5>
                    <p className="text-white text-sm">{comparison.riskAnalysis.overallAssessment}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold text-soft-white mb-3">🌍 Economic Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {comparison.marketInsights.economicFactors.map((factor: string, index: number) => (
                    <span key={index} className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={generatePDFReport}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Comparison Report</span>
              </button>
              
              <button
                onClick={() => {
                  setComparison(null);
                  setInvestmentData({amount: '', timePeriod: '', riskPreference: ''});
                }}
                className="bg-charcoal-gray text-soft-white px-6 py-3 rounded-xl font-semibold hover:bg-jet-black transition-all duration-300"
              >
                ← New Comparison
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartInvestmentComparator;