"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/kambaz/store";
import * as quizClient from "../quizClient";
import { Button, Card } from "react-bootstrap";
import type { Quiz } from "../quizzesReducer";
import type { QuizAttempt } from "../quizClient";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    fetchQuiz();
    if (!isFaculty) {
      fetchLatestAttempt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, isFaculty]);

  const fetchQuiz = async () => {
    try {
      const fetchedQuiz = await quizClient.fetchQuizById(quizId);
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const fetchLatestAttempt = async () => {
    try {
      const attempt = await quizClient.fetchLatestAttempt(quizId);
      setLatestAttempt(attempt);
    } catch (error) {
      console.error("Error fetching attempt:", error);
    }
  };

  const handleStartQuiz = () => {
    router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}/take`);
  };

  const handlePreview = () => {
    router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}/preview`);
  };

  const handleEdit = () => {
    router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}/editor`);
  };

  const handleTogglePublish = async () => {
    if (!quiz) return;

    try {
      const updated = await quizClient.publishQuiz(quizId, !quiz.published);
      setQuiz(updated);
      alert(updated.published ? "Quiz published!" : "Quiz unpublished!");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to update quiz");
    }
  };

  if (!quiz) {
    return <div className="p-4">Loading...</div>;
  }

  const getAvailabilityStatus = () => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (until && now > until) {
      return "Closed";
    }
    if (available && now < available) {
      return `Not available until ${available.toLocaleDateString()}`;
    }
    return "Available";
  };

  const canTakeQuiz = () => {
    if (isFaculty) return false;
    if (!quiz.published) return false;

    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (available && now < available) return false;
    if (until && now > until) return false;

    return true;
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        <div className="d-flex gap-2">
          {isFaculty && (
            <>
              <Button variant="outline-secondary" onClick={handlePreview}>
                Preview
              </Button>
              <Button
                variant={quiz.published ? "warning" : "success"}
                onClick={handleTogglePublish}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <div className="mb-3">
            <h5>Quiz Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: quiz.description || "No description provided.",
              }}
            />
          </div>

          <hr />

          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Quiz Type:</strong> {quiz.quizType.replace(/_/g, " ")}
              </p>
              <p>
                <strong>Points:</strong> {quiz.points}
              </p>
              <p>
                <strong>Assignment Group:</strong> {quiz.assignmentGroup}
              </p>
              <p>
                <strong>Shuffle Answers:</strong>{" "}
                {quiz.shuffleAnswers ? "Yes" : "No"}
              </p>
              <p>
                <strong>Time Limit:</strong> {quiz.timeLimit} Minutes
              </p>
              <p>
                <strong>Multiple Attempts:</strong>{" "}
                {quiz.multipleAttempts ? "Yes" : "No"}
              </p>
              {quiz.multipleAttempts && (
                <p>
                  <strong>Allowed Attempts:</strong> {quiz.howManyAttempts}
                </p>
              )}
            </div>
            <div className="col-md-6">
              <p>
                <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}
              </p>
              {quiz.accessCode && (
                <p>
                  <strong>Access Code Required:</strong> Yes
                </p>
              )}
              <p>
                <strong>One Question at a Time:</strong>{" "}
                {quiz.oneQuestionAtATime ? "Yes" : "No"}
              </p>
              <p>
                <strong>Webcam Required:</strong>{" "}
                {quiz.webcamRequired ? "Yes" : "No"}
              </p>
              <p>
                <strong>Lock Questions After Answering:</strong>{" "}
                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <hr />

          <div>
            <p>
              <strong>Availability:</strong> {getAvailabilityStatus()}
            </p>
            {quiz.dueDate && (
              <p>
                <strong>Due:</strong> {new Date(quiz.dueDate).toLocaleString()}
              </p>
            )}
            {quiz.availableDate && (
              <p>
                <strong>Available from:</strong>{" "}
                {new Date(quiz.availableDate).toLocaleString()}
              </p>
            )}
            {quiz.untilDate && (
              <p>
                <strong>Until:</strong>{" "}
                {new Date(quiz.untilDate).toLocaleString()}
              </p>
            )}
            <p>
              <strong>Number of Questions:</strong> {quiz.questions.length}
            </p>
          </div>

          {!isFaculty && latestAttempt && latestAttempt.completed && (
            <div className="alert alert-info mt-3">
              <strong>Your Latest Score:</strong> {latestAttempt.score} /{" "}
              {quiz.points}
              <br />
              <strong>Submitted:</strong>{" "}
              {latestAttempt.submittedAt &&
                new Date(latestAttempt.submittedAt).toLocaleString()}
            </div>
          )}
        </Card.Body>
      </Card>

      {!isFaculty && canTakeQuiz() && (
        <div className="text-center">
          <Button variant="danger" size="lg" onClick={handleStartQuiz}>
            {latestAttempt ? "Take Quiz Again" : "Take Quiz"}
          </Button>
        </div>
      )}

      {!isFaculty && !canTakeQuiz() && !quiz.published && (
        <div className="alert alert-warning">
          This quiz is not yet published.
        </div>
      )}
    </div>
  );
}
