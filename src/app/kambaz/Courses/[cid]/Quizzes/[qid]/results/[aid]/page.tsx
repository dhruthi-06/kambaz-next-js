"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as quizClient from "../../../quizClient";
import { Button, Card, Alert, Badge } from "react-bootstrap";
import type { Quiz, QuizQuestion } from "../../../quizzesReducer";
import type { QuizAttempt } from "../../../quizClient";

export default function QuizResults() {
  const { cid, qid, aid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const attemptId = aid as string;
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);

  useEffect(() => {
    loadResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const loadResults = async () => {
    try {
      const [fetchedQuiz, fetchedAttempt] = await Promise.all([
        quizClient.fetchQuizById(quizId),
        quizClient.fetchAttemptById(attemptId),
      ]);
      setQuiz(fetchedQuiz);
      setAttempt(fetchedAttempt);
    } catch (error) {
      console.error("Error loading results:", error);
      alert("Failed to load quiz results");
      router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}`);
    }
  };

  const getAnswer = (questionId: string) => {
    return attempt?.answers?.find((a) => a.questionId === questionId);
  };

  const renderQuestionResult = (question: QuizQuestion, index: number) => {
    const answer = getAnswer(question._id);
    const isCorrect = answer?.isCorrect;
    const userAnswer = answer?.answer;

    return (
      <Card
        key={question._id}
        className={`mb-3 border-${isCorrect ? "success" : "danger"}`}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6>
              Question {index + 1} - {question.title}
            </h6>
            <Badge bg={isCorrect ? "success" : "danger"}>
              {answer?.pointsEarned || 0} / {question.points} pts
            </Badge>
          </div>

          <p className="mb-3">{question.question}</p>

          <div className="mb-2">
            <strong>Your Answer:</strong>
            <div
              className={`p-2 rounded ${
                isCorrect
                  ? "bg-success bg-opacity-10"
                  : "bg-danger bg-opacity-10"
              }`}
            >
              {String(userAnswer ?? "No answer")}
              {isCorrect ? " ✓" : " ✗"}
            </div>
          </div>

          {!isCorrect && (
            <div>
              <strong>Correct Answer:</strong>
              <div className="p-2 rounded bg-success bg-opacity-10">
                {question.type === "MULTIPLE_CHOICE" &&
                  question.choices?.find(
                    (c: { text: string; isCorrect: boolean }) => c.isCorrect
                  )?.text}
                {question.type === "TRUE_FALSE" &&
                  String(question.correctAnswer)}
                {question.type === "FILL_IN_BLANK" &&
                  question.possibleAnswers?.join(", ")}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  if (!quiz || !attempt) {
    return <div className="p-4">Loading...</div>;
  }

  const percentage =
    quiz.points > 0 ? ((attempt.score / quiz.points) * 100).toFixed(1) : 0;

  return (
    <div className="p-4">
      <h2>{quiz.title} - Results</h2>

      <Alert
        variant={attempt.score >= quiz.points * 0.7 ? "success" : "warning"}
        className="mt-4"
      >
        <h4>
          Your Score: {attempt.score} / {quiz.points} ({percentage}%)
        </h4>
        <p className="mb-0">
          <strong>Submitted:</strong>{" "}
          {attempt.submittedAt &&
            new Date(attempt.submittedAt).toLocaleString()}
        </p>
        <p className="mb-0">
          <strong>Attempt:</strong> {attempt.attemptNumber} of{" "}
          {quiz.howManyAttempts}
        </p>
      </Alert>

      <h5 className="mt-4 mb-3">Question Results</h5>
      {quiz.questions.map((question: QuizQuestion, index: number) =>
        renderQuestionResult(question, index)
      )}

      <div className="text-center mt-4">
        <Button
          variant="primary"
          onClick={() =>
            router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}`)
          }
        >
          Back to Quiz
        </Button>

        {quiz.multipleAttempts &&
          attempt.attemptNumber < quiz.howManyAttempts && (
            <Button
              variant="danger"
              className="ms-2"
              onClick={() =>
                router.push(
                  `/kambaz/Courses/${courseId}/Quizzes/${quizId}/take`
                )
              }
            >
              Retake Quiz
            </Button>
          )}
      </div>
    </div>
  );
}
