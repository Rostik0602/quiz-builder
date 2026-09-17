import { z } from 'zod';

const questionText = z.string().trim().min(1, 'Question text is required');

const booleanQuestionSchema = z.object({
  type: z.literal('BOOLEAN'),
  text: questionText,
  booleanAnswer: z.boolean(),
});

const inputQuestionSchema = z.object({
  type: z.literal('INPUT'),
  text: questionText,
  textAnswer: z.string().trim().min(1, 'Correct answer is required'),
});

const optionSchema = z.object({
  text: z.string().trim().min(1, 'Option text is required'),
  isCorrect: z.boolean(),
});

const checkboxQuestionSchema = z.object({
  type: z.literal('CHECKBOX'),
  text: questionText,
  options: z
    .array(optionSchema)
    .min(2, 'Add at least two options')
    .refine(
      (options) => options.some((option) => option.isCorrect),
      'Mark at least one correct option',
    ),
});

const questionSchema = z.discriminatedUnion('type', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

export const createQuizSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export const quizIdSchema = z.coerce.number().int().positive();

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
