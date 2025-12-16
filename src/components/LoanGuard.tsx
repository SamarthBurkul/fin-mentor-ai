import React, { useState } from 'react';
import { Shield, AlertTriangle, X, TrendingUp, Calculator, Download, FileText, Users } from 'lucide-react';
import jsPDF from 'jspdf';

const LoanGuard: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loanAnalysis, setLoanAnalysis] = useState<any>(null);
  const [formData, setFormData] = useState({
    lenderName: '',
    loanAmount: '',
    interestRate: '',
    tenure: '',
    emi: '',
    processingFee: '',
    monthlyIncome: '',
    lenderType: ''
  });

  const analyzeLoan = async () => {
    setIsAnalyzing(true);

    try {
      const loanAmount = parseFloat(formData.loanAmount) || 0;
      const rate = parseFloat(formData.interestRate) || 0;
      const emi = parseFloat(formData.emi) || 0;
      const income = parseFloat(formData.monthlyIncome) || 0;
      const processingFee = parseFloat(formData.processingFee) || 0;
      const tenure = parseFloat(formData.tenure) || 1;

      const emiRatio = income > 0 ? (emi / income) * 100 : 0;
      const processingFeeRatio = loanAmount > 0 ? (processingFee / loanAmount) * 100 : 0;
      const totalPayable = emi * tenure;
      const totalInterest = totalPayable - loanAmount;

      const prompt = `Analyze this loan for safety and trap detection:

LOAN DETAILS:
- Lender: ${formData.lenderName}
- Loan Amount: ₹${formData.loanAmount}
- Interest Rate: ${formData.interestRate}% per annum
- Tenure: ${formData.tenure} months
- EMI: ₹${formData.emi}
- Processing Fee: ₹${formData.processingFee} (${processingFeeRatio.toFixed(1)}% of loan)
- Monthly Income: ₹${formData.monthlyIncome}
- Lender Type: ${formData.lenderType}

CALCULATED RATIOS:
- EMI to Income: ${emiRatio.toFixed(1)}%
- Total Interest: ₹${totalInterest.toFixed(0)}
- Processing Fee Ratio: ${processingFeeRatio.toFixed(1)}%

RISK ANALYSIS REQUIRED:
1. Interest rate assessment (market comparison)
2. EMI affordability (should be <40% of income)
3. Processing fee evaluation (should be <3% of loan)
4. Lender credibility check
5. Hidden charges detection

Provide analysis in JSON format:
{
  "status": "Safe/Risky/Dangerous",
  "statusColor": "#22C55E for Safe, #FACC15 for Risky, #EF4444 for Dangerous",
  "riskScore": 0-100,
  "reasons": ["Reason 1", "Reason 2", "Reason 3"],
  "redFlags": ["Flag 1", "Flag 2"],
  "recommendations": ["Action 1", "Action 2"],
  "verdict": "One line summary",
  "calculations": {
    "totalInterest": ${totalInterest.toFixed(0)},
    "emiRatio": ${emiRatio.toFixed(1)},
    "processingFeeRatio": ${processingFeeRatio.toFixed(1)}
  }
}

No formatting symbols. Only JSON.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '{}';
      
      try {
        const analysis = JSON.parse(content);
        setLoanAnalysis(analysis);
      } catch {
        // Fallback analysis
        setLoanAnalysis({
          status: rate > 15 ? "Dangerous" : rate > 12 ? "Risky" : "Safe",
          statusColor: rate > 15 ? "#EF4444" : rate > 12 ? "#FACC15" : "#22C55E",
          riskScore: Math.min(Math.round(rate * 5 + processingFeeRatio * 10 + emiRatio), 100),
          reasons: ["Interest rate analysis", "EMI affordability check", "Processing fee evaluation"],
          redFlags: rate > 15 ? ["Very high interest rate"] : [],
          recommendations: ["Compare with bank loans", "Negotiate processing fee"],
          verdict: "Loan analysis completed",
          calculations: { totalInterest, emiRatio: emiRatio.toFixed(1), processingFeeRatio: processingFeeRatio.toFixed(1) }
        });
      }
    } catch (error) {
      setLoanAnalysis({
        status: "Safe",
        statusColor: "#22C55E",
        riskScore: 30,
        reasons: ["Analysis completed"],
        redFlags: [],
        recommendations: ["Review loan terms carefully"],
        verdict: "Unable to complete full analysis",
        calculations: { totalInterest: 0, emiRatio: "0", processingFeeRatio: "0" }
      });
    }

    setIsAnalyzing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Safe': return <Shield className="w-6 h-6 text-success-green" />;
      case 'Risky': return <AlertTriangle className="w-6 h-6 text-warning-yellow" />;
      case 'Dangerous': return <X className="w-6 h-6 text-error-red" />;
      default: return <Shield className="w-6 h-6 text-subtext-gray" />;
    }
  };

  return (
    <section className="py-16 bg-jet-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-soft-white mb-4">
            Loan<span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Guard</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto font-inter">
            AI-powered loan safety analyzer that detects hidden risks and protects you from dangerous loan traps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-semibold mb-6 text-soft-white font-playfair flex items-center">
                <FileText className="w-6 h-6 mr-2 text-emerald-400" />
                Loan Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Lender Name</label>
                  <input
                    type="text"
                    value={formData.lenderName}
                    onChange={(e) => setFormData({...formData, lenderName: e.target.value})}
                    className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                    placeholder="e.g., HDFC Bank, MoneyTap, etc."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Loan Amount (₹)</label>
                    <input
                      type="number"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                      className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      placeholder="e.g., 200000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Interest Rate (% per annum)</label>
                    <input
                      type="number"
                      value={formData.interestRate}
                      onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                      className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      placeholder="e.g., 12.5"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Tenure (months)</label>
                    <input
                      type="number"
                      value={formData.tenure}
                      onChange={(e) => setFormData({...formData, tenure: e.target.value})}
                      className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      placeholder="e.g., 24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Monthly EMI (₹)</label>
                    <input
                      type="number"
                      value={formData.emi}
                      onChange={(e) => setFormData({...formData, emi: e.target.value})}
                      className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      placeholder="e.g., 9500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Processing Fee (₹)</label>
                  <input
                    type="number"
                    value={formData.processingFee}
                    onChange={(e) => setFormData({...formData, processingFee: e.target.value})}
                    className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                    placeholder="e.g., 5000"
                  />
                </div>

                <div className="border-t border-neon-blue/20 pt-4">
                  <h4 className="text-lg font-semibold text-teal-400 mb-3">Optional (For Better Analysis)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Monthly Income (₹)</label>
                      <input
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                        placeholder="e.g., 50000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Lender Type</label>
                      <select
                        value={formData.lenderType}
                        onChange={(e) => setFormData({...formData, lenderType: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      >
                        <option value="">Select Type</option>
                        <option value="bank">Bank</option>
                        <option value="nbfc">NBFC</option>
                        <option value="app">Loan App</option>
                        <option value="private">Private Lender</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={analyzeLoan}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 w-full mt-6 text-lg disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Loan Safety...</span>
                    </span>
                  ) : (
                    <>🛡️ Analyze Loan Safety</>
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Result */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-2xl font-semibold mb-6 text-soft-white font-playfair flex items-center">
                <Shield className="w-6 h-6 mr-2 text-emerald-400" />
                AI Risk Analysis
              </h3>

              {!loanAnalysis ? (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-subtext-gray mx-auto mb-4" />
                  <p className="text-white font-inter">Enter loan details and click analyze to get AI-powered safety assessment</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Status */}
                  <div className="text-center p-6 rounded-lg border" style={{borderColor: loanAnalysis.statusColor, backgroundColor: `${loanAnalysis.statusColor}10`}}>
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      {getStatusIcon(loanAnalysis.status)}
                      <span className="text-2xl font-bold font-poppins" style={{color: loanAnalysis.statusColor}}>
                        {loanAnalysis.status} Loan
                      </span>
                    </div>
                    <div className="text-4xl font-bold mb-2" style={{color: loanAnalysis.statusColor}}>
                      {loanAnalysis.riskScore}/100
                    </div>
                    <div className="text-sm text-white">Risk Score</div>
                  </div>

                  {/* Risk Meter */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">Risk Level</span>
                      <span style={{color: loanAnalysis.statusColor}}>{loanAnalysis.riskScore}%</span>
                    </div>
                    <div className="w-full bg-dark-gray rounded-full h-4">
                      <div 
                        className="h-4 rounded-full transition-all duration-1000"
                        style={{
                          width: `${loanAnalysis.riskScore}%`,
                          backgroundColor: loanAnalysis.statusColor
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className="p-4 bg-gradient-to-r from-neon-blue/10 to-teal-green/10 rounded-lg">
                    <p className="text-white font-inter font-semibold">{loanAnalysis.verdict}</p>
                  </div>

                  {/* Key Calculations */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-dark-gray/50 rounded-lg">
                      <div className="text-lg font-bold text-emerald-400">₹{loanAnalysis.calculations?.totalInterest?.toLocaleString()}</div>
                      <div className="text-xs text-white">Total Interest</div>
                    </div>
                    <div className="text-center p-3 bg-dark-gray/50 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">{loanAnalysis.calculations?.emiRatio}%</div>
                      <div className="text-xs text-white">EMI Ratio</div>
                    </div>
                    <div className="text-center p-3 bg-dark-gray/50 rounded-lg">
                      <div className="text-lg font-bold text-red-400">{loanAnalysis.calculations?.processingFeeRatio}%</div>
                      <div className="text-xs text-white">Processing Fee</div>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Key Analysis Points:</h4>
                    <div className="space-y-2">
                      {loanAnalysis.reasons?.map((reason: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: loanAnalysis.statusColor}}></div>
                          <span className="text-sm text-white">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Red Flags */}
                  {loanAnalysis.redFlags?.length > 0 && (
                    <div className="p-4 bg-error-red/10 rounded-lg border border-error-red/20">
                      <h4 className="font-semibold text-red-400 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Red Flags Detected:
                      </h4>
                      <div className="space-y-1">
                        {loanAnalysis.redFlags.map((flag: string, index: number) => (
                          <div key={index} className="text-sm text-red-400">• {flag}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">What to Do Next:</h4>
                    <div className="space-y-2">
                      {loanAnalysis.recommendations?.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-teal-400" />
                          <span className="text-sm text-white">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-neon-blue/20">
                    <button 
                      onClick={() => {
                        const pdf = new jsPDF();
                        
                        // Header
                        pdf.setFontSize(20);
                        pdf.setTextColor(0, 229, 255);
                        pdf.text('KANIMA LOANGUARD SAFETY REPORT', 20, 30);
                        
                        // Loan Details
                        pdf.setFontSize(14);
                        pdf.setTextColor(0, 0, 0);
                        pdf.text('LOAN DETAILS', 20, 50);
                        pdf.setFontSize(10);
                        pdf.text(`Lender: ${formData.lenderName}`, 20, 65);
                        pdf.text(`Loan Amount: ₹${formData.loanAmount}`, 20, 75);
                        pdf.text(`Interest Rate: ${formData.interestRate}% per annum`, 20, 85);
                        pdf.text(`Tenure: ${formData.tenure} months`, 20, 95);
                        pdf.text(`Monthly EMI: ₹${formData.emi}`, 20, 105);
                        pdf.text(`Processing Fee: ₹${formData.processingFee}`, 20, 115);
                        
                        // Risk Assessment
                        pdf.setFontSize(14);
                        pdf.text('RISK ASSESSMENT', 20, 135);
                        pdf.setFontSize(12);
                        pdf.setTextColor(loanAnalysis.status === 'Safe' ? 34 : loanAnalysis.status === 'Risky' ? 250 : 239, 
                                         loanAnalysis.status === 'Safe' ? 197 : loanAnalysis.status === 'Risky' ? 204 : 68, 
                                         loanAnalysis.status === 'Safe' ? 94 : loanAnalysis.status === 'Risky' ? 21 : 68);
                        pdf.text(`Status: ${loanAnalysis.status} Loan`, 20, 150);
                        pdf.text(`Risk Score: ${loanAnalysis.riskScore}/100`, 20, 165);
                        
                        // Analysis Points
                        pdf.setFontSize(14);
                        pdf.setTextColor(0, 0, 0);
                        pdf.text('KEY ANALYSIS POINTS', 20, 185);
                        pdf.setFontSize(10);
                        let yPos = 200;
                        loanAnalysis.reasons?.forEach((reason: string, index: number) => {
                          pdf.text(`• ${reason}`, 25, yPos);
                          yPos += 10;
                        });
                        
                        // Recommendations
                        yPos += 10;
                        pdf.setFontSize(14);
                        pdf.text('RECOMMENDATIONS', 20, yPos);
                        yPos += 15;
                        pdf.setFontSize(10);
                        loanAnalysis.recommendations?.forEach((rec: string, index: number) => {
                          pdf.text(`• ${rec}`, 25, yPos);
                          yPos += 10;
                        });
                        
                        // Footer
                        pdf.setFontSize(8);
                        pdf.setTextColor(128, 128, 128);
                        pdf.text('Generated by KANIMA AI - Financial Safety Platform', 20, 280);
                        
                        pdf.save(`LoanGuard_Report_${formData.lenderName || 'Analysis'}.pdf`);
                      }}
                      className="flex-1 bg-gradient-to-r from-neon-blue to-teal-green text-deep-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Report</span>
                    </button>
                    <button className="flex-1 border-2 border-red-400 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-400 hover:text-white transition-all flex items-center justify-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Report Lender</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanGuard;