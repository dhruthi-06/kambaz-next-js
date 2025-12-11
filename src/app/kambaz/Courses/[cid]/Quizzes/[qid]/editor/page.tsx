"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateQuiz as updateQuizAction } from "../../quizzesReducer";
import * as quizClient from "../../quizClient";
import { Button, Form, Nav, Tab } from "react-bootstrap";
import type { Quiz } from "../../quizzesReducer";
import QuestionEditor from "./QuestionEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      const fetchedQuiz = await quizClient.fetchQuizById(quizId);
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleSave = async () => {
    if (!quiz) return;

    try {
      const updated = await quizClient.updateQuiz(quizId, quiz);
      dispatch(updateQuizAction(updated));
      alert("Quiz saved successfully!");
      router.push(`/kambaz/Courses/${courseId}/Quizzes/${quizId}`);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to save quiz");
    }
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;

    try {
      const updated = await quizClient.updateQuiz(quizId, {
        ...quiz,
        published: true,
      });
      dispatch(updateQuizAction(updated));
      alert("Quiz saved and published!");
      router.push(`/kambaz/Courses/${courseId}/Quizzes`);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to save and publish quiz");
    }
  };

  const handleCancel = () => {
    router.push(`/kambaz/Courses/${courseId}/Quizzes`);
  };

  if (!quiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2>Edit Quiz</h2>

      <Tab.Container
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
      >
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="details">Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="questions">Questions</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="details">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.title}
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={quiz.description}
                  onChange={(e) =>
                    setQuiz({ ...quiz, description: e.target.value })
                  }
                />
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Quiz Type</Form.Label>
                    <Form.Select
                      value={quiz.quizType}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          quizType: e.target.value as Quiz["quizType"],
                        })
                      }
                    >
                      <option value="GRADED_QUIZ">Graded Quiz</option>
                      <option value="PRACTICE_QUIZ">Practice Quiz</option>
                      <option value="GRADED_SURVEY">Graded Survey</option>
                      <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Assignment Group</Form.Label>
                    <Form.Select
                      value={quiz.assignmentGroup}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          assignmentGroup: e.target
                            .value as Quiz["assignmentGroup"],
                        })
                      }
                    >
                      <option value="QUIZZES">Quizzes</option>
                      <option value="EXAMS">Exams</option>
                      <option value="ASSIGNMENTS">Assignments</option>
                      <option value="PROJECT">Project</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Time Limit (minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      value={quiz.timeLimit}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          timeLimit: parseInt(e.target.value) || 20,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Shuffle Answers"
                      checked={quiz.shuffleAnswers}
                      onChange={(e) =>
                        setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Multiple Attempts"
                      checked={quiz.multipleAttempts}
                      onChange={(e) =>
                        setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                      }
                    />
                  </Form.Group>

                  {quiz.multipleAttempts && (
                    <Form.Group className="mb-3">
                      <Form.Label>How Many Attempts</Form.Label>
                      <Form.Control
                        type="number"
                        value={quiz.howManyAttempts}
                        onChange={(e) =>
                          setQuiz({
                            ...quiz,
                            howManyAttempts: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                    </Form.Group>
                  )}
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Show Correct Answers</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.showCorrectAnswers}
                      onChange={(e) =>
                        setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                      }
                      placeholder="e.g., Immediately, After due date"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Access Code (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.accessCode}
                      onChange={(e) =>
                        setQuiz({ ...quiz, accessCode: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="One Question at a Time"
                      checked={quiz.oneQuestionAtATime}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          oneQuestionAtATime: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Webcam Required"
                      checked={quiz.webcamRequired}
                      onChange={(e) =>
                        setQuiz({ ...quiz, webcamRequired: e.target.checked })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Lock Questions After Answering"
                      checked={quiz.lockQuestionsAfterAnswering}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          lockQuestionsAfterAnswering: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={
                        quiz.dueDate
                          ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setQuiz({ ...quiz, dueDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Available Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={
                        quiz.availableDate
                          ? new Date(quiz.availableDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setQuiz({ ...quiz, availableDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Until Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={
                        quiz.untilDate
                          ? new Date(quiz.untilDate).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setQuiz({ ...quiz, untilDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="questions">
            <QuestionEditor quiz={quiz} onQuizUpdate={setQuiz} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <div className="d-flex gap-2 mt-4">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="success" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
