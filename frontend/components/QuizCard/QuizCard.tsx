import Link from 'next/link';
import type { QuizSummary } from '@/types/quiz';
import styles from './QuizCard.module.css';

interface QuizCardProps {
  quiz: QuizSummary;
  onDelete: (id: number) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const questionLabel = quiz.questionCount === 1 ? 'question' : 'questions';

  return (
    <article className={styles.card}>
      <Link href={`/quizzes/${quiz.id}`} className={styles.link}>
        <h2 className={styles.title}>{quiz.title}</h2>
        <p className={styles.count}>
          {quiz.questionCount} {questionLabel}
        </p>
      </Link>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => onDelete(quiz.id)}
        aria-label={`Delete quiz ${quiz.title}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M6 6l1 14h10l1-14" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        </svg>
      </button>
    </article>
  );
}