import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { quizFormSchema } from '@/schemas/quiz.schema';
import type { QuestionFormValues, QuizFormValues } from '@/schemas/quiz.schema';
import type { NewQuestion, NewQuiz } from '@/types/quiz';
import QuestionField from './QuestionField';
import styles from './QuizForm.module.css';

function createEmptyQuestion(): QuestionFormValues {
  return {
    type: 'BOOLEAN',
    text: '',
    booleanAnswer: 'true',
    textAnswer: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
  };
}

function toNewQuestion(question: QuestionFormValues): NewQuestion {
  switch (question.type) {
    case 'BOOLEAN':
      return {
        type: 'BOOLEAN',
        text: question.text,
        booleanAnswer: question.booleanAnswer === 'true',
      };
    case 'INPUT':
      return { type: 'INPUT', text: question.text, textAnswer: question.textAnswer };
    case 'CHECKBOX':
      return { type: 'CHECKBOX', text: question.text, options: question.options };
  }
}

interface QuizFormProps {
  onSubmit: (quiz: NewQuiz) => Promise<void>;
}

export default function QuizForm({ onSubmit }: QuizFormProps) {
  const methods = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: '',
      questions: [createEmptyQuestion()],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  async function submit(values: QuizFormValues) {
    try {
      await onSubmit({
        title: values.title,
        questions: values.questions.map(toNewQuestion),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create the quiz';
      setError('root', { message });
    }
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <section className={styles.card}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">
              Quiz title
            </label>
            <input
              id="title"
              type="text"
              className={errors.title ? `${styles.input} ${styles.inputError}` : styles.input}
              placeholder="e.g. JavaScript Basics"
              {...register('title')}
            />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </div>
        </section>

        {fields.map((field, index) => (
          <QuestionField
            key={field.id}
            index={index}
            canRemove={fields.length > 1}
            onRemove={() => remove(index)}
          />
        ))}

        <button
          type="button"
          className={`button button-secondary ${styles.addQuestion}`}
          onClick={() => append(createEmptyQuestion())}
        >
          + Add question
        </button>

        {errors.root && <p className={styles.formError}>{errors.root.message}</p>}

        <div className={styles.actions}>
          <button type="submit" className="button button-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create quiz'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
