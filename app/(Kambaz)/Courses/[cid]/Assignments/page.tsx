"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import React from "react";

import {
  deleteAssignment,
  setAssignments,
} from "../Assignments/reducer";
import * as client from "../../client"; // ⭐ server requests

interface Assignment {
  _id: string;
  name: string;
  course: string;
  modules?: string;
  notavailableuntil?: string;
  due?: string;
  points?: number;
  completed?: boolean;
}

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  ) as { assignments: Assignment[] };

  // Filter per course
  const courseAssignments = assignments.filter((a) => a.course === cid);

  // ------------------------------
  // ⭐ LOAD FROM SERVER ON MOUNT
  // ------------------------------
  const loadAssignments = async () => {
    const serverAssignments = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(serverAssignments));
  };

  // Load once
  React.useEffect(() => {
    loadAssignments();
  }, [cid]);

  // ------------------------------
  // Add new assignment → send user to editor
  // ------------------------------
  const handleAdd = () => {
    router.push(`/Courses/${cid}/Assignments/new`);
  };

  const handleDelete = async (id: string) => {
    await client.deleteAssignment(id);
    dispatch(deleteAssignment(id));
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* ===== Top Controls ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control placeholder="Search for Assignments" />
        </InputGroup>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <Button variant="danger" id="wd-add-assignment" onClick={handleAdd}>
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* ===== Gray Header Box ===== */}
      <div className="bg-secondary bg-opacity-25 p-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center fw-bold fs-5">
          <BsGripVertical className="me-2 fs-4" />
          <BsCaretDownFill className="me-2" />
          ASSIGNMENTS
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="bg-light px-3 py-1 rounded-pill text-muted small border">
            40% of Total
          </span>
          <FaPlus />
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* ===== Assignment List ===== */}
      <ListGroup id="wd-assignment-list">
        {courseAssignments.map((assignment, index) => (
          <ListGroupItem
            key={assignment._id || `fallback-${index}`} // ⭐ FIXED UNIQUE KEY
            className="rounded-0 p-3"
            style={{
              borderLeft: "5px solid green",
              borderTop: index === 0 ? "1px solid black" : "0px",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            {/* Header Row */}
            <div className="d-flex justify-content-between mb-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-4 text-secondary" />
                <FaRegFileAlt className="text-secondary me-2 fs-5" />
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="fw-bold fs-5 text-dark"
                >
                  {assignment.name}
                </Link>
              </div>

              <div className="d-flex align-items-center gap-2">
                {assignment.completed && <GreenCheckmark />}

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(assignment._id)}
                >
                  Delete
                </Button>

                <BsThreeDotsVertical />
              </div>
            </div>

            {/* Details */}
            <div className="text-muted small ps-4">
              <span className="text-danger fw-bold">
                {assignment.modules ?? "General"}
              </span>{" "}
              | <b>Not available until</b>{" "}
              {assignment.notavailableuntil ?? "N/A"} | <b>Due</b>{" "}
              {assignment.due ?? "TBD"} | {assignment.points ?? 100} pts
            </div>
          </ListGroupItem>
        ))}

        {/* Empty message */}
        {courseAssignments.length === 0 && (
          <div className="text-center text-muted py-4">
            No assignments found for this course.
          </div>
        )}
      </ListGroup>
    </div>
  );
}
