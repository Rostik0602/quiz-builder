import type { NewQuiz, Quiz, QuizSummary } from '@/types/quiz';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 404) {
    return null as T;
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? 'Something went wrong');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export function getQuizzes() {
  return request<QuizSummary[]>('/quizzes');
}

export function getQuiz(id: number) {
  return request<Quiz | null>(`/quizzes/${id}`);
}

export function createQuiz(quiz: NewQuiz) {
  return request<Omit<Quiz, 'questions'>>('/quizzes', {
    method: 'POST',
    body: JSON.stringify(quiz),
  });
}

export function deleteQuiz(id: number) {
  return request<void>(`/quizzes/${id}`, { method: 'DELETE' });
}