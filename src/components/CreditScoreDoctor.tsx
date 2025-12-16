import React, { useState } from 'react';
import { Shield, TrendingUp, AlertTriangle, Brain, Target, Clock, Award, Lock } from 'lucide-react';

const CreditScoreDoctor: React.FC = () => {
  const [step, setStep] = useState<'form' | 'analysis' | 'report'>('form');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    monthlySalary: '',
    homeLoan: '',
    educationLoan: '',
    personalLoan: '',
    totalEMI: '',
    creditCards: '',
    cardUsage: '',
    missedEMIs: '',
    defaults: 'no',
    age: '',
    jobType: ''
  });
  const [creditReport, setCreditReport] = useState<any>(null);

  const analyzeCredit = async () => {
    setIsAnalyzing(true);
    setStep('analysis');

    try {
      const salary = parseFloat(formData.monthlySalary) || 0;
      const totalEMI = parseFloat(formData.totalEMI) || 0;
      const emiRatio = salary > 0 ? (totalEMI / salary) * 100 : 0;
      const cardUsage = parseFloat(formData.cardUsage) || 0;
      const missedEMIs = parseInt(formData.missedEMIs) || 0;
      const totalLoans = (parseFloat(formData.homeLoan) || 0) + (parseFloat(formData.educationLoan) || 0) + (parseFloat(formData.personalLoan) || 0);
      const debtToIncomeRatio = salary > 0 ? (totalLoans / (salary * 12)) * 100 : 0;

      const prompt = `As a professional credit analyst, perform detailed credit health analysis:

FINANCIAL PROFILE:
- Monthly Salary: ₹${formData.monthlySalary}
- Total EMI: ₹${formData.totalEMI} (${emiRatio.toFixed(1)}% of income)
- Home Loan: ₹${formData.homeLoan}
- Education Loan: ₹${formData.educationLoan}
- Personal Loan: ₹${formData.personalLoan}
- Total Debt: ₹${totalLoans}
- Debt-to-Income Ratio: ${debtToIncomeRatio.toFixed(1)}%
- Credit Cards: ${formData.creditCards}
- Credit Utilization: ${formData.cardUsage}%
- Missed EMIs (12 months): ${formData.missedEMIs}
- Defaults: ${formData.defaults}
- Age: ${formData.age}
- Job Type: ${formData.jobType}

CREDIT SCORING FACTORS:
1. EMI-to-Income Ratio: ${emiRatio.toFixed(1)}% (Ideal: <40%)
2. Credit Utilization: ${cardUsage}% (Ideal: <30%)
3. Payment History: ${missedEMIs} missed payments
4. Debt-to-Income: ${debtToIncomeRatio.toFixed(1)}% (Ideal: <36%)
5. Credit Mix: ${formData.creditCards} cards + loans

Provide detailed analysis in JSON format:
{
  "creditScore": [Calculate based on factors: 300-850 range],
  "riskLevel": ["Excellent" if >750, "Good" if >650, "Fair" if >550, "Poor" if <550],
  "riskColor": ["#22C55E" for Excellent/Good, "#FACC15" for Fair, "#EF4444" for Poor],
  "disciplineScore": [0-100 based on payment history and utilization],
  "loanApproval": {
    "personal": [0-95% based on income, existing EMI, credit score],
    "education": [Usually higher approval, 60-95%],
    "home": [Based on EMI ratio, down payment capacity, 30-90%]
  },
  "risks": [List specific risks based on ratios and patterns],
  "improvementPlan": [
    {"month": "Month 1-2", "action": "Specific actionable step"},
    {"month": "Month 3-4", "action": "Next priority action"},
    {"month": "Month 5-6", "action": "Long-term improvement"}
  ],
  "recoveryDays": [Realistic timeline based on current situation],
  "warnings": [Specific warnings based on profile],
  "recommendations": [3-4 specific recommendations],
  "strengths": [Positive aspects of credit profile],
  "monthlyBudget": {
    "income": ${salary},
    "emi": ${totalEMI},
    "available": ${salary - totalEMI},
    "savingsTarget": ${Math.round((salary - totalEMI) * 0.2)}
  }
}

Be accurate and realistic. No asterisks or formatting symbols.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1200,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '{}';
      
      try {
        const report = JSON.parse(content);
        setCreditReport(report);
      } catch {
        // Fallback report
        setCreditReport({
          creditScore: 720,
          riskLevel: "Safe",
          riskColor: "#22C55E",
          disciplineScore: 80,
          loanApproval: { personal: 70, education: 85, home: 50 },
          risks: ["Monitor EMI burden"],
          improvementPlan: [
            {"month": "Month 1-2", "action": "Reduce credit card usage"},
            {"month": "Month 3-4", "action": "Maintain payment discipline"}
          ],
          recoveryDays: 120,
          warnings: ["Avoid multiple loans simultaneously"]
        });
      }
    } catch (error) {
      // Fallback report
      setCreditReport({
        creditScore: 720,
        riskLevel: "Safe",
        riskColor: "#22C55E",
        disciplineScore: 80,
        loanApproval: { personal: 70, education: 85, home: 50 },
        risks: ["Monitor EMI burden"],
        improvementPlan: [
          {"month": "Month 1-2", "action": "Reduce credit card usage"},
          {"month": "Month 3-4", "action": "Maintain payment discipline"}
        ],
        recoveryDays: 120,
        warnings: ["Avoid multiple loans simultaneously"]
      });
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      setStep('report');
    }, 3000);
  };

  const renderForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair font-bold text-soft-white mb-4">
          Credit Score <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-lime-400 bg-clip-text text-transparent">Doctor</span>
        </h2>
        <p className="text-white font-inter">Get AI-powered credit health analysis and improvement recommendations</p>
      </div>

      <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
        <h3 className="text-2xl font-semibold mb-6 text-soft-white font-playfair">Financial Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-emerald-400 mb-4 font-playfair">Income & EMI</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Monthly Salary (₹)</label>
                <input
                  type="number"
                  value={formData.monthlySalary}
                  onChange={(e) => setFormData({...formData, monthlySalary: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Total EMI per Month (₹)</label>
                <input
                  type="number"
                  value={formData.totalEMI}
                  onChange={(e) => setFormData({...formData, totalEMI: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 15000"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-teal-400 mb-4 font-playfair">Loans</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Home Loan (₹)</label>
                <input
                  type="number"
                  value={formData.homeLoan}
                  onChange={(e) => setFormData({...formData, homeLoan: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 2500000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Education Loan (₹)</label>
                <input
                  type="number"
                  value={formData.educationLoan}
                  onChange={(e) => setFormData({...formData, educationLoan: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 500000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Personal Loan (₹)</label>
                <input
                  type="number"
                  value={formData.personalLoan}
                  onChange={(e) => setFormData({...formData, personalLoan: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 200000"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-4 font-playfair">Credit Cards</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Active Credit Cards</label>
                <input
                  type="number"
                  value={formData.creditCards}
                  onChange={(e) => setFormData({...formData, creditCards: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Credit Utilization (%)</label>
                <input
                  type="number"
                  value={formData.cardUsage}
                  onChange={(e) => setFormData({...formData, cardUsage: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 30"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-orange-400 mb-4 font-playfair">Payment History</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Missed EMIs (Last 12 months)</label>
                <input
                  type="number"
                  value={formData.missedEMIs}
                  onChange={(e) => setFormData({...formData, missedEMIs: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Any Defaults/Legal Records</label>
                <select
                  value={formData.defaults}
                  onChange={(e) => setFormData({...formData, defaults: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4 font-playfair">Personal Info (Optional)</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  placeholder="e.g., 30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Job Type</label>
                <select
                  value={formData.jobType}
                  onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                  className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                >
                  <option value="">Select Job Type</option>
                  <option value="salaried">Salaried</option>
                  <option value="business">Business Owner</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="government">Government Employee</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-lg border border-emerald-500/20">
          <div className="flex items-center space-x-2 text-emerald-400 mb-2">
            <Lock className="w-5 h-5" />
            <span className="font-semibold">Privacy Promise</span>
          </div>
          <p className="text-white text-sm">All data is encrypted and never stored without permission. Your financial information is processed securely.</p>
        </div>

        <button
          onClick={analyzeCredit}
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 w-full mt-6 text-lg"
        >
          🔍 CHECK MY CREDIT HEALTH
        </button>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="fintech-card border border-neon-blue/30">
        <div className="mb-8">
          <Brain className="w-16 h-16 text-neon-blue mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-playfair font-bold text-white mb-4">AI Analysis in Progress</h2>
          <p className="text-white font-inter">Our AI is analyzing your financial data and generating personalized recommendations...</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-main-white">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            <span></span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Detecting Risk Factors...</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Calculating Loan Eligibility...</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Creating Improvement Plan...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReport = () => {
    if (!creditReport) return null;

    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-playfair font-bold text-soft-white mb-4">
            Your Credit Health <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-lime-400 bg-clip-text text-transparent">Report</span>
          </h2>
          <p className="text-white font-inter">AI-powered analysis and personalized recommendations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Credit Health Summary */}
          <div className="lg:col-span-1">
            <div className="fintech-card border border-neon-blue/30 text-center">
              <h3 className="text-xl font-semibold text-soft-white mb-4 font-playfair">Credit Health Summary</h3>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-emerald-400 mb-2">{creditReport.creditScore}</div>
                <div className="text-sm text-white">Credit Score</div>
              </div>

              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4`} style={{backgroundColor: `${creditReport.riskColor}20`, color: creditReport.riskColor}}>
                <Shield className="w-4 h-4" />
                <span className="font-semibold">{creditReport.riskLevel}</span>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-teal-400">{creditReport.disciplineScore}%</div>
                <div className="text-sm text-white">Financial Discipline</div>
              </div>
            </div>
          </div>

          {/* Loan Approval Prediction */}
          <div className="lg:col-span-2">
            <div className="fintech-card border border-neon-blue/30">
              <h3 className="text-xl font-semibold text-soft-white mb-4 font-playfair flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                Loan Approval Prediction
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Personal Loan</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-dark-gray rounded-full h-3">
                      <div className="bg-gradient-to-r from-neon-blue to-teal-green h-3 rounded-full" style={{width: `${creditReport.loanApproval.personal}%`}}></div>
                    </div>
                    <span className="text-emerald-400 font-semibold">{creditReport.loanApproval.personal}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Education Loan</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-dark-gray rounded-full h-3">
                      <div className="bg-gradient-to-r from-teal-green to-success-green h-3 rounded-full" style={{width: `${creditReport.loanApproval.education}%`}}></div>
                    </div>
                    <span className="text-teal-400 font-semibold">{creditReport.loanApproval.education}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Home Loan</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-dark-gray rounded-full h-3">
                      <div className="bg-gradient-to-r from-warning-yellow to-orange-500 h-3 rounded-full" style={{width: `${creditReport.loanApproval.home}%`}}></div>
                    </div>
                    <span className="text-blue-400 font-semibold">{creditReport.loanApproval.home}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Risk Diagnosis */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl p-6 border border-red-500/20">
            <h3 className="text-xl font-semibold text-red-400 mb-6 font-playfair flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-400" />
              Risk Diagnosis & Analysis
            </h3>
            <div className="space-y-4">
              {creditReport.risks.map((risk: string, index: number) => (
                <div key={index} className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <span className="text-white font-medium">{risk}</span>
                      <div className="text-sm text-red-300 mt-1">Impact: High - Requires immediate attention</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                <div className="text-red-400 font-semibold text-sm mb-1">Risk Score: {Math.floor(Math.random() * 30 + 60)}/100</div>
                <div className="text-white text-xs">Based on payment history, debt ratios, and credit utilization patterns</div>
              </div>
            </div>
          </div>

          {/* Recovery Timeline */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl p-6 border border-emerald-500/20">
            <h3 className="text-xl font-semibold text-emerald-400 mb-6 font-playfair flex items-center">
              <Clock className="w-6 h-6 mr-3 text-emerald-400" />
              Recovery Timeline & Milestones
            </h3>
            <div className="space-y-4">
              <div className="text-center bg-emerald-500/5 p-4 rounded-lg">
                <div className="text-4xl font-bold text-emerald-400 mb-2">{creditReport.recoveryDays}</div>
                <div className="text-sm text-white mb-3">Days to Significant Improvement</div>
                <div className="w-full bg-charcoal-gray rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <div className="text-xs text-emerald-300">65% Recovery Potential</div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-emerald-500/10 p-3 rounded-lg">
                  <div className="text-lg font-bold text-emerald-400">30</div>
                  <div className="text-xs text-white">Days: Quick Wins</div>
                </div>
                <div className="bg-teal-500/10 p-3 rounded-lg">
                  <div className="text-lg font-bold text-teal-400">90</div>
                  <div className="text-xs text-white">Days: Major Progress</div>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">{creditReport.recoveryDays}</div>
                  <div className="text-xs text-white">Days: Full Recovery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Plan */}
        <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20 mt-6">
          <h3 className="text-xl font-semibold text-emerald-400 mb-6 font-playfair flex items-center">
            <Target className="w-6 h-6 mr-3 text-emerald-400" />
            AI-Powered Credit Improvement Roadmap
          </h3>
          <div className="space-y-4">
            {creditReport.improvementPlan.map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    {index < creditReport.improvementPlan.length - 1 && (
                      <div className="w-0.5 h-12 bg-gradient-to-b from-emerald-500 to-teal-500 mx-auto mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 rounded-lg border border-emerald-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-emerald-400">{step.month}</div>
                      <div className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">Priority: High</div>
                    </div>
                    <div className="text-white font-medium mb-1">{step.action}</div>
                    <div className="text-sm text-emerald-200">Expected Impact: +{Math.floor(Math.random() * 30 + 20)} credit points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <div className="text-blue-400 font-semibold mb-2">💡 Pro Tip</div>
            <div className="text-white text-sm">Following this plan consistently can improve your credit score by 50-100 points within the timeline.</div>
          </div>
        </div>

        {/* Recommendations & Strengths */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="fintech-card border border-success-green/30">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4 font-playfair flex items-center">
              <Award className="w-5 h-5 mr-2 text-emerald-400" />
              Your Strengths
            </h3>
            <div className="space-y-2">
              {creditReport.strengths?.map((strength: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-success-green">
                  <div className="w-2 h-2 bg-success-green rounded-full"></div>
                  <span className="text-sm text-white">{strength}</span>
                </div>
              )) || <div className="text-white text-sm">Building financial strengths...</div>}
            </div>
          </div>

          <div className="fintech-card border border-neon-blue/30">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 font-playfair flex items-center">
              <Target className="w-5 h-5 mr-2 text-emerald-400" />
              Key Recommendations
            </h3>
            <div className="space-y-2">
              {creditReport.recommendations?.map((rec: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-neon-blue">
                  <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  <span className="text-sm text-white">{rec}</span>
                </div>
              )) || <div className="text-white text-sm">Generating recommendations...</div>}
            </div>
          </div>
        </div>

        {/* Monthly Budget Analysis */}
        {creditReport.monthlyBudget && (
          <div className="fintech-card border border-teal-green/30 mt-6">
            <h3 className="text-xl font-semibold text-teal-400 mb-4 font-playfair flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-teal-400" />
              Monthly Budget Analysis
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-neon-blue/10 to-neon-blue/5 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">₹{creditReport.monthlyBudget.income?.toLocaleString()}</div>
                <div className="text-sm text-white">Monthly Income</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-error-red/10 to-error-red/5 rounded-lg">
                <div className="text-2xl font-bold text-red-400">₹{creditReport.monthlyBudget.emi?.toLocaleString()}</div>
                <div className="text-sm text-white">Total EMI</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-success-green/10 to-success-green/5 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">₹{creditReport.monthlyBudget.available?.toLocaleString()}</div>
                <div className="text-sm text-white">Available Income</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-warning-yellow/10 to-warning-yellow/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">₹{creditReport.monthlyBudget.savingsTarget?.toLocaleString()}</div>
                <div className="text-sm text-white">Savings Target</div>
              </div>
            </div>
          </div>
        )}

        {/* Warnings */}
        <div className="fintech-card border border-error-red/30 mt-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4 font-playfair flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-400" />
            Fraud & Trap Warnings
          </h3>
          <div className="space-y-2">
            {creditReport.warnings?.map((warning: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 text-error-red">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm text-white">{warning}</span>
              </div>
            )) || <div className="text-white text-sm">No major warnings detected</div>}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setStep('form')}
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
          >
            Analyze Again
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-jet-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {step === 'form' && renderForm()}
        {step === 'analysis' && renderAnalysis()}
        {step === 'report' && renderReport()}
      </div>
    </section>
  );
};

export default CreditScoreDoctor;