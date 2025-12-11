"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuizQuestion {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points: number;
  question: string;
  group?: string; // Question group for organization
  choices?: { text: string; isCorrect: boolean }[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
  caseSensitive?: boolean;
}

export interface Quiz {
  _id: string;
  course: string;
  title: string;
  description: string;
  quizType:
    | "GRADED_QUIZ"
    | "PRACTICE_QUIZ"
    | "GRADED_SURVEY"
    | "UNGRADED_SURVEY";
  points: number;
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  published: boolean;
  questions: QuizQuestion[];
}

interface QuizzesState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  currentQuiz: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
      if (state.currentQuiz?._id === action.payload._id) {
        state.currentQuiz = action.payload;
      }
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
      if (state.currentQuiz?._id === action.payload) {
        state.currentQuiz = null;
      }
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
    },
    addQuestion: (
      state,
      action: PayloadAction<{ quizId: string; question: QuizQuestion }>
    ) => {
      const quiz = state.quizzes.find((q) => q._id === action.payload.quizId);
      if (quiz) {
        quiz.questions.push(action.payload.question);
        quiz.points = quiz.questions.reduce((sum, q) => sum + q.points, 0);
      }
      if (state.currentQuiz?._id === action.payload.quizId) {
        state.currentQuiz.questions.push(action.payload.question);
        state.currentQuiz.points = state.currentQuiz.questions.reduce(
          (sum, q) => sum + q.points,
          0
        );
      }
    },
    updateQuestion: (
      state,
      action: PayloadAction<{ quizId: string; question: QuizQuestion }>
    ) => {
      const quiz = state.quizzes.find((q) => q._id === action.payload.quizId);
      if (quiz) {
        quiz.questions = quiz.questions.map((q) =>
          q._id === action.payload.question._id ? action.payload.question : q
        );
        quiz.points = quiz.questions.reduce((sum, q) => sum + q.points, 0);
      }
      if (state.currentQuiz?._id === action.payload.quizId) {
        state.currentQuiz.questions = state.currentQuiz.questions.map((q) =>
          q._id === action.payload.question._id ? action.payload.question : q
        );
        state.currentQuiz.points = state.currentQuiz.questions.reduce(
          (sum, q) => sum + q.points,
          0
        );
      }
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{ quizId: string; questionId: string }>
    ) => {
      const quiz = state.quizzes.find((q) => q._id === action.payload.quizId);
      if (quiz) {
        quiz.questions = quiz.questions.filter(
          (q) => q._id !== action.payload.questionId
        );
        quiz.points = quiz.questions.reduce((sum, q) => sum + q.points, 0);
      }
      if (state.currentQuiz?._id === action.payload.quizId) {
        state.currentQuiz.questions = state.currentQuiz.questions.filter(
          (q) => q._id !== action.payload.questionId
        );
        state.currentQuiz.points = state.currentQuiz.questions.reduce(
          (sum, q) => sum + q.points,
          0
        );
      }
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setCurrentQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
