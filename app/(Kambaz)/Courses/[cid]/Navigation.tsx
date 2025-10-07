"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function CourseNavigation() {
  const courseId = "1234"; // Replace dynamically if needed

  return (
    <ListGroup
      id="wd-courses-navigation"
      className="fs-5 rounded-0 wd list-group"
      style={{ minWidth: "200px" }}
    >
      <ListGroupItem
        as={Link}
        href={`/Courses/${courseId}/Home`}
        id="wd-course-home-link"
        className="active border-0"
      >
        Home
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href={`/Courses/${courseId}/Modules`}
        id="wd-course-modules-link"
        className="text-danger border-0"
      >
        Modules
      </ListGroupItem>

      <ListGroupItem
        as="a"
        href="https://piazza.com/class/mf9tt3f8vlw16f"
        id="wd-course-piazza-link"
        target="_blank"
        rel="noopener noreferrer"
        className="text-danger border-0"
      >
        Piazza
      </ListGroupItem>

      <ListGroupItem
        as="a"
        href="https://zoom.us/signin#/login"
        id="wd-course-zoom-link"
        target="_blank"
        rel="noopener noreferrer"
        className="text-danger border-0"
      >
        Zoom
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href={`/Courses/${courseId}/Assignments`}
        id="wd-course-assignments-link"
        className="text-danger border-0"
      >
        Assignments
      </ListGroupItem>

      <ListGroupItem
        as="a"
        href="https://northeastern.instructure.com/courses/225988/quizzes"
        id="wd-course-quizzes-link"
        target="_blank"
        rel="noopener noreferrer"
        className="text-danger border-0"
      >
        Quizzes
      </ListGroupItem>

      {/* Updated People Link to Internal Page */}
      <ListGroupItem
        as={Link}
        href={`/Courses/${courseId}/People/Table`}
        id="wd-course-people-link"
        className="text-danger border-0"
      >
        People
      </ListGroupItem>
    </ListGroup>
  );
}
