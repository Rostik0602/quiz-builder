import { prisma } from '../lib/prisma.js';
import type { CreateQuizInput } from '../schemas/quiz.schema.js';

export async function getQuizzes() {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      _count: { select: { questions: true } },
    },
  });

  return quizzes.map(({ _count, ...quiz }) => ({
    ...quiz,
    questionCount: _count.questions,
  }));
}

export function getQuizById(id: number) {
  return prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { id: 'asc' },
        include: {
          options: { orderBy: { id: 'asc' } },
        },
      },
    },
  });
}

export function createQuiz({ title, questions }: CreateQuizInput) {
  return prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions.map((question) => ({
          text: question.text,
          type: question.type,
          booleanAnswer: question.type === 'BOOLEAN' ? question.booleanAnswer : undefined,
          textAnswer: question.type === 'INPUT' ? question.textAnswer : undefined,
          options: question.type === 'CHECKBOX' ? { create: question.options } : undefined,
        })),
      },
    },
  });
}

export async function deleteQuiz(id: number) {
  const { count } = await prisma.quiz.deleteMany({ where: { id } });
  return count > 0;
}