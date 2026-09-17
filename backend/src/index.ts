import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { quizRouter } from './routes/quiz.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.sendStatus(200);
});

app.use('/quizzes', quizRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
