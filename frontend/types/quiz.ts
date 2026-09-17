export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  booleanAnswer: boolean | null;
  textAnswer: string | null;
  options: Option[];
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

export interface QuizSummary {
  id: number;
  title: string;
  questionCount: number;
}

export type NewQuestion =
  | { type: 'BOOLEAN'; text: string; booleanAnswer: boolean }
  | { type: 'INPUT'; text: string; textAnswer: string }
  | { type: 'CHECKBOX'; text: string; options: { text: string; isCorrect: boolean }[] };

export interface NewQuiz {
  title: string;
  questions: NewQuestion[];
}
