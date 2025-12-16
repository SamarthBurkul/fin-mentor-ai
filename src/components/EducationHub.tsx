import React, { useState } from 'react';
import { BookOpen, Trophy, Star, CheckCircle, Play, Award } from 'lucide-react';
import { quizQuestions, learningModules } from '../data/quizData';
import { QuizQuestion, UserProgress } from '../types';

const EducationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userProgress] = useState<UserProgress>({
    name: 'Finance Learner',
    score: 850,
    badges: ['Banking Basics', 'Savings Champion'],
    completedModules: ['banking-basics', 'savings-budgeting']
  });

  const startQuiz = () => {
    setCurrentQuiz(quizQuestions[0]);
    setQuizIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === currentQuiz?.correctAnswer) {
      setScore(score + 100);
    }
    
    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
        setCurrentQuiz(quizQuestions[quizIndex + 1]);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        setCurrentQuiz(null);
      }
    }, 1500);
  };

  const renderQuiz = () => {
    if (showResult) {
      const percentage = (score / (quizQuestions.length * 100)) * 100;
      return (
        <div className="fintech-card text-center border border-teal-green/30">
          <Trophy className="w-16 h-16 text-teal-green mx-auto mb-4 glow-pulse" />
          <h3 className="text-2xl font-bold mb-4 font-poppins text-main-white">Quiz Mastered!</h3>
          <div className="text-4xl font-bold text-teal-green mb-2 number-display">{score} Points</div>
          <div className="text-lg text-subtext-gray mb-6 font-roboto">{percentage}% Accuracy</div>
          
          {percentage >= 80 && (
            <div className="bg-gold/10 p-4 rounded-lg mb-6">
              <Award className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="font-semibold text-deep-purple">🎉 Congratulations!</p>
              <p className="text-sm text-gray-600">You've earned the "Finance Expert" badge!</p>
            </div>
          )}
          
          <button onClick={startQuiz} className="fintech-button">
            🎯 Challenge Again
          </button>
        </div>
      );
    }

    if (!currentQuiz) {
      return (
        <div className="premium-card text-center">
          <BookOpen className="w-16 h-16 text-gold mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Financial Knowledge Quiz</h3>
          <p className="text-gray-600 mb-6">
            Test your financial knowledge and earn points on the leaderboard!
          </p>
          <button onClick={startQuiz} className="luxury-button">
            Start Quiz
          </button>
        </div>
      );
    }

    return (
      <div className="premium-card">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">
            Question {quizIndex + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-semibold text-gold">Score: {score}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-6">{currentQuiz.question}</h3>
        
        <div className="space-y-3 mb-6">
          {currentQuiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                selectedAnswer === index
                  ? selectedAnswer === currentQuiz.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gold hover:bg-gold/5'
              }`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
        
        {selectedAnswer !== null && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-blue-800 mb-2">Explanation:</p>
            <p className="text-blue-700">{currentQuiz.explanation}</p>
          </div>
        )}
        
        <button
          onClick={submitAnswer}
          disabled={selectedAnswer === null}
          className="luxury-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {quizIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    );
  };

  return (
    <section className="py-16 bg-deep-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-teal-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-neon-blue rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-poppins font-bold text-main-white mb-4">
            AI-Powered <span className="bg-gradient-to-r from-teal-green to-neon-blue bg-clip-text text-transparent">Learning Hub</span>
          </h2>
          <p className="text-lg text-subtext-gray max-w-2xl mx-auto font-roboto">
            Master finance with personalized AI guidance, interactive modules, and gamified learning experiences.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="glass-effect rounded-lg p-1 shadow-neon">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 font-roboto ${
                activeTab === 'modules'
                  ? 'bg-gradient-to-r from-neon-blue to-teal-green text-deep-black'
                  : 'text-main-white hover:text-neon-blue'
              }`}
            >
              Learning Modules
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 font-roboto ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-neon-blue to-teal-green text-deep-black'
                  : 'text-main-white hover:text-neon-blue'
              }`}
            >
              AI Quiz Challenge
            </button>
          </div>
        </div>

        {activeTab === 'modules' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {learningModules.map((module) => (
              <div key={module.id} className="fintech-card hover:scale-105 transition-transform duration-300 neon-glow">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8 text-neon-blue" />
                  {userProgress.completedModules.includes(module.id) && (
                    <CheckCircle className="w-6 h-6 text-success-green" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 font-poppins text-main-white">{module.title}</h3>
                <p className="text-subtext-gray mb-4 font-roboto">{module.description}</p>
                
                <div className="space-y-2 mb-6">
                  {module.lessons.map((lesson, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Play className="w-4 h-4 text-teal-green" />
                      <span className="text-main-white font-roboto">{lesson}</span>
                    </div>
                  ))}
                </div>
                
                <button className="fintech-button w-full">
                  {userProgress.completedModules.includes(module.id) ? '🔄 Review Module' : '🚀 Start Learning'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            {renderQuiz()}
          </div>
        )}

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="premium-card bg-gradient-to-r from-gold/10 to-rose-gold/10">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2 text-gold" />
              Your Progress
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">{userProgress.score}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{userProgress.completedModules.length}</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{userProgress.badges.length}</div>
                <div className="text-sm text-gray-600">Badges Earned</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Your Badges:</h4>
              <div className="flex flex-wrap gap-2">
                {userProgress.badges.map((badge, index) => (
                  <span key={index} className="bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                    🏅 {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationHub;