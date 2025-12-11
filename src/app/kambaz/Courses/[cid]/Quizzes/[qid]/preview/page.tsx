"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as quizClient from "../../quizClient";
import { Button, Form, Card, Alert, Badge } from "react-bootstrap";
import type { Quiz, QuizQuestion } from "../../quizzesReducer";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<
    Record<string, string | boolean | number>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"one-at-a-time" | "all">(
    "one-at-a-time"
  );

  useEffect(() => {
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const loadQuiz = async () => {
    try {
      const fetchedQuiz = await quizClient.fetchQuizById(quizId);
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.error("Error loading quiz:", error);
      alert("Failed to load quiz");
      router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}`);
    }
  };

  const handleAnswerChange = (
    questionId: string,
    answer: string | boolean | number
  ) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const gradeQuiz = () => {
    if (!quiz) return;

    let totalScore = 0;

    quiz.questions.forEach((question: QuizQuestion) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;

      switch (question.type) {
        case "MULTIPLE_CHOICE":
          const correctChoice = question.choices?.find((c) => c.isCorrect);
          isCorrect = userAnswer === correctChoice?.text;
          break;

        case "TRUE_FALSE":
          isCorrect = userAnswer === question.correctAnswer;
          break;

        case "FILL_IN_BLANK":
          const answerText = String(userAnswer || "").trim();
          if (question.caseSensitive) {
            isCorrect = question.possibleAnswers?.includes(answerText) || false;
          } else {
            isCorrect =
              question.possibleAnswers?.some(
                (pa: string) => pa.toLowerCase() === answerText.toLowerCase()
              ) || false;
          }
          break;
      }

      if (isCorrect) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);
    setShowResults(true);
  };

  const resetPreview = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const renderQuestion = (question: QuizQuestion, index: number) => {
    const answer = answers[question._id];

    let isCorrect = false;
    if (showResults) {
      switch (question.type) {
        case "MULTIPLE_CHOICE":
          const correctChoice = question.choices?.find((c) => c.isCorrect);
          isCorrect = answer === correctChoice?.text;
          break;
        case "TRUE_FALSE":
          isCorrect = answer === question.correctAnswer;
          break;
        case "FILL_IN_BLANK":
          const answerText = String(answer || "").trim();
          if (question.caseSensitive) {
            isCorrect = question.possibleAnswers?.includes(answerText) || false;
          } else {
            isCorrect =
              question.possibleAnswers?.some(
                (pa: string) => pa.toLowerCase() === answerText.toLowerCase()
              ) || false;
          }
          break;
      }
    }

    return (
      <Card
        key={question._id}
        className={`mb-4 ${
          showResults ? (isCorrect ? "border-success" : "border-danger") : ""
        }`}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5>
              Question {index + 1} ({question.points} pts)
            </h5>
            {showResults && (
              <Badge bg={isCorrect ? "success" : "danger"}>
                {isCorrect ? question.points : 0} / {question.points} pts
              </Badge>
            )}
          </div>

          <p className="mb-3">{question.question}</p>

          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              {question.choices?.map(
                (choice: { text: string; isCorrect: boolean }, idx: number) => {
                  const isSelected = answer === choice.text;
                  const isCorrectChoice = choice.isCorrect;

                  return (
                    <div
                      key={idx}
                      className={`p-2 mb-2 rounded ${
                        showResults
                          ? isCorrectChoice
                            ? "bg-success bg-opacity-10"
                            : isSelected
                            ? "bg-danger bg-opacity-10"
                            : ""
                          : ""
                      }`}
                    >
                      <Form.Check
                        type="radio"
                        id={`${question._id}-${idx}`}
                        label={
                          <span>
                            {choice.text}
                            {showResults && isCorrectChoice && " ✓"}
                            {showResults &&
                              isSelected &&
                              !isCorrectChoice &&
                              " ✗"}
                          </span>
                        }
                        name={question._id}
                        checked={isSelected}
                        onChange={() =>
                          !showResults &&
                          handleAnswerChange(question._id, choice.text)
                        }
                        disabled={showResults}
                      />
                    </div>
                  );
                }
              )}
            </div>
          )}

          {question.type === "TRUE_FALSE" && (
            <div>
              <div
                className={`p-2 mb-2 rounded ${
                  showResults
                    ? question.correctAnswer === true
                      ? "bg-success bg-opacity-10"
                      : answer === true
                      ? "bg-danger bg-opacity-10"
                      : ""
                    : ""
                }`}
              >
                <Form.Check
                  type="radio"
                  id={`${question._id}-true`}
                  label={
                    <span>
                      True
                      {showResults && question.correctAnswer === true && " ✓"}
                      {showResults &&
                        answer === true &&
                        question.correctAnswer !== true &&
                        " ✗"}
                    </span>
                  }
                  name={question._id}
                  checked={answer === true}
                  onChange={() =>
                    !showResults && handleAnswerChange(question._id, true)
                  }
                  disabled={showResults}
                />
              </div>
              <div
                className={`p-2 mb-2 rounded ${
                  showResults
                    ? question.correctAnswer === false
                      ? "bg-success bg-opacity-10"
                      : answer === false
                      ? "bg-danger bg-opacity-10"
                      : ""
                    : ""
                }`}
              >
                <Form.Check
                  type="radio"
                  id={`${question._id}-false`}
                  label={
                    <span>
                      False
                      {showResults && question.correctAnswer === false && " ✓"}
                      {showResults &&
                        answer === false &&
                        question.correctAnswer !== false &&
                        " ✗"}
                    </span>
                  }
                  name={question._id}
                  checked={answer === false}
                  onChange={() =>
                    !showResults && handleAnswerChange(question._id, false)
                  }
                  disabled={showResults}
                />
              </div>
            </div>
          )}

          {question.type === "FILL_IN_BLANK" && (
            <div>
              <Form.Control
                type="text"
                value={String(answer || "")}
                onChange={(e) =>
                  handleAnswerChange(question._id, e.target.value)
                }
                placeholder="Enter your answer"
                disabled={showResults}
                className={
                  showResults
                    ? isCorrect
                      ? "border-success"
                      : "border-danger"
                    : ""
                }
              />
              {showResults && (
                <div className="mt-2">
                  <small className="text-muted">
                    <strong>Correct answers:</strong>{" "}
                    {question.possibleAnswers?.join(", ")}
                  </small>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  if (!quiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title} - Preview</h2>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() =>
              router.push(
                `/kambaz/Courses/${courseId}/Quizzes/${quizId}/editor`
              )
            }
          >
            Edit Quiz
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() =>
              router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}`)
            }
          >
            Back
          </Button>
        </div>
      </div>

      <Alert variant="info">
        <strong>Preview Mode</strong> - This is how students will see the quiz.
        <div className="mt-2">
          <Button
            size="sm"
            variant={
              viewMode === "one-at-a-time" ? "primary" : "outline-primary"
            }
            onClick={() => setViewMode("one-at-a-time")}
            className="me-2"
          >
            One at a Time
          </Button>
          <Button
            size="sm"
            variant={viewMode === "all" ? "primary" : "outline-primary"}
            onClick={() => setViewMode("all")}
          >
            View All
          </Button>
        </div>
      </Alert>

      {showResults && (
        <Alert variant={score >= quiz.points * 0.7 ? "success" : "warning"}>
          <h4>
            Preview Score: {score} / {quiz.points} (
            {((score / quiz.points) * 100).toFixed(1)}%)
          </h4>
        </Alert>
      )}

      {viewMode === "one-at-a-time" ? (
        <>
          {renderQuestion(
            quiz.questions[currentQuestionIndex],
            currentQuestionIndex
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button
              variant="secondary"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="text-center">
              <div className="mb-2">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
              <div className="d-flex gap-1">
                {quiz.questions.map((_, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant={
                      idx === currentQuestionIndex
                        ? "primary"
                        : "outline-secondary"
                    }
                    onClick={() => setCurrentQuestionIndex(idx)}
                  >
                    {idx + 1}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          {quiz.questions.map((question: QuizQuestion, index: number) =>
            renderQuestion(question, index)
          )}
        </>
      )}

      <div className="text-center mt-4">
        {!showResults ? (
          <Button variant="success" size="lg" onClick={gradeQuiz}>
            Submit Preview
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={resetPreview}>
            Reset Preview
          </Button>
        )}
      </div>
    </div>
  );
}
