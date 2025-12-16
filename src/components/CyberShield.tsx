import React, { useState } from 'react';
import { Shield, AlertTriangle, Phone, CreditCard, Smartphone, Mail, FileText, Eye, Brain, Heart, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const CyberShield: React.FC = () => {
  const [activeMode, setActiveMode] = useState('detector');
  const [fraudInput, setFraudInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fraudResult, setFraudResult] = useState<any>(null);
  const [selectedFraudType, setSelectedFraudType] = useState('');

  const emergencyActions = [
    { icon: Phone, label: 'Cyber Crime Emergency', action: 'Call 1930', color: 'bg-red-500' },
    { icon: Phone, label: 'Bank Customer Care', action: 'Direct Connect', color: 'bg-blue-500' },
    { icon: CreditCard, label: 'UPI Block', action: 'Instant Block', color: 'bg-orange-500' },
    { icon: CreditCard, label: 'Card Block', action: 'Emergency Block', color: 'bg-purple-500' },
    { icon: Smartphone, label: 'SIM Block Guide', action: 'Step Guide', color: 'bg-green-500' },
    { icon: Mail, label: 'Account Recovery', action: 'Recovery Help', color: 'bg-teal-500' }
  ];

  const fraudTypes = [
    {
      type: 'OTP Scams',
      description: 'Fake messages asking for OTP verification',
      example: '"Your account will be blocked. Share OTP 123456 to verify"',
      howItStarts: 'Urgent SMS about account issues',
      emotionalTrick: 'Creates fear of account closure',
      moneyStolen: 'Bank account emptied via OTP',
      protection: 'Never share OTP with anyone'
    },
    {
      type: 'Fake Bank Calls',
      description: 'Scammers impersonating bank officials',
      example: '"Sir, your card is used in Mumbai. Please confirm CVV"',
      howItStarts: 'Professional sounding call',
      emotionalTrick: 'Authority pressure + urgency',
      moneyStolen: 'Card details stolen for transactions',
      protection: 'Banks never ask for card details on call'
    },
    {
      type: 'Loan App Scams',
      description: 'Fake instant loan apps with hidden traps',
      example: '"Get ₹50,000 loan in 5 minutes. Just install our app"',
      howItStarts: 'Social media ads for easy loans',
      emotionalTrick: 'Exploits financial desperation',
      moneyStolen: 'High interest + personal data theft',
      protection: 'Use only RBI registered lenders'
    },
    {
      type: 'Investment Scams',
      description: 'Fake investment schemes promising high returns',
      example: '"Double your money in 30 days. Guaranteed returns"',
      howItStarts: 'WhatsApp groups or social media',
      emotionalTrick: 'Greed for quick money',
      moneyStolen: 'Investment amount stolen completely',
      protection: 'No investment guarantees quick high returns'
    }
  ];

  const analyzeFraud = async () => {
    if (!fraudInput.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const prompt = `Analyze this message/situation for fraud risk:

MESSAGE: "${fraudInput}"

Provide analysis in JSON format:
{
  "riskLevel": "Safe/Suspicious/High Risk/Dangerous Scam",
  "scamType": "Type of scam detected",
  "riskScore": 85,
  "emotionalTricks": ["Urgency pressure", "Fear tactics"],
  "warningMessage": "Clear warning in simple language",
  "whatCouldHappen": "What happens if user continues",
  "immediateActions": ["Action 1", "Action 2"],
  "psychologicalAnalysis": "How this message manipulates emotions"
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
        const result = JSON.parse(content);
        setFraudResult(result);
      } catch {
        setFraudResult({
          riskLevel: "Suspicious",
          scamType: "Potential fraud detected",
          riskScore: 70,
          emotionalTricks: ["Urgency tactics", "Pressure techniques"],
          warningMessage: "Be cautious with this message. Verify before taking any action.",
          whatCouldHappen: "Potential financial loss or data theft",
          immediateActions: ["Do not respond immediately", "Verify through official channels"],
          psychologicalAnalysis: "This message uses common manipulation techniques"
        });
      }
    } catch (error) {
      setFraudResult({
        riskLevel: "Analysis Error",
        scamType: "Unable to analyze",
        riskScore: 50,
        emotionalTricks: ["Unknown"],
        warningMessage: "Unable to analyze. Please be cautious and verify independently.",
        whatCouldHappen: "Unknown risk level",
        immediateActions: ["Verify independently", "Seek expert advice"],
        psychologicalAnalysis: "Analysis unavailable"
      });
    }
    
    setIsAnalyzing(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Safe': return 'text-green-500 bg-green-100';
      case 'Suspicious': return 'text-yellow-500 bg-yellow-100';
      case 'High Risk': return 'text-orange-500 bg-orange-100';
      case 'Dangerous Scam': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Safe': return CheckCircle;
      case 'Suspicious': return AlertCircle;
      case 'High Risk': return AlertTriangle;
      case 'Dangerous Scam': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <section className="py-16 bg-jet-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-soft-white mb-4">
            Cyber<span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">Shield</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto font-inter">
            24/7 Digital Financial Security Guard - Protecting you from scams, fraud, and cyber threats
          </p>
        </div>

        {/* Emergency Panel */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-8 border border-red-500/20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">🚨 EMERGENCY ACTIONS</h3>
            <p className="text-red-100">If you're being scammed RIGHT NOW, click any button below</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {emergencyActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`${action.color} text-white p-4 rounded-xl hover:scale-105 transition-all duration-300 text-center`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">{action.label}</div>
                  <div className="text-xs opacity-90">{action.action}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: 'detector', label: 'AI Fraud Detector', icon: Brain },
            { id: 'types', label: 'Common Frauds', icon: Eye },
            { id: 'recovery', label: 'Recovery Guide', icon: Heart },
            { id: 'psychology', label: 'Scam Psychology', icon: TrendingUp }
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeMode === mode.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-charcoal-gray text-white hover:bg-jet-black'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* AI Fraud Detector */}
        {activeMode === 'detector' && (
          <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
            <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">
              🤖 Smart AI Scam Detector
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <label className="block text-soft-white font-medium mb-3">
                  Paste suspicious message, call description, or payment request:
                </label>
                <textarea
                  value={fraudInput}
                  onChange={(e) => setFraudInput(e.target.value)}
                  placeholder="Example: 'Your account will be blocked in 2 hours. Click this link to verify: bit.ly/verify123'"
                  className="w-full h-32 bg-charcoal-gray border border-slate-gray/30 rounded-xl px-4 py-3 text-soft-white placeholder-slate-gray focus:border-gold focus:outline-none resize-none"
                />
              </div>
              
              <div className="text-center mb-8">
                <button
                  onClick={analyzeFraud}
                  disabled={isAnalyzing || !fraudInput.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? '🔍 Analyzing...' : '🛡️ Check for Fraud'}
                </button>
              </div>

              {/* Fraud Analysis Result */}
              {fraudResult && (
                <div className="bg-charcoal-gray rounded-xl p-6 border border-slate-gray/20">
                  <div className="flex items-center justify-center mb-6">
                    {(() => {
                      const RiskIcon = getRiskIcon(fraudResult.riskLevel);
                      return (
                        <div className={`flex items-center space-x-3 px-6 py-3 rounded-full ${getRiskColor(fraudResult.riskLevel)}`}>
                          <RiskIcon className="w-6 h-6" />
                          <span className="font-bold text-lg">{fraudResult.riskLevel}</span>
                          <span className="font-medium">({fraudResult.riskScore}/100)</span>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-soft-white mb-2">⚠️ Warning Message</h4>
                        <p className="text-white bg-jet-black p-3 rounded-lg">{fraudResult.warningMessage}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-soft-white mb-2">🎭 Emotional Tricks Used</h4>
                        <ul className="text-white space-y-1">
                          {fraudResult.emotionalTricks?.map((trick: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              <span className="text-white">{trick}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-soft-white mb-2">💀 What Could Happen</h4>
                        <p className="text-white bg-jet-black p-3 rounded-lg">{fraudResult.whatCouldHappen}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-soft-white mb-2">🛡️ Immediate Actions</h4>
                        <ul className="text-white space-y-1">
                          {fraudResult.immediateActions?.map((action: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-white">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-jet-black rounded-lg">
                    <h4 className="font-semibold text-soft-white mb-2">🧠 Psychological Analysis</h4>
                    <p className="text-white">{fraudResult.psychologicalAnalysis}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Common Fraud Types */}
        {activeMode === 'types' && (
          <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
            <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">
              🎭 Common Fraud Types & Protection
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {fraudTypes.map((fraud, index) => (
                <div key={index} className="bg-jet-black rounded-xl p-6 border border-slate-gray/20 hover:border-gold/50 transition-all duration-300">
                  <h4 className="text-xl font-bold text-soft-white mb-3">{fraud.type}</h4>
                  <p className="text-white mb-4">{fraud.description}</p>
                  
                  <div className="space-y-3">
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/20">
                      <strong className="text-red-400">Example:</strong>
                      <p className="text-red-300 italic mt-1">{fraud.example}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <strong className="text-soft-white">How it starts:</strong>
                        <p className="text-white">{fraud.howItStarts}</p>
                      </div>
                      <div>
                        <strong className="text-soft-white">Emotional trick:</strong>
                        <p className="text-white">{fraud.emotionalTrick}</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/20">
                      <strong className="text-green-400">Protection:</strong>
                      <p className="text-green-300 mt-1">{fraud.protection}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recovery Guide */}
        {activeMode === 'recovery' && (
          <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
            <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">
              💔 Post-Fraud Recovery Guide
            </h3>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/20">
                <h4 className="text-xl font-bold text-red-400 mb-4">🚨 First 5 Minutes (URGENT)</h4>
                <ul className="space-y-2 text-red-300">
                  <li>• Call your bank immediately to block cards/accounts</li>
                  <li>• Change all online banking passwords</li>
                  <li>• Take screenshots of fraud messages/calls</li>
                  <li>• Do NOT panic - money can often be recovered</li>
                </ul>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-xl border border-orange-500/20">
                <h4 className="text-xl font-bold text-orange-400 mb-4">⏰ Next 30 Minutes</h4>
                <ul className="space-y-2 text-orange-300">
                  <li>• File complaint at cybercrime.gov.in</li>
                  <li>• Call National Cyber Crime Helpline: 1930</li>
                  <li>• Inform local police station</li>
                  <li>• Collect all transaction details</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/20">
                <h4 className="text-xl font-bold text-blue-400 mb-4">📋 Next 24 Hours</h4>
                <ul className="space-y-2 text-blue-300">
                  <li>• File detailed FIR with evidence</li>
                  <li>• Submit bank fraud complaint</li>
                  <li>• Contact credit bureaus if identity stolen</li>
                  <li>• Document everything for insurance claims</li>
                </ul>
              </div>

              <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/20">
                <h4 className="text-xl font-bold text-green-400 mb-4">🌱 Recovery & Prevention</h4>
                <ul className="space-y-2 text-green-300">
                  <li>• Follow up on complaints regularly</li>
                  <li>• Enable 2FA on all accounts</li>
                  <li>• Educate family about fraud types</li>
                  <li>• Join support groups for emotional healing</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Scam Psychology */}
        {activeMode === 'psychology' && (
          <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
            <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">
              🧠 Understanding Scam Psychology
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-white text-center mb-8">
                Scammers are psychological experts. Understanding their tricks makes you immune to their attacks.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/20">
                    <h4 className="text-xl font-bold text-red-400 mb-3">⚡ Urgency Pressure</h4>
                    <p className="text-red-300 mb-3">"Act now or lose everything!"</p>
                    <p className="text-white text-sm">Creates panic to bypass logical thinking. Real emergencies don't come via unknown calls/messages.</p>
                  </div>

                  <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/20">
                    <h4 className="text-xl font-bold text-purple-400 mb-3">👑 Fake Authority</h4>
                    <p className="text-purple-300 mb-3">"I'm calling from RBI/Police"</p>
                    <p className="text-white text-sm">Uses respect for authority. Real officials follow proper procedures, not phone demands.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-500/20">
                    <h4 className="text-xl font-bold text-yellow-400 mb-3">💰 Greed Exploitation</h4>
                    <p className="text-yellow-300 mb-3">"Double your money guaranteed!"</p>
                    <p className="text-white text-sm">Exploits desire for easy money. No legitimate investment guarantees high returns.</p>
                  </div>

                  <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/20">
                    <h4 className="text-xl font-bold text-blue-400 mb-3">😨 Fear Tactics</h4>
                    <p className="text-blue-300 mb-3">"Your account will be closed!"</p>
                    <p className="text-white text-sm">Creates fear to force quick decisions. Banks don't threaten customers via calls.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-green-900/20 p-6 rounded-xl border border-green-500/20">
                <h4 className="text-xl font-bold text-green-400 mb-4">🛡️ Psychological Defense System</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⏸️</span>
                    </div>
                    <h5 className="font-bold text-soft-white mb-2">PAUSE</h5>
                    <p className="text-white text-sm">Take 5 minutes before any financial decision</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🤔</span>
                    </div>
                    <h5 className="font-bold text-soft-white mb-2">THINK</h5>
                    <p className="text-white text-sm">Ask: Why is this urgent? Who benefits?</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h5 className="font-bold text-soft-white mb-2">VERIFY</h5>
                    <p className="text-white text-sm">Check independently through official channels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Safety Tip */}
        <div className="mt-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-3">💡 Today's Safety Tip</h3>
          <p className="text-teal-100 text-lg">
            "Never share OTP, CVV, or PIN with anyone - not even your family. These are YOUR secret keys to YOUR money."
          </p>
        </div>
      </div>
    </section>
  );
};

export default CyberShield;