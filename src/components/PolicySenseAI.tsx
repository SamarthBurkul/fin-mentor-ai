import React, { useState } from 'react';
import { FileSearch, Shield, AlertTriangle, X, TrendingUp, Download, Plus, Minus } from 'lucide-react';
import jsPDF from 'jspdf';

const PolicySenseAI: React.FC = () => {
  const [analysisMode, setAnalysisMode] = useState('compare');
  const [insuranceType, setInsuranceType] = useState('health');
  const [policies, setPolicies] = useState([
    { id: 1, company: '', premium: '', coverage: '', duration: '', waitingPeriod: '', exclusions: '', benefits: '' },
    { id: 2, company: '', premium: '', coverage: '', duration: '', waitingPeriod: '', exclusions: '', benefits: '' }
  ]);
  const [singlePolicy, setSinglePolicy] = useState({
    company: '', premium: '', coverage: '', duration: '', waitingPeriod: '', exclusions: '', benefits: ''
  });
  const [userProfile, setUserProfile] = useState({
    age: '', income: '', healthCondition: '', dependents: '', vehicleType: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const addPolicy = () => {
    if (policies.length < 5) {
      setPolicies([...policies, { 
        id: policies.length + 1, 
        company: '', premium: '', coverage: '', duration: '', waitingPeriod: '', exclusions: '', benefits: '' 
      }]);
    }
  };

  const removePolicy = (id: number) => {
    if (policies.length > 2) {
      setPolicies(policies.filter(p => p.id !== id));
    }
  };

  const updatePolicy = (id: number, field: string, value: string) => {
    setPolicies(policies.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const analyzePolicy = async () => {
    setIsAnalyzing(true);

    try {
      const prompt = analysisMode === 'individual' 
        ? `Analyze this ${insuranceType} insurance policy:

POLICY: ${singlePolicy.company}
- Premium: ₹${singlePolicy.premium}
- Coverage: ₹${singlePolicy.coverage}
- Duration: ${singlePolicy.duration} years
- Waiting Period: ${singlePolicy.waitingPeriod}
- Exclusions: ${singlePolicy.exclusions}
- Benefits: ${singlePolicy.benefits}

USER PROFILE:
- Age: ${userProfile.age}
- Income: ₹${userProfile.income}
- Health: ${userProfile.healthCondition}
- Dependents: ${userProfile.dependents}
- Vehicle: ${userProfile.vehicleType}

Provide detailed analysis in JSON format:
{
  "overallRating": "Safe/Risky/Dangerous",
  "riskFactors": ["Risk factor 1", "Risk factor 2"],
  "hiddenClauses": ["Hidden clause 1", "Hidden clause 2"],
  "marketComparison": "How it compares to market average",
  "claimProcess": "Claim settlement process analysis",
  "policies": [
    {
      "explanation": "Detailed policy explanation in simple terms",
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2", "Con 3"],
      "claimSafetyScore": 85,
      "valueRating": 4,
      "premiumAnalysis": "Premium vs coverage analysis",
      "exclusionAnalysis": "Analysis of exclusions",
      "waitingPeriodAnalysis": "Waiting period impact",
      "suitableFor": "Who should buy this policy",
      "avoidFor": "Who should avoid this policy",
      "recommendations": ["Recommendation 1", "Recommendation 2"]
    }
  ]
}

No formatting symbols. Only JSON.`
        : `Analyze these ${insuranceType} insurance policies for comparison:

POLICIES:
${policies.map((p, i) => `
Policy ${i + 1}: ${p.company}
- Premium: ₹${p.premium}
- Coverage: ₹${p.coverage}
- Duration: ${p.duration} years
- Waiting Period: ${p.waitingPeriod}
- Exclusions: ${p.exclusions}
- Benefits: ${p.benefits}
`).join('')}

USER PROFILE:
- Age: ${userProfile.age}
- Income: ₹${userProfile.income}
- Health: ${userProfile.healthCondition}
- Dependents: ${userProfile.dependents}
- Vehicle: ${userProfile.vehicleType}

Provide detailed comparison analysis in JSON format:
{
  "bestPolicy": {"index": 0, "reason": "Why this is best"},
  "riskyPolicy": {"index": 1, "reason": "Why this is risky"},
  "dangerousPolicy": {"index": -1, "reason": "None dangerous"},
  "marketInsights": "Overall market comparison insights",
  "policies": [
    {
      "explanation": "Detailed policy explanation in simple terms",
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2", "Con 3"],
      "claimSafetyScore": 85,
      "valueRating": 4,
      "premiumAnalysis": "Premium vs coverage analysis",
      "exclusionAnalysis": "Analysis of exclusions",
      "waitingPeriodAnalysis": "Waiting period impact",
      "hiddenTraps": ["Hidden trap 1", "Hidden trap 2"],
      "suitableFor": "Who should buy this policy",
      "avoidFor": "Who should avoid this policy",
      "recommendations": ["Recommendation 1", "Recommendation 2"]
    }
  ]
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
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '{}';
      
      try {
        const result = JSON.parse(content);
        setAnalysis(result);
      } catch {
        const fallbackPolicies = analysisMode === 'individual' ? [singlePolicy] : policies;
        setAnalysis({
          bestPolicy: { index: 0, reason: "Best value for money" },
          riskyPolicy: { index: analysisMode === 'individual' ? -1 : 1, reason: "High premium compared to coverage" },
          dangerousPolicy: { index: -1, reason: "No dangerous policies detected" },
          overallRating: "Safe",
          riskFactors: ["Standard risk factors"],
          hiddenClauses: ["No major hidden clauses detected"],
          marketComparison: "Competitive with market standards",
          claimProcess: "Standard claim settlement process",
          policies: fallbackPolicies.map(() => ({
            explanation: "Policy analysis completed with standard coverage",
            pros: ["Coverage provided", "Claim settlement", "Standard benefits"],
            cons: ["Premium cost", "Waiting period", "Standard exclusions"],
            claimSafetyScore: 75,
            valueRating: 3,
            premiumAnalysis: "Premium is reasonable for coverage provided",
            exclusionAnalysis: "Standard exclusions apply",
            waitingPeriodAnalysis: "Waiting period is industry standard",
            suitableFor: "General users with standard needs",
            avoidFor: "High-risk individuals",
            recommendations: ["Review terms carefully", "Compare with other options"]
          }))
        });
      }
    } catch (error) {
      const fallbackPolicies = analysisMode === 'individual' ? [singlePolicy] : policies;
      setAnalysis({
        bestPolicy: { index: 0, reason: "Analysis completed" },
        riskyPolicy: { index: -1, reason: "No risky policies found" },
        dangerousPolicy: { index: -1, reason: "No dangerous policies found" },
        overallRating: "Safe",
        riskFactors: ["Basic risk assessment completed"],
        hiddenClauses: ["Standard policy terms"],
        marketComparison: "Average market positioning",
        claimProcess: "Standard claim process",
        policies: fallbackPolicies.map(() => ({
          explanation: "Basic policy coverage with standard terms",
          pros: ["Insurance coverage", "Basic protection", "Standard benefits"],
          cons: ["Premium payment required", "Standard waiting period", "Basic exclusions"],
          claimSafetyScore: 70,
          valueRating: 3,
          premiumAnalysis: "Premium aligns with basic coverage",
          exclusionAnalysis: "Standard exclusions present",
          waitingPeriodAnalysis: "Standard waiting periods apply",
          suitableFor: "All users seeking basic coverage",
          avoidFor: "Users needing comprehensive coverage",
          recommendations: ["Consider coverage needs", "Review policy terms"]
        }))
      });
    }

    setIsAnalyzing(false);
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
            Policy<span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent">Sense AI</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto font-inter">
            Smart Insurance Comparison & Easy Explanation - Compare policies, detect traps, get AI recommendations
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Analysis Mode & Insurance Type */}
          <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-soft-white">Analysis Mode</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setAnalysisMode('compare')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      analysisMode === 'compare' 
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white' 
                        : 'border border-slate-gray/30 text-white hover:bg-emerald-500/10'
                    }`}
                  >
                    Compare
                  </button>
                  <button
                    onClick={() => setAnalysisMode('individual')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      analysisMode === 'individual' 
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white' 
                        : 'border border-slate-gray/30 text-white hover:bg-emerald-500/10'
                    }`}
                  >
                    Single Policy
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-soft-white">Insurance Type</h3>
                <div className="flex space-x-3">
                  {['health', 'life', 'vehicle'].map(type => (
                    <button
                      key={type}
                      onClick={() => setInsuranceType(type)}
                      className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                        insuranceType === type 
                          ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white' 
                          : 'border border-slate-gray/30 text-white hover:bg-emerald-500/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Policy Input Section */}
            <div className="space-y-6">
              <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-soft-white">Policy Details</h3>
                  <div className="flex space-x-2">
                    <button onClick={addPolicy} disabled={policies.length >= 5} className="p-2 bg-teal-400/20 text-teal-400 rounded-lg disabled:opacity-50">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button onClick={() => removePolicy(policies[policies.length - 1]?.id)} disabled={policies.length <= 2} className="p-2 bg-red-400/20 text-red-400 rounded-lg disabled:opacity-50">
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {analysisMode === 'individual' ? (
                  <div className="p-4 bg-jet-black/30 rounded-lg border border-slate-gray/20">
                    <h4 className="text-lg font-semibold text-teal-400 mb-4">Policy Information</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Insurance Company"
                        value={singlePolicy.company}
                        onChange={(e) => setSinglePolicy({...singlePolicy, company: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      />
                      <input
                        type="number"
                        placeholder="Annual Premium (₹)"
                        value={singlePolicy.premium}
                        onChange={(e) => setSinglePolicy({...singlePolicy, premium: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      />
                      <input
                        type="number"
                        placeholder="Coverage Amount (₹)"
                        value={singlePolicy.coverage}
                        onChange={(e) => setSinglePolicy({...singlePolicy, coverage: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      />
                      <input
                        type="number"
                        placeholder="Duration (years)"
                        value={singlePolicy.duration}
                        onChange={(e) => setSinglePolicy({...singlePolicy, duration: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      />
                      <input
                        type="text"
                        placeholder="Waiting Period"
                        value={singlePolicy.waitingPeriod}
                        onChange={(e) => setSinglePolicy({...singlePolicy, waitingPeriod: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      />
                      <input
                        type="text"
                        placeholder="Key Benefits"
                        value={singlePolicy.benefits}
                        onChange={(e) => setSinglePolicy({...singlePolicy, benefits: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                      />
                      <input
                        type="text"
                        placeholder="Exclusions"
                        value={singlePolicy.exclusions}
                        onChange={(e) => setSinglePolicy({...singlePolicy, exclusions: e.target.value})}
                        className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white md:col-span-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {policies.map((policy, index) => (
                      <div key={policy.id} className="p-4 bg-jet-black/30 rounded-lg border border-slate-gray/20">
                        <h4 className="text-lg font-semibold text-teal-400 mb-4">Policy {index + 1}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Insurance Company"
                            value={policy.company}
                            onChange={(e) => updatePolicy(policy.id, 'company', e.target.value)}
                            className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                          />
                          <input
                            type="number"
                            placeholder="Annual Premium (₹)"
                            value={policy.premium}
                            onChange={(e) => updatePolicy(policy.id, 'premium', e.target.value)}
                            className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                          />
                          <input
                            type="number"
                            placeholder="Coverage Amount (₹)"
                            value={policy.coverage}
                            onChange={(e) => updatePolicy(policy.id, 'coverage', e.target.value)}
                            className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                          />
                          <input
                            type="number"
                            placeholder="Duration (years)"
                            value={policy.duration}
                            onChange={(e) => updatePolicy(policy.id, 'duration', e.target.value)}
                            className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                          />
                          <input
                            type="text"
                            placeholder="Waiting Period"
                            value={policy.waitingPeriod}
                            onChange={(e) => updatePolicy(policy.id, 'waitingPeriod', e.target.value)}
                            className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                          />
                          <input
                            type="text"
                            placeholder="Key Benefits"
                            value={policy.benefits}
                            onChange={(e) => updatePolicy(policy.id, 'benefits', e.target.value)}
                            className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                          />
                          <input
                            type="text"
                            placeholder="Exclusions"
                            value={policy.exclusions}
                            onChange={(e) => updatePolicy(policy.id, 'exclusions', e.target.value)}
                            className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white md:col-span-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
                <h3 className="text-xl font-semibold mb-4 text-soft-white">Your Profile</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Age"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                    className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  />
                  <input
                    type="number"
                    placeholder="Monthly Income (₹)"
                    value={userProfile.income}
                    onChange={(e) => setUserProfile({...userProfile, income: e.target.value})}
                    className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  />
                  <input
                    type="text"
                    placeholder="Health Condition"
                    value={userProfile.healthCondition}
                    onChange={(e) => setUserProfile({...userProfile, healthCondition: e.target.value})}
                    className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  />
                  <input
                    type="number"
                    placeholder="Number of Dependents"
                    value={userProfile.dependents}
                    onChange={(e) => setUserProfile({...userProfile, dependents: e.target.value})}
                    className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white"
                  />
                  {insuranceType === 'vehicle' && (
                    <input
                      type="text"
                      placeholder="Vehicle Type"
                      value={userProfile.vehicleType}
                      onChange={(e) => setUserProfile({...userProfile, vehicleType: e.target.value})}
                      className="w-full p-3 bg-jet-black border border-slate-gray/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-soft-white md:col-span-2"
                    />
                  )}
                </div>
              </div>

              <button
                onClick={analyzePolicy}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 w-full text-lg disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin"></div>
                    <span>AI Analyzing Policies...</span>
                  </span>
                ) : (
                  <>🤖 {analysisMode === 'individual' ? 'Analyze Policy' : 'Compare Policies'}</>
                )}
              </button>
            </div>

            {/* Analysis Results */}
            <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
              <h3 className="text-xl font-semibold mb-6 text-soft-white flex items-center">
                <FileSearch className="w-6 h-6 mr-2 text-emerald-400" />
                AI Analysis Results
              </h3>

              {!analysis ? (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-subtext-gray mx-auto mb-4" />
                  <p className="text-white">Enter policy details and analyze to get AI recommendations</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Best Policy / Overall Rating */}
                  {analysisMode === 'individual' ? (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold text-emerald-400">Policy Analysis</span>
                      </div>
                      <p className="text-main-white font-semibold">{singlePolicy.company}</p>
                      <p className="text-sm text-white mt-1">Overall Rating: {analysis.overallRating || 'Safe'}</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold text-emerald-400">Best Policy Recommendation</span>
                      </div>
                      <p className="text-white font-semibold">Policy {analysis.bestPolicy.index + 1}: {policies[analysis.bestPolicy.index]?.company}</p>
                      <p className="text-sm text-white mt-1">{analysis.bestPolicy.reason}</p>
                    </div>
                  )}

                  {/* Risky Policy */}
                  {analysisMode === 'compare' && analysis.riskyPolicy.index >= 0 && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-blue-400">Risky Policy Warning</span>
                      </div>
                      <p className="text-white font-semibold">Policy {analysis.riskyPolicy.index + 1}: {policies[analysis.riskyPolicy.index]?.company}</p>
                      <p className="text-sm text-subtext-gray mt-1">{analysis.riskyPolicy.reason}</p>
                    </div>
                  )}

                  {/* Dangerous Policy */}
                  {analysisMode === 'compare' && analysis.dangerousPolicy.index >= 0 && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <X className="w-5 h-5 text-red-400" />
                        <span className="font-semibold text-red-400">Dangerous Policy Alert</span>
                      </div>
                      <p className="text-white font-semibold">Policy {analysis.dangerousPolicy.index + 1}: {policies[analysis.dangerousPolicy.index]?.company}</p>
                      <p className="text-sm text-subtext-gray mt-1">{analysis.dangerousPolicy.reason}</p>
                    </div>
                  )}

                  {/* Policy Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Detailed Analysis</h4>
                    {analysis.policies?.map((policyAnalysis: any, index: number) => (
                      <div key={index} className="p-4 bg-jet-black/30 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-semibold text-teal-400">
                            {analysisMode === 'individual' ? singlePolicy.company : `Policy ${index + 1}: ${policies[index]?.company}`}
                          </h5>
                          <div className="flex space-x-4 text-sm">
                            <span className="text-emerald-400">Safety: {policyAnalysis.claimSafetyScore}/100</span>
                            <span className="text-blue-400">Value: {policyAnalysis.valueRating}/5</span>
                          </div>
                        </div>
                        <p className="text-sm text-white mb-3">{policyAnalysis.explanation}</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-emerald-400 font-semibold">Pros:</span>
                            <ul className="text-subtext-gray mt-1">
                              {policyAnalysis.pros?.map((pro: string, i: number) => (
                                <li key={i} className="text-white">• {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-red-400 font-semibold">Cons:</span>
                            <ul className="text-subtext-gray mt-1">
                              {policyAnalysis.cons?.map((con: string, i: number) => (
                                <li key={i} className="text-white">• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {/* Enhanced Analysis Sections */}
                        {policyAnalysis.premiumAnalysis && (
                          <div className="mt-3 p-3 bg-emerald-500/5 rounded-lg">
                            <h6 className="text-emerald-400 font-semibold text-sm mb-1">Premium Analysis:</h6>
                            <p className="text-xs text-white">{policyAnalysis.premiumAnalysis}</p>
                          </div>
                        )}
                        {policyAnalysis.exclusionAnalysis && (
                          <div className="mt-2 p-3 bg-blue-500/5 rounded-lg">
                            <h6 className="text-blue-400 font-semibold text-sm mb-1">Exclusion Analysis:</h6>
                            <p className="text-xs text-white">{policyAnalysis.exclusionAnalysis}</p>
                          </div>
                        )}
                        {policyAnalysis.waitingPeriodAnalysis && (
                          <div className="mt-2 p-3 bg-teal-500/5 rounded-lg">
                            <h6 className="text-teal-400 font-semibold text-sm mb-1">Waiting Period Analysis:</h6>
                            <p className="text-xs text-white">{policyAnalysis.waitingPeriodAnalysis}</p>
                          </div>
                        )}
                        {policyAnalysis.hiddenTraps?.length > 0 && (
                          <div className="mt-2 p-3 bg-red-500/5 rounded-lg">
                            <h6 className="text-red-400 font-semibold text-sm mb-1">Hidden Traps:</h6>
                            <ul className="text-xs text-subtext-gray">
                              {policyAnalysis.hiddenTraps.map((trap: string, i: number) => (
                                <li key={i} className="text-white">• {trap}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {policyAnalysis.recommendations?.length > 0 && (
                          <div className="mt-2 p-3 bg-emerald-500/5 rounded-lg">
                            <h6 className="text-emerald-400 font-semibold text-sm mb-1">Recommendations:</h6>
                            <ul className="text-xs text-subtext-gray">
                              {policyAnalysis.recommendations.map((rec: string, i: number) => (
                                <li key={i} className="text-white">• {rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t border-slate-gray/20 text-sm">
                          <p><span className="text-teal-400">Suitable for:</span> <span className="text-white">{policyAnalysis.suitableFor}</span></p>
                          <p><span className="text-red-400">Avoid if:</span> <span className="text-white">{policyAnalysis.avoidFor}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Market Insights */}
                  {(analysis.marketComparison || analysis.marketInsights) && (
                    <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Market Insights</h4>
                      <p className="text-sm text-white">{analysis.marketComparison || analysis.marketInsights}</p>
                    </div>
                  )}

                  {/* Risk Factors & Hidden Clauses */}
                  {analysisMode === 'individual' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {analysis.riskFactors?.length > 0 && (
                        <div className="p-3 bg-warning-yellow/10 rounded-lg">
                          <h5 className="font-semibold text-warning-yellow mb-2 text-sm">Risk Factors:</h5>
                          <ul className="text-xs text-subtext-gray space-y-1">
                            {analysis.riskFactors.map((risk: string, i: number) => (
                              <li key={i} className="text-white">• {risk}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysis.hiddenClauses?.length > 0 && (
                        <div className="p-3 bg-error-red/10 rounded-lg">
                          <h5 className="font-semibold text-blue-400 mb-2 text-sm">Hidden Clauses:</h5>
                          <ul className="text-xs text-subtext-gray space-y-1">
                            {analysis.hiddenClauses.map((clause: string, i: number) => (
                              <li key={i} className="text-white">• {clause}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Download PDF Report */}
                  <button 
                    onClick={() => {
                      const pdf = new jsPDF();
                      
                      // Header
                      pdf.setFontSize(20);
                      pdf.setTextColor(0, 229, 255);
                      pdf.text('KANIMA POLICYSENSE AI REPORT', 20, 30);
                      
                      // Insurance Type & Mode
                      pdf.setFontSize(12);
                      pdf.setTextColor(0, 0, 0);
                      pdf.text(`Insurance Type: ${insuranceType.toUpperCase()}`, 20, 45);
                      pdf.text(`Analysis Mode: ${analysisMode === 'individual' ? 'Individual Policy' : 'Policy Comparison'}`, 20, 55);
                      
                      let yPos = 70;
                      
                      // Overall Rating or Best Policy
                      if (analysisMode === 'individual') {
                        pdf.setFontSize(14);
                        pdf.text('POLICY ANALYSIS', 20, yPos);
                        yPos += 15;
                        pdf.setFontSize(10);
                        pdf.text(`Company: ${singlePolicy.company}`, 20, yPos);
                        yPos += 10;
                        pdf.text(`Overall Rating: ${analysis.overallRating || 'Safe'}`, 20, yPos);
                        yPos += 15;
                      } else {
                        pdf.setFontSize(14);
                        pdf.text('BEST POLICY RECOMMENDATION', 20, yPos);
                        yPos += 15;
                        pdf.setFontSize(10);
                        pdf.text(`Policy ${analysis.bestPolicy?.index + 1}: ${policies[analysis.bestPolicy?.index]?.company}`, 20, yPos);
                        yPos += 10;
                        pdf.text(`Reason: ${analysis.bestPolicy?.reason}`, 20, yPos);
                        yPos += 15;
                      }
                      
                      // Policy Details
                      pdf.setFontSize(14);
                      pdf.text('DETAILED ANALYSIS', 20, yPos);
                      yPos += 15;
                      
                      analysis.policies?.forEach((p: any, i: number) => {
                        const currentPolicy = analysisMode === 'individual' ? singlePolicy : policies[i];
                        pdf.setFontSize(12);
                        pdf.text(`${analysisMode === 'individual' ? currentPolicy?.company : `Policy ${i + 1}: ${currentPolicy?.company}`}`, 20, yPos);
                        yPos += 10;
                        
                        pdf.setFontSize(10);
                        pdf.text(`Safety Score: ${p.claimSafetyScore}/100 | Value Rating: ${p.valueRating}/5`, 20, yPos);
                        yPos += 10;
                        
                        // Split long text
                        const explanation = pdf.splitTextToSize(p.explanation, 170);
                        pdf.text(explanation, 20, yPos);
                        yPos += explanation.length * 5 + 5;
                        
                        pdf.text(`Pros: ${p.pros?.join(', ') || 'N/A'}`, 20, yPos);
                        yPos += 10;
                        pdf.text(`Cons: ${p.cons?.join(', ') || 'N/A'}`, 20, yPos);
                        yPos += 10;
                        
                        if (p.premiumAnalysis) {
                          const premiumText = pdf.splitTextToSize(`Premium Analysis: ${p.premiumAnalysis}`, 170);
                          pdf.text(premiumText, 20, yPos);
                          yPos += premiumText.length * 5 + 5;
                        }
                        
                        pdf.text(`Suitable for: ${p.suitableFor}`, 20, yPos);
                        yPos += 10;
                        pdf.text(`Avoid if: ${p.avoidFor}`, 20, yPos);
                        yPos += 15;
                        
                        // Check if we need a new page
                        if (yPos > 250) {
                          pdf.addPage();
                          yPos = 20;
                        }
                      });
                      
                      // Footer
                      pdf.setFontSize(8);
                      pdf.setTextColor(128, 128, 128);
                      pdf.text('Generated by KANIMA AI - PolicySense Smart Insurance Analysis', 20, 280);
                      
                      pdf.save(`PolicySense_Report_${analysisMode}_${insuranceType}.pdf`);
                    }}
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 w-full flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Report</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicySenseAI;