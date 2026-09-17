import Head from 'next/head';
import { useRouter } from 'next/router';
import QuizForm from '@/components/QuizForm/QuizForm';
import { createQuiz } from '@/services/quizzes';
import type { NewQuiz } from '@/types/quiz';

export default function CreateQuizPage() {
  const router = useRouter();

  async function handleSubmit(quiz: NewQuiz) {
    const createdQuiz = await createQuiz(quiz);
    await router.push(`/quizzes/${createdQuiz.id}`);
  }

  return (
    <>
      <Head>
        <title>Create quiz | Quiz Builder</title>
      </Head>

      <div className="page-header">
        <h1 className="page-title">Create quiz</h1>
      </div>

      <QuizForm onSubmit={handleSubmit} />
    </>
  );
}