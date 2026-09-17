import { useFormContext, useWatch } from 'react-hook-form';
import type { QuizFormValues } from '@/schemas/quiz.schema';
import OptionsField from './OptionsField';
import styles from './QuizForm.module.css';

interface QuestionFieldProps {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

export default function QuestionField({ index, canRemove, onRemove }: QuestionFieldProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<QuizFormValues>();

  const type = useWatch({ control, name: `questions.${index}.type` });
  const questionErrors = errors.questions?.[index];

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Question {index + 1}</h2>
        <button
          type="button"
          className="button button-secondary"
          onClick={onRemove}
          disabled={!canRemove}
        >
          Remove
        </button>
      </div>

      <div className={styles.questionRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`question-${index}-text`}>
            Question text
          </label>
          <input
            id={`question-${index}-text`}
            type="text"
            className={questionErrors?.text ? `${styles.input} ${styles.inputError}` : styles.input}
            placeholder="Enter your question"
            {...register(`questions.${index}.text`)}
          />
          {questionErrors?.text && <p className={styles.error}>{questionErrors.text.message}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`question-${index}-type`}>
            Type
          </label>
          <select
            id={`question-${index}-type`}
            className={styles.input}
            {...register(`questions.${index}.type`)}
          >
            <option value="BOOLEAN">True / False</option>
            <option value="INPUT">Short answer</option>
            <option value="CHECKBOX">Multiple choice</option>
          </select>
        </div>
      </div>

      {type === 'BOOLEAN' && (
        <div className={styles.field}>
          <span className={styles.label}>Correct answer</span>
          <div className={styles.choices}>
            <label className={styles.choice}>
              <input type="radio" value="true" {...register(`questions.${index}.booleanAnswer`)} />
              True
            </label>
            <label className={styles.choice}>
              <input type="radio" value="false" {...register(`questions.${index}.booleanAnswer`)} />
              False
            </label>
          </div>
        </div>
      )}

      {type === 'INPUT' && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`question-${index}-answer`}>
            Correct answer
          </label>
          <input
            id={`question-${index}-answer`}
            type="text"
            className={
              questionErrors?.textAnswer ? `${styles.input} ${styles.inputError}` : styles.input
            }
            placeholder="Enter the correct answer"
            {...register(`questions.${index}.textAnswer`)}
          />
          {questionErrors?.textAnswer && (
            <p className={styles.error}>{questionErrors.textAnswer.message}</p>
          )}
        </div>
      )}

      {type === 'CHECKBOX' && <OptionsField questionIndex={index} />}
    </section>
  );
}
