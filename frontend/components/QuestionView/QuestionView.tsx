import type { Question, QuestionType } from '@/types/quiz';
import styles from './QuestionView.module.css';

const typeLabels: Record<QuestionType, string> = {
  BOOLEAN: 'True / False',
  INPUT: 'Short answer',
  CHECKBOX: 'Multiple choice',
};

interface QuestionViewProps {
  question: Question;
  number: number;
}

export default function QuestionView({ question, number }: QuestionViewProps) {
  function getAnswerClass(isCorrect: boolean) {
    return isCorrect ? `${styles.answer} ${styles.correct}` : styles.answer;
  }

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>Question {number}</span>
        <span className={styles.badge}>{typeLabels[question.type]}</span>
      </div>

      <h2 className={styles.text}>{question.text}</h2>

      {question.type === 'BOOLEAN' && (
        <div className={styles.answers}>
          {[true, false].map((value) => (
            <label key={String(value)} className={getAnswerClass(question.booleanAnswer === value)}>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={question.booleanAnswer === value}
                disabled
              />
              {value ? 'True' : 'False'}
            </label>
          ))}
        </div>
      )}

      {question.type === 'INPUT' && (
        <div className={styles.answers}>
          <span className={styles.label}>Correct answer</span>
          <input type="text" className={styles.input} value={question.textAnswer ?? ''} readOnly />
        </div>
      )}

      {question.type === 'CHECKBOX' && (
        <div className={styles.answers}>
          {question.options.map((option) => (
            <label key={option.id} className={getAnswerClass(option.isCorrect)}>
              <input type="checkbox" checked={option.isCorrect} disabled />
              {option.text}
            </label>
          ))}
        </div>
      )}
    </article>
  );
}
