import { prisma } from '../src/lib/prisma.js';
import { createQuiz } from '../src/services/quiz.service.js';
import type { CreateQuizInput } from '../src/schemas/quiz.schema.js';

const sampleQuizzes: CreateQuizInput[] = [
  {
    title: 'JavaScript Basics',
    questions: [
      { type: 'BOOLEAN', text: 'JavaScript is a statically typed language.', booleanAnswer: false },
      { type: 'INPUT', text: 'Which keyword declares a constant?', textAnswer: 'const' },
      {
        type: 'CHECKBOX',
        text: 'Which of these are primitive types in JavaScript?',
        options: [
          { text: 'string', isCorrect: true },
          { text: 'number', isCorrect: true },
          { text: 'array', isCorrect: false },
          { text: 'boolean', isCorrect: true },
        ],
      },
    ],
  },
  {
    title: 'Web Fundamentals',
    questions: [
      { type: 'INPUT', text: 'What does HTML stand for?', textAnswer: 'HyperText Markup Language' },
      {
        type: 'BOOLEAN',
        text: 'HTTP status 404 means the resource was not found.',
        booleanAnswer: true,
      },
      {
        type: 'CHECKBOX',
        text: 'Which HTTP methods are commonly used in REST APIs?',
        options: [
          { text: 'GET', isCorrect: true },
          { text: 'POST', isCorrect: true },
          { text: 'FETCH', isCorrect: false },
          { text: 'DELETE', isCorrect: true },
        ],
      },
    ],
  },
];

async function main() {
  await prisma.quiz.deleteMany();

  for (const quiz of sampleQuizzes) {
    await createQuiz(quiz);
  }

  console.log(`Seeded ${sampleQuizzes.length} quizzes`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());