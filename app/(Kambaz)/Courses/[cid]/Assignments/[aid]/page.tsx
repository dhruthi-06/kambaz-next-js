"use client";

import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import { useState, useEffect } from "react";

// Helper function to convert date string to YYYY-MM-DD format for date input
const formatDateForInput = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  
  // Try to parse formats like "SEP 10, 2025 11:59PM" or "NOV 01, 2025 11:59PM"
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch (e) {
    // If parsing fails, return empty string
  }
  return "";
};

// Helper function to convert YYYY-MM-DD to display format
const formatDateForDisplay = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const date = new Date(dateStr + "T23:59:00");
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()} 11:59PM`;
  }
  return dateStr;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Access assignments from Redux store
  const assignments = useSelector(
    (state: RootState) => state.assignmentReducer.assignments
  );

  const isNew = aid === "new";
  const existing = isNew ? null : assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState({
    _id: existing?._id || "",
    name: existing?.name || "",
    course: cid,
    modules: existing?.modules || "Multiple Modules",
    description: existing?.description || "",
    notavailableuntil: formatDateForInput(existing?.notavailableuntil),
    due: formatDateForInput(existing?.due),
    points: existing?.points || 100,
    completed: existing?.completed || false,
  });

  // Update state when existing assignment changes
  useEffect(() => {
    if (existing && !isNew) {
      setAssignment({
        _id: existing._id,
        name: existing.name,
        course: cid,
        modules: existing.modules || "Multiple Modules",
        description: existing.description || "",
        notavailableuntil: formatDateForInput(existing.notavailableuntil),
        due: formatDateForInput(existing.due),
        points: existing.points || 100,
        completed: existing.completed || false,
      });
    }
  }, [existing, cid, isNew]);

  const handleSave = () => {
    if (isNew) {
      // Create new assignment
      const newAssignment = {
        ...assignment,
        notavailableuntil: formatDateForDisplay(assignment.notavailableuntil),
        due: formatDateForDisplay(assignment.due),
      };
      dispatch(addAssignment(newAssignment));
    } else {
      // Update existing assignment
      const updatedAssignment = {
        ...assignment,
        notavailableuntil: formatDateForDisplay(assignment.notavailableuntil),
        due: formatDateForDisplay(assignment.due),
      };
      dispatch(updateAssignment(updatedAssignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div
      id="wd-assignments-editor"
      className="p-4"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <h4 className="fw-bold mb-4">{isNew ? "Create Assignment" : assignment.name || "Edit Assignment"}</h4>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignment.name}
            onChange={(e) =>
              setAssignment({ ...assignment, name: e.target.value })
            }
            placeholder="Enter assignment name"
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="Enter assignment description"
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="fw-semibold">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
            />
          </Col>
        </Form.Group>

        {/* Assign Section */}
        <h6 className="fw-bold mb-2">Assign</h6>
        <Card className="mb-4 border-1 shadow-sm">
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group controlId="wd-available-from">
                  <Form.Label className="fw-semibold small">
                    Available From
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.notavailableuntil}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        notavailableuntil: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="wd-due-date">
                  <Form.Label className="fw-semibold small">Due</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.due}
                    onChange={(e) =>
                      setAssignment({ ...assignment, due: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" id="wd-cancel-btn" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" id="wd-save-btn" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
