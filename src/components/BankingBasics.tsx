import React, { useState } from 'react';
import { Book, Users, Shield, CreditCard, PiggyBank, TrendingUp, AlertTriangle, HelpCircle } from 'lucide-react';

const BankingBasics: React.FC = () => {
  const [activeSection, setActiveSection] = useState('what-is-bank');

  const sections = [
    {
      id: 'what-is-bank',
      title: 'What is a Bank?',
      icon: Book,
      content: {
        simple: "A bank is like a safe place where you can keep your money. It's like a big strong box that protects your money and helps it grow.",
        detailed: [
          "Banks are financial institutions that accept deposits and provide loans",
          "They keep your money safe and pay you interest",
          "Banks help you send money to others and receive money",
          "They provide services like ATM cards, online banking, and loans"
        ]
      }
    },
    {
      id: 'savings-account',
      title: 'Savings Account',
      icon: PiggyBank,
      content: {
        simple: "A savings account is your personal money box in the bank. You put money in, and the bank gives you a little extra money (interest) for keeping it there.",
        detailed: [
          "Minimum balance: Usually ₹1,000 to ₹10,000",
          "Interest rate: 3-4% per year on your money",
          "ATM card: Get a card to withdraw money anytime",
          "No limit on deposits, but withdrawal limits apply",
          "Perfect for emergency funds and daily expenses"
        ]
      }
    },
    {
      id: 'what-is-loan',
      title: 'What is a Loan?',
      icon: CreditCard,
      content: {
        simple: "A loan is when the bank gives you money that you promise to return later with a little extra (interest). It's like borrowing money from a friend, but you pay back more than you borrowed.",
        detailed: [
          "Personal Loan: For any personal need, higher interest (10-15%)",
          "Home Loan: To buy a house, lower interest (7-9%)",
          "Car Loan: To buy a vehicle, moderate interest (8-12%)",
          "Education Loan: For studies, special rates (7-10%)",
          "Always compare interest rates before taking a loan"
        ]
      }
    },
    {
      id: 'what-is-interest',
      title: 'What is Interest?',
      icon: TrendingUp,
      content: {
        simple: "Interest is extra money. When you save money in bank, they give you extra money (you earn). When you borrow money from bank, you pay extra money (you pay).",
        detailed: [
          "Simple Interest: Calculated only on the main amount",
          "Compound Interest: Interest on interest - grows faster",
          "Example: ₹1,000 at 10% for 1 year = ₹100 interest",
          "Banks pay you interest on savings (you earn)",
          "You pay interest on loans (you pay extra)"
        ]
      }
    },
    {
      id: 'what-is-emi',
      title: 'What is EMI?',
      icon: CreditCard,
      content: {
        simple: "EMI means you pay the same amount every month for your loan. Instead of paying all money at once, you pay small amounts monthly until the loan is finished.",
        detailed: [
          "EMI = Equated Monthly Installment",
          "Same amount every month makes budgeting easy",
          "EMI includes both principal and interest",
          "Lower EMI = longer time to pay, more total interest",
          "Higher EMI = shorter time to pay, less total interest",
          "Use EMI calculator to plan before taking loan"
        ]
      }
    },
    {
      id: 'what-is-insurance',
      title: 'What is Insurance?',
      icon: Shield,
      content: {
        simple: "Insurance is protection for your family. You pay a small amount every year, and if something bad happens, the insurance company gives you a lot of money to help.",
        detailed: [
          "Life Insurance: Protects your family if something happens to you",
          "Health Insurance: Pays for hospital bills when you're sick",
          "Vehicle Insurance: Covers car/bike accidents and damages",
          "Home Insurance: Protects your house from fire, theft, etc.",
          "Premium: Small amount you pay regularly",
          "Claim: Money you get when you need help"
        ]
      }
    }
  ];

  const tips = [
    {
      icon: Shield,
      title: "Safety First",
      tip: "Never share your ATM PIN, OTP, or bank passwords with anyone. Banks never ask for these on phone calls."
    },
    {
      icon: PiggyBank,
      title: "Start Small",
      tip: "Begin with a basic savings account. You can always upgrade to premium accounts later as your needs grow."
    },
    {
      icon: AlertTriangle,
      title: "Read Before Signing",
      tip: "Always read loan documents carefully. Ask questions if you don't understand anything."
    },
    {
      icon: TrendingUp,
      title: "Compare Options",
      tip: "Different banks offer different interest rates. Compare before choosing where to save or borrow."
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <section className="py-16 bg-jet-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-soft-white mb-4">
            Banking <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">Basics</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto font-inter">
            Simple explanations of banking concepts in easy language. Perfect for first-time bank users, students, and anyone new to banking.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-charcoal-gray rounded-2xl p-6 border border-slate-gray/20 sticky top-24">
                <h3 className="font-semibold mb-4 flex items-center text-soft-white font-inter">
                  <Book className="w-5 h-5 mr-2 text-emerald-400" />
                  Topics
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                            : 'hover:bg-emerald-500/10 text-soft-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium font-inter">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {currentSection && (
                <div className="bg-charcoal-gray rounded-2xl p-8 border border-slate-gray/20">
                  <div className="flex items-center mb-6">
                    <currentSection.icon className="w-8 h-8 text-emerald-400 mr-3" />
                    <h3 className="text-2xl font-semibold text-soft-white font-inter">{currentSection.title}</h3>
                  </div>

                  {/* Simple Explanation */}
                  <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 rounded-lg mb-6 border border-emerald-500/20">
                    <h4 className="font-semibold text-emerald-400 mb-3 flex items-center font-inter">
                      <Users className="w-5 h-5 mr-2" />
                      Simple Explanation
                    </h4>
                    <p className="text-soft-white text-lg leading-relaxed font-inter">
                      {currentSection.content.simple}
                    </p>
                  </div>

                  {/* Detailed Information */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-4 flex items-center font-inter">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Key Points to Remember
                    </h4>
                    <ul className="space-y-3">
                      {currentSection.content.detailed.map((point, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-soft-white font-inter">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tips Section */}
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-soft-white font-inter">💡 Important Tips for New Users</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {tips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className="bg-charcoal-gray rounded-2xl p-6 border border-slate-gray/20">
                        <div className="flex items-start space-x-3">
                          <Icon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-soft-white mb-2 font-inter">{tip.title}</h4>
                            <p className="text-sm text-slate-gray font-inter">{tip.tip}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20 text-center">
                <h3 className="text-xl font-semibold mb-4 text-soft-white font-inter">Ready to Start Your Banking Journey?</h3>
                <p className="mb-6 text-slate-gray font-inter">Use our calculators to plan your finances or take a quiz to test your knowledge!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                    Try Calculators
                  </button>
                  <button className="border-2 border-emerald-400 text-emerald-400 px-6 py-3 rounded-xl font-medium hover:bg-emerald-400 hover:text-jet-black transition-all duration-300">
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankingBasics;