import { useFieldArray, useFormContext } from 'react-hook-form';
import type { QuizFormValues } from '@/schemas/quiz.schema';
import styles from './QuizForm.module.css';

const MIN_OPTIONS = 2;

interface OptionsFieldProps {
  questionIndex: number;
}

export default function OptionsField({ questionIndex }: OptionsFieldProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<QuizFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const optionErrors = errors.questions?.[questionIndex]?.options;

  return (
    <div className={styles.field}>
      <span className={styles.label}>Options (check all correct answers)</span>

      <ul className={styles.options}>
        {fields.map((field, optionIndex) => {
          const textError = optionErrors?.[optionIndex]?.text?.message;

          return (
            <li key={field.id}>
              <div className={styles.optionRow}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  aria-label={`Option ${optionIndex + 1} is correct`}
                  {...register(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)}
                />
                <input
                  type="text"
                  className={textError ? `${styles.input} ${styles.inputError}` : styles.input}
                  placeholder={`Option ${optionIndex + 1}`}
                  {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
                />
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => remove(optionIndex)}
                  disabled={fields.length <= MIN_OPTIONS}
                  aria-label={`Remove option ${optionIndex + 1}`}
                >
                  ✕
                </button>
              </div>
              {textError && <p className={styles.error}>{textError}</p>}
            </li>
          );
        })}
      </ul>

      {optionErrors?.root?.message && <p className={styles.error}>{optionErrors.root.message}</p>}

      <button
        type="button"
        className={`button button-secondary ${styles.addOption}`}
        onClick={() => append({ text: '', isCorrect: false })}
      >
        + Add option
      </button>
    </div>
  );
}
