"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/app/kambaz/store";
import {
  setQuizzes,
  addQuiz,
  deleteQuiz as deleteQuizAction,
  updateQuiz,
  Quiz,
} from "./quizzesReducer";
import * as quizClient from "./quizClient";
import { Button, Dropdown } from "react-bootstrap";
import Link from "next/link";

export default function QuizList() {
  const { cid } = useParams();
  const courseId = cid as string;
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [latestScores, setLatestScores] = useState<Record<string, number>>({});

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchQuizzes = async () => {
    try {
      const fetchedQuizzes = await quizClient.fetchQuizzesForCourse(courseId);
      dispatch(setQuizzes(fetchedQuizzes));

      // Fetch latest scores for students
      if (!isFaculty) {
        const scores: Record<string, number> = {};
        for (const quiz of fetchedQuizzes) {
          try {
            const latestAttempt = await quizClient.fetchLatestAttempt(quiz._id);
            if (latestAttempt && latestAttempt.completed) {
              scores[quiz._id] = latestAttempt.score;
            }
          } catch (error) {
            console.error(`Error fetching score for quiz ${quiz._id}:`, error);
          }
        }
        setLatestScores(scores);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleAddQuiz = async () => {
    try {
      const newQuiz = await quizClient.createQuiz(courseId, {
        title: "New Quiz",
        description: "",
        quizType: "GRADED_QUIZ",
        assignmentGroup: "QUIZZES",
        points: 0,
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: "IMMEDIATELY",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        published: false,
        questions: [],
      });
      dispatch(addQuiz(newQuiz));
      router.push(`/kambaz/Courses/${courseId}/Quizzes/${newQuiz._id}/editor`);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to create quiz");
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await quizClient.deleteQuiz(quizId);
      dispatch(deleteQuizAction(quizId));
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to delete quiz");
    }
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    try {
      const updated = await quizClient.publishQuiz(quiz._id, !quiz.published);
      dispatch(updateQuiz(updated));
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to update quiz");
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
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

  const courseQuizzes = quizzes
    .filter((q: Quiz) => q.course === courseId)
    .sort((a: Quiz, b: Quiz) => {
      const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
      const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
      return dateA - dateB;
    });

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quizzes</h2>
        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            + Quiz
          </Button>
        )}
      </div>

      {courseQuizzes.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No quizzes yet.</p>
          {isFaculty && (
            <p className="text-muted">
              Click &quot;+ Quiz&quot; to create one.
            </p>
          )}
        </div>
      ) : (
        <ul className="list-group">
          {courseQuizzes.map((quiz) => (
            <li key={quiz._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    {isFaculty && (
                      <span
                        style={{ cursor: "pointer", fontSize: "1.2rem" }}
                        onClick={() => handleTogglePublish(quiz)}
                        title={quiz.published ? "Published" : "Unpublished"}
                      >
                        {quiz.published ? "✅" : "🚫"}
                      </span>
                    )}
                    <Link
                      href={`/kambaz/Courses/${courseId}/Quizzes/${quiz._id}`}
                      className="text-decoration-none text-dark fw-bold"
                    >
                      {quiz.title}
                    </Link>
                  </div>

                  <div className="text-muted small">
                    <div>{getAvailabilityStatus(quiz)}</div>
                    {quiz.dueDate && (
                      <div>
                        <strong>Due:</strong>{" "}
                        {new Date(quiz.dueDate).toLocaleString()}
                      </div>
                    )}
                    <div>
                      <strong>{quiz.points}</strong> pts |{" "}
                      <strong>{quiz.questions.length}</strong>{" "}
                      {quiz.questions.length === 1 ? "Question" : "Questions"}
                    </div>
                    {!isFaculty && latestScores[quiz._id] !== undefined && (
                      <div className="text-success">
                        <strong>Latest Score:</strong> {latestScores[quiz._id]}{" "}
                        / {quiz.points}
                      </div>
                    )}
                  </div>
                </div>

                {isFaculty && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm">
                      ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          router.push(
                            `/kambaz/Courses/${courseId}/Quizzes/${quiz._id}/editor`
                          )
                        }
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDeleteQuiz(quiz._id)}
                        className="text-danger"
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
