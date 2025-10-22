"use client";

import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  // Find the assignment for the current course
  const assignment = db.assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  if (!assignment) {
    return (
      <div className="p-4 text-center">
        <h4>Assignment not found</h4>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary" className="mt-3">
            Back to Assignments
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      id="wd-assignments-editor"
      className="p-4"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <h4 className="fw-bold mb-4">{assignment.name}</h4>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.name} readOnly />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="wd-description">
          <div
            className="mt-2 border rounded p-2"
            contentEditable
            style={{
              height: "200px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              backgroundColor: "white",
            }}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{
              __html: `This assignment is <span style="color:red;">available online</span>

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`,
            }}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="fw-semibold">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" value="100" readOnly />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={3} className="fw-semibold">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={3} className="fw-semibold">
            Display Grade As
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="Percentage">
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
              <option>Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
        <h6 className="fw-bold mb-2">Submission Type</h6>
        <Card className="mb-4 border-1 shadow-sm">
          <Card.Body>
            <Form.Select defaultValue="ONLINE" className="mb-3 w-50">
              <option>ONLINE</option>
              <option>ON PAPER</option>
              <option>NO SUBMISSION</option>
            </Form.Select>
            <div className="ms-2">
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
              <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
              />
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
              />
              <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
            </div>
          </Card.Body>
        </Card>

        {/* Assign Section */}
        <h6 className="fw-bold mb-2">Assign</h6>
        <Card className="mb-4 border-1 shadow-sm">
          <Card.Body>
            <Form.Label className="fw-semibold small mb-1">
              Assign To
            </Form.Label>
            <div
              className="border rounded p-2 mb-4"
              style={{
                backgroundColor: "white",
                borderColor: "#ccc",
                maxWidth: "350px",
              }}
            >
              <div
                className="d-inline-flex align-items-center px-2 py-1 rounded"
                style={{
                  backgroundColor: "#f3f3f3",
                  border: "1px solid #ccc",
                  maxWidth: "fit-content",
                }}
              >
                <span className="small me-1">Everyone</span>
                <AiOutlineClose
                  className="text-dark"
                  style={{ cursor: "pointer", fontSize: "0.9rem" }}
                />
              </div>
            </div>

            {/* Dates */}
            <Row>
              <Col md={4}>
                <Form.Group controlId="wd-due-date">
                  <Form.Label className="fw-semibold small">Due</Form.Label>
                  <Form.Control type="date" defaultValue="2025-09-20" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="wd-available-from">
                  <Form.Label className="fw-semibold small">
                    Available From
                  </Form.Label>
                  <Form.Control type="date" defaultValue="2025-09-15" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="wd-available-until">
                  <Form.Label className="fw-semibold small">Until</Form.Label>
                  <Form.Control type="date" defaultValue="2025-10-01" />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" id="wd-cancel-btn">
            Cancel
          </Button>
          <Button variant="danger" id="wd-save-btn">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
