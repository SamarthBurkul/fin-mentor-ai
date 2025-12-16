import React, { useState, useEffect } from 'react';
import { 
  Calculator, BookOpen, Shield, TrendingUp, Brain, Users, Award, Target, 
  Zap, Star, CheckCircle, Globe, Heart, Lightbulb, MapPin, PiggyBank,
  CreditCard, FileText, Briefcase, BarChart3, Crown, Sparkles, Receipt, Store
} from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI Chat',
      description: 'Real-time financial advice and personalized recommendations.',
      action: () => setActiveSection('ai-chat'),
      gradient: 'from-purple-600 via-violet-600 to-purple-800',
      glow: 'purple-500',
      emoji: '🤖'
    },
    {
      icon: Calculator,
      title: 'Calculators',
      description: 'EMI, SIP, FD, RD, Interest, Savings Growth, Business Calculator with AI insights.',
      action: () => setActiveSection('calculators'),
      gradient: 'from-blue-600 via-indigo-600 to-blue-800',
      glow: 'blue-500',
      emoji: '🧮'
    },
    {
      icon: BookOpen,
      title: 'Learn (Financial Education)',
      description: 'Interactive lessons, Banking 101, quizzes, gamified learning, progress tracking.',
      action: () => setActiveSection('education'),
      gradient: 'from-green-600 via-emerald-600 to-green-800',
      glow: 'green-500',
      emoji: '📚'
    },

    {
      icon: MapPin,
      title: 'Find Banks',
      description: 'Locate nearest banks & ATMs, directions, emergency contacts.',
      action: () => setActiveSection('bank-locator'),
      gradient: 'from-teal-600 via-cyan-600 to-teal-800',
      glow: 'teal-500',
      emoji: '📍'
    },
    {
      icon: FileText,
      title: 'Government Benefits',
      description: 'AI-powered scheme analyzer, eligibility checker, PDF reports.',
      action: () => setActiveSection('government-benefits'),
      gradient: 'from-pink-600 via-rose-600 to-pink-800',
      glow: 'pink-500',
      emoji: '🏛️'
    },
    {
      icon: PiggyBank,
      title: 'Smart Savings',
      description: 'Track daily savings, attach goals, AI habit recommendations.',
      action: () => setActiveSection('smart-savings'),
      gradient: 'from-yellow-600 via-amber-500 to-yellow-800',
      glow: 'yellow-500',
      emoji: '🐷'
    },

    {
      icon: TrendingUp,
      title: 'Investment Comparator',
      description: 'Compare Gold, FD, Mutual Funds, risk-based AI advice, charts.',
      action: () => setActiveSection('investment-comparator'),
      gradient: 'from-indigo-600 via-purple-600 to-indigo-800',
      glow: 'indigo-500',
      emoji: '📈'
    },
    {
      icon: BarChart3,
      title: 'StockMentor AI',
      description: 'Educational stock insights, risk assessment, company fundamentals.',
      action: () => setActiveSection('stock-mentor'),
      gradient: 'from-sky-600 via-blue-500 to-sky-800',
      glow: 'sky-500',
      emoji: '📊'
    },
    {
      icon: Briefcase,
      title: 'Career Income AI',
      description: 'Salary projections, skill value, career growth, side income ideas.',
      action: () => setActiveSection('career-income'),
      gradient: 'from-lime-600 via-green-500 to-lime-800',
      glow: 'lime-500',
      emoji: '💼'
    },
    {
      icon: Target,
      title: 'SmartBudget AI',
      description: 'Budget analysis, expense tracking, income vs expense breakdown, financial health scoring.',
      action: () => setActiveSection('smart-budget'),
      gradient: 'from-blue-800 via-indigo-700 to-blue-900',
      glow: 'blue-600',
      emoji: '🎯'
    },

    {
      icon: Shield,
      title: 'CyberShield',
      description: 'Fraud detection, scam analysis, emergency guides, scam education.',
      action: () => setActiveSection('cyber-shield'),
      gradient: 'from-red-800 via-rose-700 to-red-900',
      glow: 'red-600',
      emoji: '🛡️'
    },
    {
      icon: CreditCard,
      title: 'Credit Doctor',
      description: 'Credit score prediction, improvement plan, loan approval analysis.',
      action: () => setActiveSection('credit-doctor'),
      gradient: 'from-violet-600 via-purple-600 to-violet-800',
      glow: 'violet-500',
      emoji: '💳'
    },
    {
      icon: CheckCircle,
      title: 'LoanGuard',
      description: 'Loan trap detector, interest evaluation, hidden charges alerts.',
      action: () => setActiveSection('loan-guard'),
      gradient: 'from-amber-700 via-orange-600 to-amber-800',
      glow: 'amber-600',
      emoji: '🔒'
    },
    {
      icon: Heart,
      title: 'PolicySense AI',
      description: 'Insurance policy comparison, hidden clause detection, claim safety.',
      action: () => setActiveSection('policy-sense'),
      gradient: 'from-emerald-600 via-teal-600 to-emerald-800',
      glow: 'emerald-500',
      emoji: '❤️'
    },
    {
      icon: Sparkles,
      title: 'Personalized AI Insights',
      description: 'Groq LLM-powered tailored recommendations across all tools.',
      action: () => setActiveSection('ai-chat'),
      gradient: 'from-purple-500 via-violet-500 to-purple-700',
      glow: 'purple-400',
      emoji: '✨'
    },
    {
      icon: Star,
      title: 'Coming Soon',
      description: 'More exciting financial tools and AI features are on the way!',
      action: () => {},
      gradient: 'from-gray-600 via-gray-700 to-gray-800',
      glow: 'gray-500',
      emoji: '🚀'
    }
  ];

  const aiAdvantages = [
    {
      icon: Zap,
      title: 'Groq LLM Integration',
      description: 'Fast, accurate AI responses',
      color: 'emerald'
    },
    {
      icon: Target,
      title: 'Personalized Analysis',
      description: 'Tailored recommendations based on user data',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Fraud Protection',
      description: 'Advanced scam detection and prevention',
      color: 'purple'
    }
  ];

  const targetAudience = [
    { title: 'Students', icon: '🎓' },
    { title: 'First-time Bank Users', icon: '🏦' },
    { title: 'Rural & Semi-urban', icon: '🌾' },
    { title: 'Young Professionals', icon: '💼' },
    { title: 'Small Business Owners', icon: '🏪' }
  ];

  const valueProps = [
    { icon: Brain, title: 'AI-Powered', desc: 'Advanced machine learning for personalized advice' },
    { icon: BookOpen, title: 'Educational First', desc: 'Focus on learning rather than selling products' },
    { icon: Shield, title: 'Fraud Protection', desc: 'Comprehensive security and awareness features' },
    { icon: Award, title: 'Gamified Learning', desc: 'Makes finance education engaging and fun' },
    { icon: Globe, title: 'Comprehensive', desc: 'All-in-one platform for financial needs' },
    { icon: Heart, title: 'Accessible', desc: 'Simple language and user-friendly interface' }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Royal Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/30 via-violet-900/30 to-indigo-900/30"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        {/* Royal Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #D4AF37 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #D4AF37 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      {/* Royal Hero Section */}
      <section className="relative z-10 pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <div>
              <div className="border-4 border-gold rounded-3xl p-8 bg-gradient-to-br from-gold/10 to-yellow-500/10 shadow-2xl shadow-gold/30">
                <div className="flex items-center justify-center mb-6">
                  <img src="/kanima.jpg" alt="KANIMA" className="h-48 md:h-64 object-contain rounded-2xl border-4 border-purple-500 shadow-lg shadow-purple-500/50" />
                </div>
                <p className="text-2xl md:text-3xl text-gold mb-6 font-inter font-bold text-center">
                  Knowledge-based AI-powered National Inclusive Money Assistant
                </p>
                <p className="text-lg text-yellow-100 mb-8 font-inter max-w-4xl mx-auto leading-relaxed text-center">
                  Empowering every Indian with smart financial decisions through AI-driven insights, personalized guidance, and comprehensive financial literacy tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Royal Features Grid */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent mb-6">
              AI Financial Suite
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter">
              Discover our premium collection of AI-powered financial tools, each crafted with precision
            </p>
          </div>
          
          {/* Simple Animated Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-xl`}
                  onClick={feature.action}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 text-center group-hover:text-yellow-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 text-sm text-center">
                    {feature.description}
                  </p>
                  
                  <div className="mt-4 text-center">
                    <span className="text-yellow-200 text-sm font-semibold">
                      Explore →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Royal CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 rounded-3xl p-12 border border-gold/30 max-w-5xl mx-auto relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-purple-500/5 to-gold/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-gold mr-4 animate-spin" />
                <h2 className="text-4xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
                  Begin Your AI Journey
                </h2>
                <Sparkles className="w-12 h-12 text-gold ml-4 animate-spin" />
              </div>
              <p className="text-xl text-gray-200 mb-10 font-inter max-w-3xl mx-auto">
                Join the elite circle of financially empowered individuals with KANIMA's premium AI-powered financial suite
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setActiveSection('education')}
                  className="bg-gradient-to-r from-gold via-yellow-500 to-gold text-black px-10 py-5 rounded-xl font-bold hover:scale-105 transition-all duration-300 text-lg shadow-2xl hover:shadow-gold/25 border border-gold/50"
                >
                  🤖 Start AI Learning
                </button>
                <button 
                  onClick={() => setActiveSection('calculators')}
                  className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold hover:scale-105 transition-all duration-300 text-lg shadow-2xl hover:shadow-purple-500/25 border border-purple-400/50"
                >
                  💎 Premium Calculators
                </button>
                <button 
                  onClick={() => setActiveSection('ai-chat')}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white px-10 py-5 rounded-xl font-bold hover:scale-105 transition-all duration-300 text-lg shadow-2xl hover:shadow-blue-500/25 border border-blue-400/50"
                >
                  🤖 AI Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;