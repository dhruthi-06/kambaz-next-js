"use client";

import Link from "next/link";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaRegFileAlt } from "react-icons/fa";
import {
  BsGripVertical,
  BsCaretDownFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark"; 

export default function Assignments() {

  const assignments = [
    {
      id: "123",
      title: "A1 – ENV + HTML",
      modules: "Multiple",
      Notavailableuntil: "SEP 10, 2025 11:59PM",
      due: "SEP 20, 2025 11:59PM",
      points: 100,
      completed: true,
    },
    {
      id: "234",
      title: "A2 – CSS + BOOTSTRAP",
      modules:  "Multiple",
     Notavailableuntil: "SEP 20, 2025 11:59PM",
      due: "SEP 30, 2025 11:59PM",
      points: 100,
      completed: true,
    },
    {
      id: "345",
      title: "A3 – JAVASCRIPT + REACTJS",
      modules:  "Multiple",
      Notavailableuntil: "OCT 1, 2025 11:59PM",
      due: "OCT 10, 2025 11:59PM",
      points: 100,
      completed: true,
    },
    {
      id: "456",
      title: "A4 – NODEJS + EXPRESSJS",
      modules:  "Multiple",
      Notavailableuntil: "OCT 20, 2025 11:59PM",
      due: "OCT 30, 2025 11:59PM",
      points: 100,
      completed: true,
    },
  ];

  return (
    <div id="wd-assignments" className="p-3">
      {/* ===== Top Controls ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Search Bar */}
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <Button variant="secondary" id="wd-add-assignment-group">
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* ===== Gray Header Box ===== */}
      <div
        className="bg-secondary bg-opacity-25 p-3 d-flex align-items-center justify-content-between mb-0"
        style={{ borderRadius: 0 }}
      >
        <div className="d-flex align-items-center fw-bold fs-5">
          <BsGripVertical className="me-2 fs-4 text-secondary" />
          <BsCaretDownFill className="me-2 text-secondary" />
          ASSIGNMENTS
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* 40% Badge */}
          <span className="bg-light px-3 py-1 rounded-pill text-muted small border">
            40% of Total
          </span>

          {/* Action Buttons */}
          <Button
            variant="light"
            size="sm"
            className="border-0 text-secondary p-1"
            title="Add Assignment"
          >
            <FaPlus />
          </Button>
          <Button
            variant="light"
            size="sm"
            className="border-0 text-secondary p-1"
            title="More Options"
          >
            <BsThreeDotsVertical />
          </Button>
        </div>
      </div>

      {/* ===== Assignment List ===== */}
      <ListGroup id="wd-assignment-list" className="mt-0">
        {assignments.map((assignment, index) => (
          <ListGroupItem
            key={assignment.id}
            className="rounded-0 p-3"
            style={{
              borderLeft: "5px solid green",
              borderTop: index === 0 ? "1px solid black" : "0px",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-4 text-secondary" />
                <FaRegFileAlt className="text-secondary me-2 fs-5" />
                <Link
                  href={`/Courses/1234/Assignments/${assignment.id}`}
                  className="fw-bold fs-5 text-dark text-decoration-none"
                >
                  {assignment.title}
                </Link>
              </div>

              {/* Green Checkmark (only for completed) + Dots */}
              <div className="d-flex align-items-center">
                {assignment.completed && <GreenCheckmark />}
                <BsThreeDotsVertical className="text-secondary ms-2" />
              </div>
            </div>

            <div className="text-muted small ps-4">
              <span className="text-danger fw-bold">
                {assignment.modules} Modules
              </span>{" "}
              | <b>Not available until</b> {assignment.Notavailableuntil}  | <b> Due </b>{assignment.due} |{" "}
              {assignment.points} pts
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
