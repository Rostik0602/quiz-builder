import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import QuestionView from '@/components/QuestionView/QuestionView';
import { getQuiz } from '@/services/quizzes';
import styles from '@/styles/QuizPage.module.css';
import type { Quiz } from '@/types/quiz';

interface QuizPageProps {
  quiz: Quiz;
}

export const getServerSideProps: GetServerSideProps<QuizPageProps> = async ({ params }) => {
  const id = Number(params?.id);

  if (!Number.isInteger(id) || id <= 0) {
    return { notFound: true };
  }

  const quiz = await getQuiz(id);

  if (!quiz) {
    return { notFound: true };
  }

  return { props: { quiz } };
};

export default function QuizPage({ quiz }: QuizPageProps) {
  const questionLabel = quiz.questions.length === 1 ? 'question' : 'questions';

  return (
    <>
      <Head>
        <title>{`${quiz.title} | Quiz Builder`}</title>
      </Head>

      <Link href="/quizzes" className={styles.back}>
        ← Back to quizzes
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">{quiz.title}</h1>
          <p className={styles.meta}>
            {quiz.questions.length} {questionLabel}
          </p>
        </div>
      </div>

      <ol className={styles.questions}>
        {quiz.questions.map((question, index) => (
          <li key={question.id}>
            <QuestionView question={question} number={index + 1} />
          </li>
        ))}
      </ol>
    </>
  );
}