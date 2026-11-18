export type PageView = 'intro' | 'wheel' | 'results';

export type ThemeMode = 'dark' | 'light';

export interface Question {
  id: number;
  category: string;
  title: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  hint: string;
  explanation: string;
}

export interface TopicPack {
  id: string;
  topicNumber: number;
  title: string;
  subtitle: string;
  description: string;
  questions: Question[];
}

export interface AnswerRecord {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
  usedHint: boolean;
  pointsEarned: number;
  elapsedSeconds: number;
}

export interface QuizSummary {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  accuracyPercent: number;
  totalPoints: number;
  hintsUsedCount: number;
  averageSeconds: number;
  rankTitle: string;
}
