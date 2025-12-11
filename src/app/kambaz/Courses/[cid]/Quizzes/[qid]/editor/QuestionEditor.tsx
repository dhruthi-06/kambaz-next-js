"use client";
import { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import type { Quiz, QuizQuestion } from "../../quizzesReducer";

interface Props {
  quiz: Quiz;
  onQuizUpdate: (quiz: Quiz) => void;
}

export default function QuestionEditor({ quiz, onQuizUpdate }: Props) {
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Partial<QuizQuestion> | null>(null);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [questionGroups] = useState<string[]>([
    "General Knowledge",
    "Critical Thinking",
    "Problem Solving",
    "Analysis",
    "Application"
  ]);
  const [selectedGroup, setSelectedGroup] = useState<string>("General Knowledge");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddQuestion = () => {
    const newQuestion: Partial<QuizQuestion> = {
      _id: `Q${Date.now()}`,
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      points: 1,
      question: "",
      group: selectedGroup,
      choices: [
        { text: "Option 1", isCorrect: true },
        { text: "Option 2", isCorrect: false },
      ],
    };
    setEditingQuestion(newQuestion);
    setEditingQuestionId(newQuestion._id!);
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion) return;

    // Add group to question if specified
    const questionToSave = {
      ...editingQuestion,
      group: selectedGroup,
    };

    if (quiz.questions.find((q: QuizQuestion) => q._id === editingQuestion._id)) {
      // Update existing
      const updated = quiz.questions.map((q: QuizQuestion) =>
        q._id === editingQuestion._id ? (questionToSave as QuizQuestion) : q
      );
      onQuizUpdate({ ...quiz, questions: updated });
    } else {
      // Add new
      onQuizUpdate({
        ...quiz,
        questions: [...quiz.questions, questionToSave as QuizQuestion],
      });
    }

    setEditingQuestion(null);
    setEditingQuestionId(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setEditingQuestionId(null);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    onQuizUpdate({
      ...quiz,
      questions: quiz.questions.filter((q: QuizQuestion) => q._id !== questionId),
    });
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion({ ...question });
    setEditingQuestionId(question._id);
    if (question.group) {
      setSelectedGroup(question.group);
    }
  };

  const renderQuestionForm = () => {
    if (!editingQuestion) return null;

    return (
      <Card className="mb-3">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={editingQuestion.type}
                onChange={(e) => {
                  const type = e.target.value as QuizQuestion["type"];
                  const updates: Partial<QuizQuestion> = { type };

                  if (type === "MULTIPLE_CHOICE") {
                    updates.choices = [
                      { text: "Option 1", isCorrect: true },
                      { text: "Option 2", isCorrect: false },
                    ];
                  } else if (type === "TRUE_FALSE") {
                    updates.correctAnswer = true;
                  } else if (type === "FILL_IN_BLANK") {
                    updates.possibleAnswers = [""];
                    updates.caseSensitive = false;
                  }

                  setEditingQuestion({ ...editingQuestion, ...updates });
                }}
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True/False</option>
                <option value="FILL_IN_BLANK">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question Group</Form.Label>
              <Form.Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                {questionGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editingQuestion.title}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={editingQuestion.points}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    points: parseInt(e.target.value) || 1,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingQuestion.question}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, question: e.target.value })
                }
              />
            </Form.Group>

            {editingQuestion.type === "MULTIPLE_CHOICE" && (
              <div className="mb-3">
                <Form.Label>Choices</Form.Label>
                {editingQuestion.choices?.map((choice: { text: string; isCorrect: boolean }, index: number) => (
                  <div key={index} className="d-flex align-items-center gap-2 mb-2">
                    <Form.Check
                      type="radio"
                      name="correctChoice"
                      checked={choice.isCorrect}
                      onChange={() => {
                        const newChoices = editingQuestion.choices!.map((c, i: number) => ({
                          ...c,
                          isCorrect: i === index,
                        }));
                        setEditingQuestion({ ...editingQuestion, choices: newChoices });
                      }}
                    />
                    <Form.Control
                      type="text"
                      value={choice.text}
                      onChange={(e) => {
                        const newChoices = [...editingQuestion.choices!];
                        newChoices[index].text = e.target.value;
                        setEditingQuestion({ ...editingQuestion, choices: newChoices });
                      }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const newChoices = editingQuestion.choices!.filter(
                          (_, i: number) => i !== index
                        );
                        setEditingQuestion({ ...editingQuestion, choices: newChoices });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const newChoices = [
                      ...(editingQuestion.choices || []),
                      { text: `Option ${(editingQuestion.choices?.length || 0) + 1}`, isCorrect: false },
                    ];
                    setEditingQuestion({ ...editingQuestion, choices: newChoices });
                  }}
                >
                  Add Choice
                </Button>
              </div>
            )}

            {editingQuestion.type === "TRUE_FALSE" && (
              <Form.Group className="mb-3">
                <Form.Label>Correct Answer</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="True"
                    name="trueFalse"
                    checked={editingQuestion.correctAnswer === true}
                    onChange={() =>
                      setEditingQuestion({ ...editingQuestion, correctAnswer: true })
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name="trueFalse"
                    checked={editingQuestion.correctAnswer === false}
                    onChange={() =>
                      setEditingQuestion({ ...editingQuestion, correctAnswer: false })
                    }
                  />
                </div>
              </Form.Group>
            )}

            {editingQuestion.type === "FILL_IN_BLANK" && (
              <div className="mb-3">
                <Form.Label>Possible Correct Answers</Form.Label>
                {editingQuestion.possibleAnswers?.map((answer: string, index: number) => (
                  <div key={index} className="d-flex gap-2 mb-2">
                    <Form.Control
                      type="text"
                      value={answer}
                      onChange={(e) => {
                        const newAnswers = [...(editingQuestion.possibleAnswers || [])];
                        newAnswers[index] = e.target.value;
                        setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
                      }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const newAnswers = editingQuestion.possibleAnswers!.filter(
                          (_, i: number) => i !== index
                        );
                        setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const newAnswers = [...(editingQuestion.possibleAnswers || []), ""];
                    setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
                  }}
                >
                  Add Answer
                </Button>
                <Form.Group className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Case Sensitive"
                    checked={editingQuestion.caseSensitive}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        caseSensitive: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </div>
            )}

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveQuestion}>
                Save Question
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>
          Questions ({quiz.questions.length}) - Total Points:{" "}
          {quiz.questions.reduce((sum: number, q: QuizQuestion) => sum + q.points, 0)}
        </h5>
        <div>
          <Button 
            variant="outline-primary" 
            onClick={() => setShowQuestionBank(!showQuestionBank)}
            className="me-2"
          >
            {showQuestionBank ? "Hide" : "Find Questions"}
          </Button>
          <Button variant="danger" onClick={handleAddQuestion}>
            + New Question
          </Button>
        </div>
      </div>

      {showQuestionBank && (
        <Card className="mb-3 border-primary">
          <Card.Body>
            <h6>Find Questions by Group</h6>
            <div className="d-flex gap-2 mb-3">
              <Form.Control
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Form.Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                style={{ width: "200px" }}
              >
                {questionGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </Form.Select>
            </div>
            
            <div className="border rounded p-3">
              <small className="text-muted">
                Filter questions by group: <strong>{selectedGroup}</strong>
              </small>
              <div className="mt-2">
                {quiz.questions
                  .filter((q: QuizQuestion) => {
                    const matchesGroup = (q as QuizQuestion & { group?: string }).group === selectedGroup;
                    const matchesSearch = searchQuery === "" || 
                      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      q.question.toLowerCase().includes(searchQuery.toLowerCase());
                    return matchesGroup && matchesSearch;
                  })
                  .map((q: QuizQuestion) => (
                    <div key={q._id} className="border rounded p-2 mb-2 bg-light">
                      <strong>{q.title}</strong> ({q.points} pts) - {q.type.replace(/_/g, " ")}
                      <div className="small text-muted">{q.question.substring(0, 100)}...</div>
                    </div>
                  ))}
                {quiz.questions.filter((q: QuizQuestion) => (q as QuizQuestion & { group?: string }).group === selectedGroup).length === 0 && (
                  <div className="text-muted">No questions in this group yet.</div>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      {editingQuestionId && renderQuestionForm()}

      {quiz.questions.length === 0 && !editingQuestion && (
        <Alert variant="info">No questions yet. Click &quot;+ New Question&quot; to add one.</Alert>
      )}

      <div>
        {quiz.questions.map((question: QuizQuestion, index: number) => (
          <Card key={question._id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6>
                    {index + 1}. {question.title} ({question.points} pts)
                  </h6>
                  <p className="text-muted small">
                    {question.type.replace(/_/g, " ")}
                    {(question as QuizQuestion & { group?: string }).group && 
                      ` - ${(question as QuizQuestion & { group?: string }).group}`
                    }
                  </p>
                  <p>{question.question}</p>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditQuestion(question)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteQuestion(question._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}