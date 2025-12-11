import axios from "axios";
import type { Quiz, QuizQuestion } from "./quizzesReducer";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const QUIZZES_API = `${HTTP_SERVER}/api`;

// Quiz CRUD operations
export const fetchQuizzesForCourse = async (
  courseId: string
): Promise<Quiz[]> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/courses/${courseId}/quizzes`
  );
  return data;
};

export const fetchQuizById = async (quizId: string): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}`
  );
  return data;
};

export const createQuiz = async (
  courseId: string,
  quiz: Partial<Quiz>
): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/courses/${courseId}/quizzes`,
    quiz
  );
  return data;
};

export const updateQuiz = async (
  quizId: string,
  updates: Partial<Quiz>
): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}`,
    updates
  );
  return data;
};

export const deleteQuiz = async (quizId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/quizzes/${quizId}`);
};

export const publishQuiz = async (
  quizId: string,
  published: boolean
): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}`,
    { published }
  );
  return data;
};

// Question operations
export const addQuestionToQuiz = async (
  quizId: string,
  question: Partial<QuizQuestion>
): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/quizzes/${quizId}/questions`,
    question
  );
  return data;
};

export const updateQuestionInQuiz = async (
  quizId: string,
  questionId: string,
  updates: Partial<QuizQuestion>
): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}/questions/${questionId}`,
    updates
  );
  return data;
};

export const deleteQuestionFromQuiz = async (
  quizId: string,
  questionId: string
): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/quizzes/${quizId}/questions/${questionId}`
  );
  return data;
};

// Quiz Attempt operations
export interface QuizAttempt {
  _id: string;
  quiz: string;
  user: string;
  course: string;
  attemptNumber: number;
  answers: {
    questionId: string;
    answer: string | boolean | number;
    isCorrect?: boolean;
    pointsEarned?: number;
  }[];
  score: number;
  completed: boolean;
  startedAt: string;
  submittedAt?: string;
}

export const fetchAttemptsForQuiz = async (
  quizId: string
): Promise<QuizAttempt[]> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/attempts`
  );
  return data;
};

export const fetchLatestAttempt = async (
  quizId: string
): Promise<QuizAttempt | null> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/attempts/latest`
  );
  return data;
};

export const startQuizAttempt = async (
  quizId: string
): Promise<QuizAttempt> => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/quizzes/${quizId}/attempts`
  );
  return data;
};

export const submitQuizAttempt = async (
  attemptId: string,
  answers: { questionId: string; answer: string | boolean | number }[]
): Promise<QuizAttempt> => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/attempts/${attemptId}/submit`,
    { answers }
  );
  return data;
};

export const fetchAttemptById = async (
  attemptId: string
): Promise<QuizAttempt> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/attempts/${attemptId}`
  );
  return data;
};
