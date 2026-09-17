import { z } from 'zod';

const optionSchema = z.object({
  text: z.string().trim(),
  isCorrect: z.boolean(),
});

const questionSchema = z
  .object({
    type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
    text: z.string().trim().min(1, 'Question text is required'),
    booleanAnswer: z.enum(['true', 'false']),
    textAnswer: z.string().trim(),
    options: z.array(optionSchema),
  })
  .superRefine((question, ctx) => {
    if (question.type === 'INPUT' && !question.textAnswer) {
      ctx.addIssue({
        code: 'custom',
        path: ['textAnswer'],
        message: 'Correct answer is required',
      });
    }

    if (question.type !== 'CHECKBOX') {
      return;
    }

    question.options.forEach((option, index) => {
      if (!option.text) {
        ctx.addIssue({
          code: 'custom',
          path: ['options', index, 'text'],
          message: 'Option text is required',
        });
      }
    });

    if (!question.options.some((option) => option.isCorrect)) {
      ctx.addIssue({
        code: 'custom',
        path: ['options'],
        message: 'Mark at least one correct option',
      });
    }
  });

export const quizFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export type QuizFormValues = z.infer<typeof quizFormSchema>;
export type QuestionFormValues = QuizFormValues['questions'][number];