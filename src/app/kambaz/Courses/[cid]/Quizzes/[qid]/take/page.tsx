"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as quizClient from "../../quizClient";
import { Button, Form, Card, Alert } from "react-bootstrap";
import type { Quiz, QuizQuestion } from "../../quizzesReducer";
import type { QuizAttempt } from "../../quizClient";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [answers, setAnswers] = useState<
    Record<string, string | boolean | number>
  >({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadQuizAndAttempt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const loadQuizAndAttempt = async () => {
    try {
      const fetchedQuiz = await quizClient.fetchQuizById(quizId);
      setQuiz(fetchedQuiz);

      // Check if there's an existing incomplete attempt
      const latestAttempt = await quizClient.fetchLatestAttempt(quizId);

      if (latestAttempt && !latestAttempt.completed) {
        setAttempt(latestAttempt);
        // Load previous answers
        const existingAnswers: Record<string, string | boolean | number> = {};
        latestAttempt.answers?.forEach((ans) => {
          existingAnswers[ans.questionId] = ans.answer;
        });
        setAnswers(existingAnswers);
      } else {
        // Start new attempt
        const newAttempt = await quizClient.startQuizAttempt(quizId);
        setAttempt(newAttempt);
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Error loading quiz:", error);
      alert(err.response?.data?.message || "Failed to load quiz");
      router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}`);
    }
  };

  const handleAnswerChange = (
    questionId: string,
    answer: string | boolean | number
  ) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (
      !confirm(
        "Are you sure you want to submit? You cannot change your answers after submission."
      )
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionAnswers = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );

      const result = await quizClient.submitQuizAttempt(
        attempt!._id,
        submissionAnswers
      );

      alert(`Quiz submitted! Your score: ${result.score} / ${quiz?.points}`);
      router.push(
        `/kambaz/Courses/${courseId}/Quizzes/${quizId}/results/${result._id}`
      );
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Error submitting quiz:", error);
      alert(err.response?.data?.message || "Failed to submit quiz");
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: QuizQuestion, index: number) => {
    const answer = answers[question._id];

    return (
      <Card key={question._id} className="mb-4">
        <Card.Body>
          <h5>
            Question {index + 1} ({question.points} pts)
          </h5>
          <p className="mb-3">{question.question}</p>

          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              {question.choices?.map(
                (choice: { text: string; isCorrect: boolean }, idx: number) => (
                  <Form.Check
                    key={idx}
                    type="radio"
                    id={`${question._id}-${idx}`}
                    label={choice.text}
                    name={question._id}
                    checked={answer === choice.text}
                    onChange={() =>
                      handleAnswerChange(question._id, choice.text)
                    }
                  />
                )
              )}
            </div>
          )}

          {question.type === "TRUE_FALSE" && (
            <div>
              <Form.Check
                type="radio"
                id={`${question._id}-true`}
                label="True"
                name={question._id}
                checked={answer === true}
                onChange={() => handleAnswerChange(question._id, true)}
              />
              <Form.Check
                type="radio"
                id={`${question._id}-false`}
                label="False"
                name={question._id}
                checked={answer === false}
                onChange={() => handleAnswerChange(question._id, false)}
              />
            </div>
          )}

          {question.type === "FILL_IN_BLANK" && (
            <Form.Control
              type="text"
              value={String(answer || "")}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              placeholder="Enter your answer"
            />
          )}
        </Card.Body>
      </Card>
    );
  };

  if (!quiz || !attempt) {
    return <div className="p-4">Loading...</div>;
  }

  const oneAtATime = quiz.oneQuestionAtATime;
  const currentQuestion = oneAtATime
    ? quiz.questions[currentQuestionIndex]
    : null;
  const canGoNext =
    oneAtATime && currentQuestionIndex < quiz.questions.length - 1;
  const canGoPrev = oneAtATime && currentQuestionIndex > 0;

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        <div className="text-muted">
          Answered: {answeredCount} / {totalQuestions}
        </div>
      </div>

      <Alert variant="info">
        <strong>Instructions:</strong>
        <ul className="mb-0 mt-2">
          <li>You have {quiz.timeLimit} minutes to complete this quiz</li>
          <li>Total Points: {quiz.points}</li>
          <li>Total Questions: {quiz.questions.length}</li>
          {quiz.multipleAttempts && (
            <li>You have {quiz.howManyAttempts} attempts for this quiz</li>
          )}
        </ul>
      </Alert>

      {oneAtATime && currentQuestion ? (
        <div>
          {renderQuestion(currentQuestion, currentQuestionIndex)}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="secondary"
              disabled={!canGoPrev}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            >
              Previous
            </Button>

            <div className="text-center">
              <div className="mb-2">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
              <div className="d-flex gap-1">
                {quiz.questions.map((_, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant={
                      idx === currentQuestionIndex
                        ? "primary"
                        : answers[quiz.questions[idx]._id]
                        ? "success"
                        : "outline-secondary"
                    }
                    onClick={() => setCurrentQuestionIndex(idx)}
                  >
                    {idx + 1}
                  </Button>
                ))}
              </div>
            </div>

            {canGoNext ? (
              <Button
                variant="primary"
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          {quiz.questions.map((question: QuizQuestion, index: number) =>
            renderQuestion(question, index)
          )}

          <div className="text-center mt-4">
            <Button
              variant="success"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
