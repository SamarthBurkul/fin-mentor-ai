const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.1-8b-instant';

export const generateLessonContent = async (lessonTitle: string, keyPoints: string[]): Promise<string> => {
  try {
    const prompt = `Write educational content for "${lessonTitle}". Cover these key points: ${keyPoints.join(', ')}. Write in simple, easy language for beginners. No formatting symbols. 200 words maximum.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Content temporarily unavailable.';
  } catch (error) {
    return 'Content temporarily unavailable. Please try again.';
  }
};

export const generateQuizQuestions = async (lessonTitle: string, keyPoints: string[], isUnitTest: boolean = false): Promise<any[]> => {
  try {
    const questionCount = isUnitTest ? 10 : 5;
    const prompt = `Generate ${questionCount} multiple choice questions about "${lessonTitle}" covering: ${keyPoints.join(', ')}. Each question should have 4 options (A, B, C, D) with one correct answer. Format as JSON array with structure: [{"question": "text", "options": ["A", "B", "C", "D"], "correct": 0}]. No formatting symbols.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    try {
      return JSON.parse(content);
    } catch {
      // Fallback questions if JSON parsing fails
      return Array.from({length: questionCount}, (_, i) => ({
        question: `Question ${i + 1} about ${lessonTitle}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 0
      }));
    }
  } catch (error) {
    // Fallback questions
    const questionCount = isUnitTest ? 10 : 5;
    return Array.from({length: questionCount}, (_, i) => ({
      question: `Question ${i + 1} about ${lessonTitle}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 0
    }));
  }
};