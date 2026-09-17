import type { Request, Response } from 'express';
import { createQuizSchema, quizIdSchema } from '../schemas/quiz.schema.js';
import * as quizService from '../services/quiz.service.js';

export async function getQuizzes(_req: Request, res: Response) {
  const quizzes = await quizService.getQuizzes();
  res.json(quizzes);
}

export async function getQuizById(req: Request, res: Response) {
  const id = quizIdSchema.parse(req.params.id);
  const quiz = await quizService.getQuizById(id);

  if (!quiz) {
    res.status(404).json({ message: 'Quiz not found' });
    return;
  }

  res.json(quiz);
}

export async function createQuiz(req: Request, res: Response) {
  const data = createQuizSchema.parse(req.body);
  const quiz = await quizService.createQuiz(data);
  res.status(201).json(quiz);
}

export async function deleteQuiz(req: Request, res: Response) {
  const id = quizIdSchema.parse(req.params.id);
  const isDeleted = await quizService.deleteQuiz(id);

  if (!isDeleted) {
    res.status(404).json({ message: 'Quiz not found' });
    return;
  }

  res.sendStatus(204);
}