import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller.js';

export const quizRouter = Router();

quizRouter.get('/', quizController.getQuizzes);
quizRouter.get('/:id', quizController.getQuizById);
quizRouter.post('/', quizController.createQuiz);
quizRouter.delete('/:id', quizController.deleteQuiz);