import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import QuizCard from '@/components/QuizCard/QuizCard';
import { deleteQuiz, getQuizzes } from '@/services/quizzes';
import styles from '@/styles/QuizzesPage.module.css';
import type { QuizSummary } from '@/types/quiz';

interface QuizzesPageProps {
  initialQuizzes: QuizSummary[];
  error: string | null;
}

export const getServerSideProps: GetServerSideProps<QuizzesPageProps> = async () => {
  try {
    const initialQuizzes = await getQuizzes();
    return { props: { initialQuizzes, error: null } };
  } catch {
    return {
      props: { initialQuizzes: [], error: 'Could not load quizzes' },
    };
  }
};

export default function QuizzesPage({ initialQuizzes, error }: QuizzesPageProps) {
  const [quizzes, setQuizzes] = useState(initialQuizzes);

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this quiz?')) {
      return;
    }

    try {
      await deleteQuiz(id);
      setQuizzes((current) => current.filter((quiz) => quiz.id !== id));
    } catch {
      window.alert('Failed to delete the quiz. Please try again.');
    }
  }

  return (
    <>
      <Head>
        <title>Quizzes | Quiz Builder</title>
      </Head>

      <div className="page-header">
        <h1 className="page-title">Quizzes</h1>
        <Link href="/create" className="button button-primary">
          Create quiz
        </Link>
      </div>

      {error && <p className={`${styles.state} ${styles.error}`}>{error}</p>}

      {!error && quizzes.length === 0 && (
        <div className={styles.state}>
          <p>No quizzes yet.</p>
          <Link href="/create">Create your first quiz</Link>
        </div>
      )}

      {quizzes.length > 0 && (
        <ul className={styles.list}>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <QuizCard quiz={quiz} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}